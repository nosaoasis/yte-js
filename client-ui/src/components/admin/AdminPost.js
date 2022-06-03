import React, { useState } from "react";
import yteOne from "../../images/yte_one.jpg";
import { useLocation } from "react-router-dom";
// import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import { getAllPost, getSearchPostItem } from "../../helpers/posts";

function AdminPost() {
  const adminPostLocation = useLocation();
  // console.log(adminPostLocation)
  const [input, setInput] = useState({
    searchPost: "",
    searching: false,
    searchResult: null,
    loading: false,
    createPost: adminPostLocation.state !== null ? true : false,
  });
  const [convertedContent, setConvertedContent] = useState(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  console.log('====================================');
  console.log("the converted content is ", convertedContent);
  console.log('====================================');

  const handleSearch = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (!value) {
      return setInput((prev) => ({
        ...prev,
        loading: false,
        searching: false,
        searchPost: "",
      }));
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

  const handleCreatePost = () => {
    setInput((prev) => ({
      ...prev,
      loading: false,
      searching: false,
      searchPost: "",
      createPost: true,
    }));
  };

  const shwoAllPosts = () => {
    setInput((prev) => ({
      ...prev,
      createPost: false,
    }));
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div
        className="pt-4 pl-2 bg-no-repeat bg-cover h-screen border-white border-2"
        style={{ backgroundImage: `url(${yteOne})` }}
      >
        <h2 className="text-3xl text-white font-bold ml-8">Posts</h2>
        {input.createPost || (
          <button
            className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white"
            onClick={handleCreatePost}
          >
            <i className="far fa-plus-square mr-2"></i>create new post
          </button>
        )}
        {input.createPost && (
          <button
            className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white"
            onClick={shwoAllPosts}
          >
            All Posts
          </button>
        )}

        {input.createPost || (
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
        )}

        {/* Table of Posts */}
        {input.createPost || (
          <div className="bg-white pb-2 ml-8 mr-8 mt-4 h-96 overflow-y-scroll z-10 relative">
            <div>
              <table className="">
                <tr className="sticky top-0 bg-black text-white text-sm">
                  <th className="w-14 py-2 border-x-white border-2">
                    Post Title
                  </th>
                  <th className="w-14 py-2 border-x-white border-2">Content</th>
                  <th className="w-14 py-2 border-x-white border-2">Author</th>
                  <th className="w-14 py-2 border-x-white border-2">
                    Comments
                  </th>
                  <th className="w-14 py-2 border-x-white border-2">
                    Time Created
                  </th>
                  <th className="w-14 py-2 border-x-white border-2">
                    Published
                  </th>
                  <th className="w-14 py-2 border-x-white border-2">Action</th>
                </tr>
                {input.searching || (input.searchPost === "" && getAllPost())}
                {input.searching && input.searchResult}
              </table>
            </div>
          </div>
        )}

        {input.createPost && (
          <div className="mx-8">
            <button className="capitalize p-2 px-4 mt-4 block text-2xl bg-none text-white">
              New Post
            </button>
            <hr className="border-b-2 border-white mb-4" />
            <div className="border-2 border-x-white bg-white">
              <Editor
                //  editorState={editorState}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  // image: {uploadCallback : uploadImageCallBack, alt: {present : true, mandatory : true} },
                }}
                placeholder="Begin typing your article here..."
                onEditorStateChange={handleEditorChange}
              />
            </div>
          </div>
        )}
      </div>
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </>
  );
}

export default AdminPost;
