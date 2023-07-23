import { useState, useEffect } from "react";
import axios from "axios";
import PostPreviewMode from "./PostPreviewMode";
import NavMenu from "./nav/NavMenu";
import Pagination from "../helper-components/Pagination";

const ClientHomePage = () => {
  const [state, setState] = useState({
    allPost: [],
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3764/api/v1/client`)
      .then((resp) => {
        console.log("response value is", resp)
        const filteredPost = (resp.data.posts.filter((item) => item.published)).slice(0, 10);
        setState((prev) => ({
          ...prev,
          allPost: filteredPost,
        }));
      })
      .catch((err) =>
        console.log("an error occured when trying to fetch all posts", err)
      );
  }, [page]);

  const publishedPostList = state.allPost.map((post) => {
    return <PostPreviewMode key={post._id} post={post} />;
  });

  return (
    <>
      {/* <div className="bg-black w-2/12 min-h-screen fixed">
      <NavMenu />
      </div> */}
      <NavMenu />
      
      <div className="flex">
        <div className="w-2/12 bg-black min-h-screen">
        </div>
        <div className="w-10/12 bg-gray-300 min-h-screen p-3">
          {/* blog section */}
          <div className="px-3">
            <p className="text-2xl ml-2">Blogs</p>
            <div className="grid grid-cols-client-home">{publishedPostList}</div>
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
      {/* <div className="flex">
        <div className="w-2/12 bg-blue-800 min-h-screen pt-4 pl-2">
          <NavMenu />
        </div>
        <div
          className="pt-4 pl-2 w-10/12 bg-black min-h-screen"
        >
          {publishedPostList}
        </div>
      </div> */}
      {/* ====== */}
      {/* <div className="fixed top-0 flex z-20 bg-black opacity-90 w-screen text-white h-16 items-center justify-center">
        <NavMenu />
      </div> */}
      {/* <div className="mt-16">
        {publishedPostList}
        <Pagination page={page} pages={pages} setPage={setPage} />
        <Pagination />
      </div> */}
    </>
  );
};

export default ClientHomePage;
