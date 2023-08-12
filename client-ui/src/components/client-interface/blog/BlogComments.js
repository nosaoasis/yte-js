import React from "react";
import BlogPostComments from "./BlogPostComments";

const BlogComments = (props) => {
  const { title, blog_id, blogComments } = props;

  return (
    <>
      <div className="absolute top-28 w-8/12 left-32 border-2 border-white max-h-96">
        <div className="relative">
          <p className="font-bold capitalize text-lg p-2 py-3 absolute top-0 text-white bg-black w-full">
            <span className="text-blue-400">Comments on</span> {title}
          </p>
          <div className="overflow-auto max-h-96 p-3 text-gray-200">
            <BlogPostComments blog_id={blog_id} blogComments={blogComments} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogComments;
