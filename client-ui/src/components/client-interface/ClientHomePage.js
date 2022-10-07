import { useState, useEffect } from "react";
import axios from "axios";
import PostPreviewMode from "./PostPreviewMode";

const ClientHomePage = () => {
  const [state, setState] = useState({
    allPost: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3764/api/v1/post`)
      .then((resp) => {
        setState((prev) => ({
          ...prev,
          allPost: resp.data.posts,
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
      <h3>Hello from ClientHomePage</h3>
      {publishedPostList}
    </>
  );
};

export default ClientHomePage;
