import React from "react";
import { Link } from "react-router-dom";
import { createMarkup } from "../../helpers/posts";

const PostPreviewMode = (props) => {
  const { _id, title, post_body, imageLink } = props.post;
  console.log("props value is ", typeof(post_body));

  return (
    <>
      <div className="m-2 h-auto bg-gray-900 border-2 border-black">
        <div className="h-32">
          <img src={imageLink} alt="" className="h-full w-full" />
        </div>
        <div className="all-posts flex-1 p-1">
          <p className="font-bold text-base text-blue-400 capitalize my-1">
          <Link to={`/blog/${_id}`}>{title}</Link>
          </p>
          <div
            className="post_content text-sm line-clamp-4 text-gray-100 mb-2"
            dangerouslySetInnerHTML={createMarkup(post_body)}
          ></div>
          <Link to={`/blog/${_id}`}>
            <span className="text-blue-500 mt-3 text-sm hover:text-gray-100">
              Read more
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostPreviewMode;
