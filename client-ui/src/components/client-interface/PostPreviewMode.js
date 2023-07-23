import React from "react";
// import postsImg from "../../images/meditation.jpg"
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { createMarkup } from "../../helpers/posts";
// import axios from 'axios';

const PostPreviewMode = (props) => {
  const { _id, title, post_body, imageLink } = props.post;
  console.log("props value is ", typeof(post_body));

  // const theObj = {__html : post_body}

  // const navigate = useNavigate()

  // const createMarkup = (html) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, 'text/html');
  //   return doc.documentElement.textContent;
  //   // return {
  //   //   __html: DOMPurify.sanitize(html),
  //   // };
  // };

  // const handleGetSingleBlog = () => {
  //   axios.get(`http://localhost:3764/blog/${_id}`)
  //   .then(resp => {
  //     console.log("response from single blog post request is", resp)
  //     navigate("/")
  //   }).catch(err => console.log("An error occured...."))
  // }

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
