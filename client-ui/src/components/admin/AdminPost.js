import React, { useState } from "react";
import yteOne from "../../images/yte_one.jpg";
import { Link } from "react-router-dom";
// import axios from "axios";
import { getAllPost, getSearchPostItem } from "../../helpers/posts";

const AdminPost = () => {
  const [input, setInput] = useState({
    searchPost: "",
    searching: false,
    searchResult: null,
    loading: false,
  });

  const handleSearch = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("input value is ", value);
    if (!value) {
      setInput((prev) => ({
        ...prev,
        loading: false,
        searching: false,
        searchPost: "",
      }));
      return;
    }
    setInput((prev) => ({
      ...prev,
      loading: true,
      searching: true,
      [name]: value,
    }));
    const searcResult = await getSearchPostItem(input.searchPost);
    setInput((prev) => ({
      ...prev,
      loading: false,
      searching: true,
      searchResult: searcResult,
    }));
    // .then((resp) => {
    //   console.log("response is ", resp)
    // setInput((prev) => ({
    //   ...prev,
    //   loading: false,
    //   searching: true,
    //   searchResult: resp
    // }));
    // })

    // make the axios call here when ready....
  };

  return (
    <>
      <div
        className="pt-4 pl-2 bg-no-repeat bg-cover h-screen border-white border-2"
        style={{ backgroundImage: `url(${yteOne})` }}
      >
        <h2 className="text-3xl text-white font-bold ml-8">Posts</h2>
        <Link to="" className="px-4 ml-4">
          <button className="capitalize p-2 px-4 mt-4 bg-slate-700 text-white">
            <i className="far fa-plus-square mr-2"></i>create new post
          </button>
        </Link>
        <div className="py-2 pl-2 ml-6 mr-8 pr-2 mt-4">
          <input
            type="text"
            name="searchPost"
            placeholder="Search Posts by Title"
            value={input.searchPost}
            className="border-2 border-white w-full p-2 rounded-md"
            onChange={handleSearch}
          />
        </div>

        {/* Table of Posts */}
        <div className="bg-white pb-2 ml-8 mr-8 mt-4 h-96 overflow-y-scroll z-10 relative">
          <div>
            <table className="">
              <tr className="sticky top-0 bg-black text-white text-sm">
                <th className="w-14 py-2 border-x-white border-2">
                  Post Title
                </th>
                <th className="w-14 py-2 border-x-white border-2">Content</th>
                <th className="w-14 py-2 border-x-white border-2">Author</th>
                <th className="w-14 py-2 border-x-white border-2">Comments</th>
                <th className="w-14 py-2 border-x-white border-2">
                  Time Created
                </th>
                <th className="w-14 py-2 border-x-white border-2">Published</th>
                <th className="w-14 py-2 border-x-white border-2">Action</th>
              </tr>
              {input.searching || (input.searchPost === "" && getAllPost())}
              {input.searching && input.searchResult}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPost;
