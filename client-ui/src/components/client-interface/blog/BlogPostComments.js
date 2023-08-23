import React, { useEffect, useState } from "react";

const BlogPostComments = (props) => {
  const { blogComments } = props;
  
  const imgAddr = "https://cdn-icons-png.flaticon.com/512/6915/6915987.png";

  const renderPosts = () => {
    return blogComments.map(comment => {
      return (
        <>
          <div className="flex mt-3 border-2 border-r-2 border-gray-400 px-2 py-3 rounded-lg">
            <img className="h-8 w-8 mr-3" src={imgAddr} alt={comment.firstname} />

            <p className="text-sm"><span className="font-bold">{comment.firstname} {comment.lastname}</span>: {comment.comment}</p> 
          </div>
        </>
      )
    })
  }


  return (
    <>
      <div className="mt-10">
        {renderPosts()}
      </div>
    </>
  );
};

export default BlogPostComments;
