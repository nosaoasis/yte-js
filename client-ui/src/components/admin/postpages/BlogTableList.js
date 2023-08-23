import React, { useState } from "react";
import { Link } from "react-router-dom";
import { publishPost, unpublishPost, createMarkup } from "../../../helpers/posts";

const BlogTableList = (props) => {
  const { _id, title, post_body, published, createdAt } = props.post;
  const { delPost, page } = props;

  const [isPublished, setIsPublished] = useState(published);

  return (
    <>
      <tr
        key={_id}
        className="bg-gray-700 border-black text-sm text-gray-200 h-14"
      >
        <td className="align-top px-1 font-bold border-2 min-h-fit hover:bg-white hover:text-blue-600">
          <Link to={`${_id}`}>{title.substring(0, 30)}</Link>
        </td>
        <td className="align-top px-1 border-2">
          <div dangerouslySetInnerHTML={createMarkup(post_body.substring(0, 150))}></div>
        </td>
        <td className="align-top px-1 font-bold border-2">Author</td>
        <td className="align-top px-1 border-2"># of comments</td>
        <td className="align-top px-1 border-2">
          {new Date(createdAt).toLocaleString()}
        </td>
        <td className="align-top text-center px-1 pt-3  border-2">
          {isPublished ? (
            <>
              <span
                className="bg-red-400 hover:bg-red-900 p-1 px-3 ml-2 text-white font-bold cursor-pointer"
                onClick={() => unpublishPost(_id, setIsPublished)}
              >
                Unpublish
              </span>
            </>
          ) : (
            <>
              <span
                className="bg-green-900 hover:bg-green-400 p-1 px-3 ml-2 text-white font-bold cursor-pointer"
                onClick={() => publishPost(_id, setIsPublished)}
              >
                Publish
              </span>
            </>
          )}
        </td>
        <td className="align-top px-1 border-2 pt-3 ">
          {!isPublished && (
            <>
              <Link to={`/admin/post/edit/${_id}`}>
                <span className="bg-blue-900 hover:bg-blue-400 p-1 px-3 text-white font-bold cursor-pointer">
                  Edit
                </span>
              </Link>
              <span
                className="bg-red-400 hover:bg-red-900 p-1 px-3 text-white font-bold cursor-pointer ml-4"
                onClick={() => delPost(_id, page)}
              >
                Delete
              </span>
            </>
          )}
          {isPublished && (
            <span className="text-yellow-300 font-bold">
              You can't make changes to an active blog. You must first
              unpublish.
            </span>
          )}
        </td>
      </tr>
    </>
  );
};

export default BlogTableList;
