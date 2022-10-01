import React, { useState } from "react";
import yteOne from "../../images/yte_one.jpg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ConfirmPublishModal, PreviewPostModal } from "./modal";
import RichTextEditor from "./rich-text-editor/RichTextEditor";

import { getAllPost, getSearchPostItem } from "../../helpers/posts";

function AdminPost() {
  const adminPostLocation = useLocation();

  const [input, setInput] = useState({
    searchPost: "",
    searching: false,
    searchResult: null,
    loading: false,
    createPost: adminPostLocation.state !== null ? true : false,
  });
  const [postTitle, setPostTilte] = useState("");
  const [fileData, setFileData] = useState();
  const [images, setFile] = useState("");
  // const [cloudinaryImageLink, setCloudinaryImageLink] = useState();
  const [customEditorContent, setCustomEditorContent] = useState("");
  const [newPosteditPost, setNewPosteditPost] = useState("");
  const [published, setPublished] = useState(false);

  const [showConfirmPublishModal, setShowConfirmPublishModal] = useState(false);
  const [showPreviewPost, setShowPreviewPost] = useState(false);

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

    // make the axios call here when ready....
  };

  const handleCreatePost = async () => {
    if (!postTitle || !customEditorContent) {
      alert("You title and content cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileData);
    await axios
      .post(`http://localhost:3764/api/v1/images/post`, formData)
      .then(async (res) => {
        await axios
          .post(`http://localhost:3764/api/v1/post/create`, {
            post_body: customEditorContent.toString(),
            title: postTitle,
            published,
            imageLink: res.data.image
          })
          .then((resp) => {
            setPostTilte("");
            setPublished(false);
            setCustomEditorContent("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("error on loading", err));
  };

  const handleShowCreatePost = () => {
    setInput((prev) => ({
      ...prev,
      loading: false,
      searching: false,
      searchPost: "",
      createPost: true,
    }));
    setNewPosteditPost("New Post");
  };

  const shwoAllPosts = () => {
    setInput((prev) => ({
      ...prev,
      createPost: false,
    }));
  };

  const handleShowPreview = () => {
    setShowPreviewPost(true);
    console.log("----");
  };

  const handleFileChange = (e) => {
    console.log("file value is ", e.target);
    console.log("file value is ", e.target.files[0]);
    setFileData(e.target.files[0]);
    setFile(e.target.value);
  };

  return (
    <>
      <div
        className="pt-4 pl-2 bg-no-repeat bg-cover h-screen border-gray-600 border-2"
        style={{ backgroundImage: `url(${yteOne})` }}
      >
        <h2 className="text-3xl text-white font-bold ml-8">Posts</h2>
        {input.createPost || (
          <button
            className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white"
            onClick={handleShowCreatePost}
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
                <thead>
                  <tr className="sticky top-0 bg-black text-white text-sm">
                    <th className="w-14 py-2 border-x-white border-2">
                      Post Title
                    </th>
                    <th className="w-14 py-2 border-x-white border-2">
                      Content
                    </th>
                    <th className="w-14 py-2 border-x-white border-2">
                      Author
                    </th>
                    <th className="w-14 py-2 border-x-white border-2">
                      Comments
                    </th>
                    <th className="w-14 py-2 border-x-white border-2">
                      Time Created
                    </th>
                    <th className="w-14 py-2 border-x-white border-2">
                      Published
                    </th>
                    <th className="w-14 py-2 border-x-white border-2">
                      Action
                    </th>
                  </tr>
                </thead>

                {input.searching ||
                  (input.searchPost === "" && <tbody>{getAllPost()}</tbody>)}
                {input.searching && <tbody>{input.searchResult}</tbody>}
              </table>
            </div>
          </div>
        )}

        {input.createPost && (
          <div className="mx-8 w-f">
            <div className="mb-4 flex justify-between">
              <span className="capitalize p-2 px-4 mt-4 text-xl bg-none text-white">
                {newPosteditPost}
              </span>
              <div className="">
                <button
                  className="capitalize p-2 px-4 mt-4  bg-green-700 text-white"
                  onClick={() => handleCreatePost(published)}
                >
                  Save Blog
                </button>
                <button
                  className="capitalize p-2 px-4 mt-4 ml-2 bg-blue-700 text-white"
                  onClick={() => setShowConfirmPublishModal(true)}
                >
                  Save & Publish Blog
                </button>
                <button
                  className="capitalize p-2 px-4 mt-4 ml-2 bg-yellow-500 text-white"
                  onClick={handleShowPreview}
                >
                  Preview
                </button>
                <button className="capitalize p-2 px-4 mt-4 ml-2 bg-yellow-500 text-white">
                  <form>
                    <input
                      value={images}
                      type="file"
                      name="file"
                      accept="image/"
                      onChange={handleFileChange}
                    />
                  </form>
                  Add Image
                </button>
              </div>
            </div>
            <input
              className="w-full mb-2 p-2 bg-gray-100 capitalize"
              type="text"
              value={postTitle}
              placeholder="Blog Title"
              onChange={(e) => setPostTilte(e.target.value)}
            />

            <div className="border-2 border-x-white bg-white">
              <RichTextEditor setCustomEditorContent={setCustomEditorContent} />
            </div>
          </div>
        )}

        {showPreviewPost && (
          <PreviewPostModal
            postTitle={postTitle}
            customEditorContent={customEditorContent}
            setShowPreviewPost={setShowPreviewPost}
          />
        )}

        {showConfirmPublishModal && (
          <ConfirmPublishModal
            setPublished={setPublished}
            setShowConfirmPublishModal={setShowConfirmPublishModal}
            handleCreatePost={handleCreatePost}
          />
        )}
      </div>
    </>
  );
}

export default AdminPost;
