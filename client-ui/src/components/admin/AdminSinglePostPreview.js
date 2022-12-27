import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loading } from "./index";
import adminMenuList from "./admin-menu-list";
import { defaultMenu } from "./AdminMenu";
import { publishPost, unpublishPost } from "../../helpers/posts";

const SinglePost = (props) => {
  const params = useParams();
  const { post_id } = params;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState({
    id: null,
    createdAT: null,
    imageLink: null,
    post_body: null,
    title: null,
  });
  const [published, setIsPublished] = useState(null);

  const deletePost = () => {
    const token = localStorage.getItem("token");
    const payload = {
      post_id: postDetails.id,
    };
    axios
      .post(`http://localhost:3764/api/v1/post/delete_post`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate("/admin/posts", { replace: true });
      })
      .catch((err) => console.log("An error occured", err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3764/api/v1/post/get_single_post/${post_id}`, {
        params: { post_id },
      })
      .then((res) => {
        const { _id, imageLink, createdAt, post_body, title, published } =
          res.data.post;
        setPostDetails((prev) => ({
          ...prev,
          id: _id,
          createdAt,
          imageLink,
          post_body,
          title,
        }));
        setIsPublished(published);
        setLoading(false);
      })
      .catch((err) => console.error("an error occured.... ", err));
  }, [post_id]);

  return (
    <>
      {loading && <Loading message="Loading Blog" />}

      {loading || (
        <>
          <div className="flex">
            {/* menu start */}
            <div className="w-2/12 bg-black min-h-screen pt-4 pl-2">
              <ul>{defaultMenu(adminMenuList)}</ul>
            </div>
            {/* menu end */}
            <div className="max-h-screen vertical_scroll px-16 flex-1 bg-gray-300">
              <div className="flex justify-between">
                <button
                  className="capitalize p-2 px-4 mt-8 bg-slate-700 text-white"
                  onClick={() => navigate(-1)}
                >
                  <i className="fa fa-arrow-left mr-2"></i>Back to Posts
                </button>
                <div>
                  <button
                    className="capitalize p-2 px-4 mt-8 mr-3 bg-yellow-700 text-white"
                    onClick={
                      published
                        ? () => unpublishPost(postDetails.id, setIsPublished)
                        : () => publishPost(postDetails.id, setIsPublished)
                    }
                  >
                    {published ? "Unpublish" : "Publish"}
                  </button>
                  <Link to={`/admin/post/edit/${post_id}`}>
                    <button
                      disabled={published}
                      className="capitalize p-2 px-4 mt-8 mr-3 bg-blue-700 text-white"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="capitalize p-2 px-4 mt-8 bg-red-700 text-white"
                    onClick={deletePost}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex py-10 mb-8">
                <div className="flex-auto w-80 mr-4">
                  <img
                    className="bg-gray-700 max-h-6/12 w-auto border-2"
                    src={postDetails.imageLink}
                    alt={postDetails.title}
                  />
                </div>
                <div className="flex-auto w-20">
                  <h1 className="font-semibold">
                    Blog Title: <span>{postDetails.title}</span>
                  </h1>
                  <p className="text-green-700 font-semibold">
                    Created: {new Date(postDetails.createdAt).toLocaleString()}
                  </p>
                  <p className="text-green-700 font-semibold">
                    Published: {published ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <p className="text-green-700">
                post_body value is {postDetails.post_body}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SinglePost;
