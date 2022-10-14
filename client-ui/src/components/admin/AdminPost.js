import React, { useState, useEffect } from "react";
import yteOne from "../../images/yte_one.jpg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ConfirmPublishModal, PreviewPostModal } from "./modal";
import RichTextEditor from "./rich-text-editor/RichTextEditor";
import Compressor from "compressorjs";
import { Loading } from "./";

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
  const [customEditorContent, setCustomEditorContent] = useState("");
  const [newPosteditPost, setNewPosteditPost] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const [selectedImage, setSelectedImage] = useState()
  const [previewImage, setPreviewImage] = useState()

  const [compressedFile, setCompressedFile] = useState(null);

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

  const handleCompression = (e) => {
    const image = e.target.files[0];
    if (image && image.type.substr(0, 5) === "image") {
      setSelectedImage(image)
    } else {
      setSelectedImage(null)
    }

    new Compressor(image, {
      quality: 0.6,
      success: (compressedResult) => {
        setCompressedFile(compressedResult);
      }
    });
  };

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(selectedImage)
    } else {
      setPreviewImage(null)
    }
  }, [selectedImage, previewImage])

  useEffect(() => {
    axios.get(`http://localhost:3764/api/v1/post`)
    .then(resp => {
      setAllPost(resp.data.posts);
    })
  }, [])


  const handleCreatePost = async (published) => {
    if (!postTitle || !customEditorContent || !compressedFile) {
      alert("You title, content and image cannot be empty");
      return;
    }
    setLoading(true);
    
    const formData = new FormData();
    formData.append("image", compressedFile);
    await axios
      .post(`http://localhost:3764/api/v1/images/post`, formData)
      .then(async (res) => {
        await axios
          .post(`http://localhost:3764/api/v1/post/create`, {
            post_body: customEditorContent.toString(),
            title: postTitle,
            published,
            imageLink: res.data.image,
          })
          .then((resp) => {
            <Loading message="Your post has been sent. You will be redirected soon" />;
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
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
    if (!postTitle || !customEditorContent || !compressedFile) {
      alert("You title, content and image cannot be empty");
      return;
    }
    setShowPreviewPost(true);
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
          <div className="py-2 pl-2 ml-6 mr-8 mt-4">
            <input
              type="text"
              name="searchPost"
              placeholder="Search Posts by Title"
              value={input.searchPost}
              className="border-2 border-white w-full p-2 outline-none"
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
                      Blog Title
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
                  (input.searchPost === "" && <tbody>{getAllPost(allPost)}</tbody>)}
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
              </div>
            </div>
            <div className="flex">
              <label
                htmlFor="postImage"
                className="inputLabel  mb-2 p-2 mr-1 cursor-pointer bg-green-400"
              >
                <i className="fa-solid fa-image text-white w-auto h-full">
                  <input
                    className="hidden"
                    id="postImage"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleCompression}
                  />
                </i>
              </label>
              <input
                className="w-full mb-2 p-2 bg-gray-100 capitalize"
                type="text"
                value={postTitle}
                placeholder="Blog Title"
                onChange={(e) => setPostTilte(e.target.value)}
              />
            </div>

            <div className="border-2 border-x-white bg-white px-1">
              <RichTextEditor setCustomEditorContent={setCustomEditorContent} />
            </div>
          </div>
        )}

        {showPreviewPost && (
          <PreviewPostModal
            postTitle={postTitle}
            customEditorContent={customEditorContent}
            setShowPreviewPost={setShowPreviewPost}
            previewImage={previewImage}
          />
        )}

        {showConfirmPublishModal && (
          <ConfirmPublishModal
            setPublished={setPublished}
            setShowConfirmPublishModal={setShowConfirmPublishModal}
            handleCreatePost={handleCreatePost}
          />
        )}

        {loading && <Loading message="Loading" />}
      </div>
    </>
  );
}

export default AdminPost;
