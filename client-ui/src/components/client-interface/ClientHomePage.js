import { useState, useEffect } from "react";
import axios from "axios";
import PostPreviewMode from "./PostPreviewMode";
import NavMenu from "./nav/NavMenu";

const ClientHomePage = () => {
  const [state, setState] = useState({
    allPost: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3764/api/v1/client`)
      .then((resp) => {
        console.log("response value is", resp);
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

      <div className="flex">
        <div className="w-2/12 bg-black min-h-screen"></div>
        <div className="w-10/12 bg-gray-300 min-h-screen p-3">
          {/* blog section */}
          <div className="px-3">
            <p className="text-2xl ml-2">Yte Blogs</p>
            <div className="grid grid-cols-client-home">
              {publishedPostList}
            </div>
          </div>
          <hr />
          {/* pictures section */}
          <div>pictures section</div>
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
