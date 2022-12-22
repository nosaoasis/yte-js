import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogTableList = (props) => {
  const { _id, image_link, title, post_body, published, createdAt, updatedAt } =
    props.post;
  const {delPost, page} = props

  const [isPublished, setIsPublished] = useState(published);

  const unpublishPost = async (id) => {
    const unpublishResponse = prompt(
      "Type 'UNPUBLISH' if you wish to unpublish."
    );
    if (unpublishResponse === "UNPUBLISH") {
      await axios
        .post(`http://localhost:3764/api/v1/post/update_publish`, {
          id,
          published: false,
        })
        .then((res) => {
          const { published } = res.data.post;
          setIsPublished(published)
          alert("Your post has been successfully unpublished");
          return;
        })
        .catch((err) =>
          console.error("an error occured during the posting", err)
        );
    } else {
      alert("Sorry something went wrong. Please try again.");
    }
  };

  const publishPost = async (id) => {
    const unpublishResponse = prompt("Type 'PUBLISH' if you wish to publish.");
    if (unpublishResponse === "PUBLISH") {
      await axios
        .post(`http://localhost:3764/api/v1/post/update_publish`, {
          id,
          published: true,
        })
        .then((res) => {
          const { published } = res.data.post;
          setIsPublished(published)
          alert("Your post has been successfully published");
          return;
        })
        .catch((err) =>
          console.error("an error occured during the posting", err)
        );
    } else {
      alert("Sorry something went wrong. Please try again.");
    }
  };


  const editPost = (id) => {

  }

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
          {post_body.substring(0, 200)}
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
                onClick={() => unpublishPost(_id)}
              >
                Unpublish
              </span>
            </>
          ) : (
            <>
              <span
                className="bg-green-900 hover:bg-green-400 p-1 px-3 ml-2 text-white font-bold cursor-pointer"
                onClick={() => publishPost(_id)}
              >
                Publish
              </span>
            </>
          )}
        </td>
        <td className="align-top px-1 border-2 pt-3 ">
          {!isPublished && (<>
            <span className="bg-blue-900 hover:bg-blue-400 p-1 px-3 text-white font-bold cursor-pointer"
            onClick={() => editPost(_id)}>
              Edit
            </span>
          <span className="bg-red-400 hover:bg-red-900 p-1 px-3 text-white font-bold cursor-pointer ml-4"
          onClick={() => delPost(_id, page)}>
            Delete
          </span>
          </>
          )}
          {isPublished && (
          <span className="text-yellow-300 text-white font-bold">
            You can't make changes to an active blog. You must first unpublish.
          </span>
        )}
        </td>
      </tr>
    </>
  );
};

export default BlogTableList;
