import React, { useEffect, useState } from "react";
// import axios from "axios";

const BlogPostComments = (props) => {
  const { blogComments } = props;
  // const [commentList, setCommentList] = useState(blogComments);
  
  const imgAddr = "https://cdn-icons-png.flaticon.com/512/6915/6915987.png";

  const renderPosts = () => {
    return blogComments.map(comment => {
      return (
        <>
          <div className="flex mt-3 border-2 border-r-2 border-gray-400 px-2 py-3 rounded-lg">
            <img className="h-8 w-8 mr-3" src={imgAddr} alt={comment.firstname} />
            <p className="text-sm">{comment.comment} ;adfjn dfjkn d;jkd v;okds sd;ok sdkondv s[diojoijsd siodj ] sodijdjndssdn sodinoksdnoisdn</p> 
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
