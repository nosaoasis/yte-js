import { useState, useEffect } from "react";
import axios from "axios";
import PostPreviewMode from "./PostPreviewMode";
import Pagination from "../helper-components/Pagination";

const ClientHomePage = () => {
  const [state, setState] = useState({
    allPost: [],
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3764/api/v1/post/${page}`)
      .then((resp) => {
        const { msg, posts, nbHits, page, pages: totalPages } = resp.data;
        setPages(totalPages);
        setState((prev) => ({
          ...prev,
          allPost: posts,
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
      <h3>Hello from ClientHomePage</h3>
      {publishedPostList}
      <Pagination page={page} pages={pages} setPage={setPage} />
      <Pagination />
    </>
  );
};

export default ClientHomePage;
