import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavMenu from "../nav/NavMenu";
import DOMPurify from "dompurify";
import { createMarkup } from "../../../helpers/posts";

const SingleBlogPage = (props) => {
  const params = useParams();
  const { blog_id } = params;

  const [singlePostData, setSinglePostData] = useState({});

  // const createMarkup = (html) => {
  //   // const parser = new DOMParser();
  //   // const doc = parser.parseFromString(html, 'text/html');
  //   // return doc.documentElement.textContent;
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // };

  useEffect(() => {
    axios
      .get(`http://localhost:3764/blog/${blog_id}`)
      .then((resp) => {
        console.log("response from single blog post request is hhhhh", resp);
        // navigate("/")
        setSinglePostData(resp.data.post);
      })
      .catch((err) => console.log("An error occured...."));
  }, []);
  console.log("singlepost data is", singlePostData)

  return (
    <>
      <NavMenu />
      <div className="flex">
        <div className="w-2/12 bg-black min-h-screen"></div>
        <div className="w-10/12 bg-gray-300 min-h-screen p-3 flex">
          <div className="w-8/12 bg-bue-600 pt-3 mr-3">
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
            <div className="text-base p-2 break-all"
            // contentEditable={true}
            dangerouslySetInnerHTML={createMarkup(singlePostData.post_body)}
          ></div>
            {/* <p className="text-base p-2">
              {singlePostData.post_body} 
            </p> */}
          </div>
          <div className="w-4/12 bg-red-500 p-2">
            this is the single blog page
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPage;
