import React from "react";
// import axios from "axios";

const dummyPostValue = [
  {
    id: 1,
    post_title: "first title",
    content:
      "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
    author: "nomase agho",
    comments: 1000,
    published: true,
  },
  {
    id: 2,
    post_title: "second title",
    content:
      "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
    author: "nomase agho",
    comments: 1000,
    published: false,
  },
  {
    id: 3,
    post_title: "third title",
    content:
      "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
    author: "nomase agho",
    comments: 1000,
    published: true,
  },
];


const dummySearchResultValue = [
  {
    id: 1,
    post_title: "first search result",
    content:
      "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
    author: "nomase agho",
    comments: 1000,
    published: true,
  },
  {
    id: 2,
    post_title: "second search result",
    content:
      "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
    author: "nomase agho",
    comments: 1000,
    published: false,
  },
  {
    id: 3,
    post_title: "third third result",
    content:
      "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
    author: "nomase agho",
    comments: 1000,
    published: true,
  },
];

const getAllPost = () => {
  // use axios to get all the posts created
  const allPost = dummyPostValue.map((post) => {
    const { id, post_title, content, author, comments, published } = post;
    return (
        <tr key={id} className="border-black text-sm text-gray-200">
          <td className="bg-gray-700 align-top px-1 font-bold  border-2">
            {post_title}
          </td>
          <td className="bg-gray-700 align-top px-1  border-2 line-clamp-6">
            {content}
          </td>
          <td className="bg-gray-700 align-top px-1 font-bold  border-2">
            {author}
          </td>
          <td className="bg-gray-700 align-top px-1  border-2">{comments}</td>
          <td className="bg-gray-700 align-top px-1  border-2">21/05/2022</td>
          <td className="bg-gray-700 align-top text-center px-1 pt-3  border-2">
            {published ? (
              <span className="bg-blue-900 p-1 px-3 text-white font-bold">
                Yes
              </span>
            ) : (
              <span className="bg-red-900 p-1 px-3 text-white font-bold">
                No
              </span>
            )}
          </td>
          <td className="bg-gray-700 align-top px-1 border-2 pt-3 ">
            <span className="bg-blue-900 p-1 px-3 text-white font-bold cursor-pointer">
              Edit
            </span>
            <span className="bg-red-900 p-1 px-3 text-white font-bold cursor-pointer ml-4">
              Delete
            </span>
          </td>
        </tr>
    );
  });
  return allPost;
};

const getSearchPostItem = (inputValue) => {
  console.log("inputValue is ", inputValue);

  const searchPostResult = dummySearchResultValue.map(post => {
    const { id, post_title, content, author, comments, published } = post;
    return (
      <tr key={id} className="border-black text-sm text-gray-200">
        <td className="bg-gray-700 align-top px-1 font-bold border-x-white border-2">
          {/* YteAngels First Post by Search */}
          {post_title}
        </td>
        <td className="bg-gray-700 align-top px-1 border-x-white border-2 line-clamp-6">
          {/* The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones
          (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop,
          Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The
          Sliding Mr. Bones (Next Stop, Pottersville) */}
          {content}
        </td>
        <td className="bg-gray-700 align-top px-1 font-bold border-x-white border-2">
          {/* Nomase Agho */}
          {author}
        </td>
        <td className="bg-gray-700 align-top px-1 border-x-white border-2">
          {/* 9399 */}
          {comments}
        </td>
        <td className="bg-gray-700 align-top px-1 border-x-white border-2">
          {/* 21/05/2022 */}
          {published}
        </td>
        <td className="bg-gray-700 align-top text-center px-1 pt-3 border-x-white border-2">
          {published ? (
            <span className="bg-blue-900 p-1 px-3 text-white font-bold">
              Yes
            </span>
          ) : (
            <span className="bg-red-900 p-1 px-3 text-white font-bold">No</span>
          )}
        </td>
        <td className="bg-gray-700 align-top px-1 border-x-white border-2 pt-3 ">
          <span className="bg-blue-900 p-1 px-3 text-white font-bold cursor-pointer">
            Edit
          </span>
          <span className="bg-red-900 p-1 px-3 text-white font-bold cursor-pointer ml-4">
            Delete
          </span>
        </td>
      </tr>
    )
  })
  return searchPostResult

  // return (
  //   <tbody>
  //     <tr className="border-black text-sm text-gray-200">
  //       <td className="bg-gray-700 align-top px-1 font-bold border-x-white border-2">
  //         YteAngels First Post by Search
  //       </td>
  //       <td className="bg-gray-700 align-top px-1 border-x-white border-2 line-clamp-6">
  //         The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones
  //         (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop,
  //         Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The
  //         Sliding Mr. Bones (Next Stop, Pottersville)
  //       </td>
  //       <td className="bg-gray-700 align-top px-1 font-bold border-x-white border-2">
  //         Nomase Agho
  //       </td>
  //       <td className="bg-gray-700 align-top px-1 border-x-white border-2">
  //         9399
  //       </td>
  //       <td className="bg-gray-700 align-top px-1 border-x-white border-2">
  //         21/05/2022
  //       </td>
  //       <td className="bg-gray-700 align-top text-center px-1 pt-3 border-x-white border-2">
  //         {2 + 2 === 7 ? (
  //           <span className="bg-blue-900 p-1 px-3 text-white font-bold">
  //             Yes
  //           </span>
  //         ) : (
  //           <span className="bg-red-900 p-1 px-3 text-white font-bold">No</span>
  //         )}
  //       </td>
  //       <td className="bg-gray-700 align-top px-1 border-x-white border-2 pt-3 ">
  //         <span className="bg-blue-900 p-1 px-3 text-white font-bold cursor-pointer">
  //           Edit
  //         </span>
  //         <span className="bg-red-900 p-1 px-3 text-white font-bold cursor-pointer ml-4">
  //           Delete
  //         </span>
  //       </td>
  //     </tr>
  //   </tbody>
  // );
};

export { getAllPost, getSearchPostItem };
