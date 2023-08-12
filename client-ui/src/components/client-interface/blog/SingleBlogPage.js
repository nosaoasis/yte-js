import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavMenu from "../nav/NavMenu";
import DOMPurify from "dompurify";
import { createMarkup } from "../../../helpers/posts";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import BlogComments from "./BlogComments";

const SingleBlogPage = (props) => {
  const params = useParams();
  const { blog_id } = params;

  const [singlePostData, setSinglePostData] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [textArea, setTextArea] = useState("");

  const [blogComments, setBlogComments] = useState(null);

  // const createMarkup = (html) => {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // };

  useEffect(() => {
    axios
      .get(`http://localhost:3764/blog/${blog_id}`)
      .then((resp) => {
        setSinglePostData(resp.data.post);
      })
      .catch((err) => console.log("An error occured...."));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3764/api/v1/comments/post_comments/${blog_id}`)
      .then((res) => {
        console.log("the data for the comment is", res.data.postComment);
        const commentList = res.data.postComment
        setBlogComments(commentList);
        // renderComments(blogComments);
        console.log("blog post list value is ", blogComments)
      })
      .catch((err) => console.log("An error has occured", err));
  }, [showComments]);

  const handleShowBlogComment = () => {
    setShowComments(!showComments);
  };

  const handleSubmitPostComment = () => {
    console.log(firstName, lastName, email, textArea);
    const payload = {
      blogId: blog_id,
      firstname: firstName,
      lastname: lastName,
      email,
      comment: textArea,
    };
    axios
      .post(`http://localhost:3764/api/v1/comments/post_comment`, {
        payload,
      })
      .then((res) => {
        console.log("the value from the comment post is", res)
        setShowComments(!showComments)
      })
      .catch((err) =>
        console.log(
          "An error occured in an attempt to post a comment about the blog",err
        )
      );
  };

  return (
    <>
      <NavMenu />
      <div className="flex">
        <div className="w-2/12 bg-black min-h-screen"></div>
        <div className="w-10/12 bg-gray-300 min-h-screen p-3 flex relative">
          <div className="w-8/12 bg-blue-200 pt-3 mr-3 relative">
            {showComments && (
              <>
                <div className="absolute top-0 w-full h-full bg-black opacity-90">
                  <i
                    className="fa-solid fa-window-close cursor-pointer text-white text-xl absolute top-2 right-3 z-20 bg-black"
                    onClick={handleShowBlogComment}
                  ></i>
                  <div className="relative">
                    <BlogComments
                      title={singlePostData.title}
                      blog_id={blog_id}
                      blogComments={blogComments}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-center">
              <img
                className="h-64 w-auto "
                src={singlePostData.imageLink}
                alt={singlePostData.title}
              />
            </div>
            <p className="font-bold text-4xl mt-3 p-2 capitalize">
              {singlePostData.title}
            </p>
            <div
              className="text-base p-2 break-all"
              dangerouslySetInnerHTML={createMarkup(singlePostData.post_body)}
            ></div>
            <div className="p-3 flex">
              <FacebookShareButton
                url={`http://localhost:3764/blog/${blog_id}`}
                quote={"Dummy text!"}
                hashtag="#YteAngel"
                className="mr-2"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={`http://localhost:3764/blog/${blog_id}`}
                quote={"This is a text share quote from yteAngel..."}
                hashtag="#YteAngel"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            {/* post comment section */}
            <div className="mt-4 pl-2">
              <p className="font-bold text-lg">Leave a comment</p>
              <div className="flex mt-2">
                <input
                  className="flex-1 border-2 border-black mr-1 p-1"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <input
                  className="flex-1 border-2 border-black ml-1 p-1"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <input
                className="w-full border-2 border-black mt-2 p-1"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <textarea
                className="border-2 border-black w-full h-full mt-2 p-2"
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
              ></textarea>
              <div className="flex justify-between">
                <button
                  className="bg-black text-white p-2 mt-2"
                  onClick={handleSubmitPostComment}
                >
                  Post Comment
                </button>
                <button
                  className="bg-blue-800 text-white p-2 mt-2"
                  onClick={handleShowBlogComment}
                >
                  See All Comment
                </button>
              </div>
            </div>
          </div>
          <div className="w-4/12 bg-red-500 p-2">
            section under design
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPage;
