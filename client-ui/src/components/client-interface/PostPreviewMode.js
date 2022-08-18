import React from 'react'
import postsImg from "../../images/meditation.jpg"
import DOMPurify from "dompurify";
import { Link } from 'react-router-dom';

const PostPreviewMode = (props) => {
  console.log(props)
  const {title, post_body, createdAt} = props.post


  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div className=" flex">
        <div className='bg-fuchsia-500 mr-4'>
          <img src={postsImg} alt="" className='h-24 w-24' />
        </div>
        <div className="all-posts flex-1 bg-green-600">
          <h3>{title}</h3>
          <div className="line-clamp-3" dangerouslySetInnerHTML={createMarkup(post_body)}></div>
          <Link to=""><span>Read more</span></Link>
        </div>
      </div>
    </>
  )
}

export default PostPreviewMode