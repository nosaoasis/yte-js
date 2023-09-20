import { useState, useEffect } from "react";
import axios from "axios";
import PostPreviewMode from "./blog/PostPreviewMode";
import NavMenu from "./nav/NavMenu";
import { Link } from "react-router-dom";
import Quotes from "./quotes/Quotes";

const ClientHomePage = () => {
  const [state, setState] = useState({
    allPost: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3764/api/v1/client`)
      .then((resp) => {
        const filteredPost = resp.data.posts
          .filter((item) => item.published)
          .slice(0, 10);
        setState((prev) => ({
          ...prev,
          allPost: filteredPost,
        }));
      })
      .catch((err) =>
        console.log("an error occured when trying to fetch all posts", err)
      );
  }, []);

  const publishedPostList = state.allPost.map((post) => {
    return <PostPreviewMode key={post._id} post={post} />;
  });

  return (
    <>
      <NavMenu />
      <div className="fixed bottom-3 right-4">
        <Quotes />
      </div>

      <div className="flex">
        <div className="w-2/12 bg-black min-h-screen"></div>
        <div className="w-10/12 bg-gray-300 min-h-screen p-3">
          {/* blog section */}
          <div className="px-3">
            <p className="text-2xl ml-2">Ytes' Blogs </p>
            <div className="grid grid-cols-client-home">
              {publishedPostList}
            </div>
            <Link to="/blog">
              <button className="text-white w-full bg-gray-900 focus:outline-none focus:ring-1 focus:ring-white font-medium font-bold py-2 mt-2">
                See all Blog Posts
              </button>
            </Link>
          </div>
          <hr />
          {/* pictures section */}
          <div>
            <div className="px-3 mt-4">
              <p className="text-2xl ml-2">Ytes' Pictures </p>
              <div className="grid grid-cols-client-home">
                this will have the list of images...
              </div>
              <Link to="/pictures">
                <button className="text-white w-full bg-gray-900 focus:outline-none focus:ring-1 focus:ring-white font-medium font-bold py-2 mt-2">
                  See all YteAngel's Pictures
                </button>
              </Link>
            </div>
          </div>
          <hr />
          {/* video section */}
          <div>video section</div>
          <hr />
          {/* poems section */}
          <div>poems section</div>
          <hr />
          {/* books section */}
          <div>books section</div>
          <hr />
          {/* dailythoughts section */}
          <div>dailythoughts section</div>
        </div>
      </div>
    </>
  );
};

export default ClientHomePage;
