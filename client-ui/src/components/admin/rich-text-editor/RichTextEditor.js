import { useEffect, useState } from "react";
import adminMenuList from "../admin-menu-list";
import { defaultMenu } from "../AdminMenu";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Loading } from "../";
import axios from "axios";
import { PreviewPostModal, ConfirmPublishModal } from "../modal";
import Compressor from "compressorjs";
import Resizer from "react-image-file-resizer";

const RichTextEditor = () => {
  const params = useParams();
  const navigate = useNavigate()
  const { post_id } = params;

  const [postId, setPostId] = useState(post_id || false);
  const [loading, setLoading] = useState(true);
  const [compressedFile, setCompressedFile] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [customEdContent, setCustomEdContent] = useState("");
  const [published, setPublished] = useState(false);
  const [showConfirmPublishModal, setShowConfirmPublishModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [imageEdit, setImageEdit] = useState(""); // coming from the edit button click
  const [showPreviewPost, setShowPreviewPost] = useState(false);
  // const [showImageResize, setShowImageResize] = useState(false)

  const updateContent = (e) => {
    const postContent = e.target.innerHTML;
    setCustomEdContent(postContent);
  };

  const handleCreatePost = async (published) => {
    if (!postTitle || !customEdContent || !compressedFile) {
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
            post_body: customEdContent.toString(),
            title: postTitle,
            published,
            imageLink: res.data.image,
          })
          .then((resp) => {
            <Loading message="Your post has been sent. You will be redirected soon" />;
            setTimeout(() => {
              navigate("/admin/posts", { replace: true });
            }, 3000);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => console.log("error on loading", err));
  };

  const handleShowPreview = () => {
    setShowPreviewPost(true);
  };

  const handleCompression = (e) => {
    const image = e.target.files[0];

    if (image && image.type.substr(0, 5) === "image") {
      setSelectedImage(image);
    } else {
      setSelectedImage(null);
    }

    new Compressor(image, {
      quality: 0.6,
      success: (compressedResult) => {
        setCompressedFile(compressedResult);
      },
    });
  };

  const handleUpdatePost = async (published) => {
    let payload = {
      published,
      postTitle,
      customEdContent,
      imageLink: imageEdit,
    };
    if (compressedFile) {
      const formData = new FormData();
      formData.append("image", compressedFile);
      await axios
        .post(`http://localhost:3764/api/v1/images/post`, formData)
        .then((res) => {
          payload = { ...payload, imageLink: res.data.image };
        })
        .catch((err) =>
          console.log("An error occurred. Cloudinary send javascript", err)
        );
    }

    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:3764/api/v1/post/update_post/${postId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log("An error occured....", err));
  };

  useEffect(() => {
    if (postId) {
      axios
        .get(`http://localhost:3764/api/v1/post/get_single_post/${postId}`)
        .then((res) => {
          const { imageLink, post_body, published, title } = res.data.post;
          setImageEdit(imageLink);
          setPostTitle(title);
          setCustomEdContent(post_body);
          setPublished(published);
          document.querySelector("#text-input").innerHTML = post_body;
        })
        .catch((err) => console.log("An error occured....", err));
    }
    window["customRichTextJS"]();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [postId]);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  }, [selectedImage, previewImage]);

  return (
    <>
      <div className="flex">
        {/* menu start */}
        <div className="w-2/12 bg-black min-h-screen pt-4 pl-2">
          <ul>{defaultMenu(adminMenuList)}</ul>
        </div>
        <div className="pt-4 pl-2 bg-black bg-no-repeat bg-cover h-screen flex-1 border-gray-600 border-2">
          <h2 className="text-3xl text-gray-100 font-bold ml-8">Posts</h2>

          <button className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white">
            <Link to="/admin/posts">All Posts</Link>
          </button>

          <div className="mb-4 flex justify-between mx-8">
            <span className="capitalize mt-4 font-semibold text-xl bg-none text-white">
              {imageEdit.length < 1 ? "New Post" : "Edit Post"}
            </span>
            <div className="">
              {postId ? (
                <button
                  className="capitalize p-2 px-4 mt-4  bg-green-700 text-white"
                  onClick={() => handleUpdatePost(published)}
                >
                  Update
                </button>
              ) : (
                <>
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
                </>
              )}

              <button
                className="capitalize p-2 px-4 mt-4 ml-2 bg-yellow-500 text-white"
                onClick={handleShowPreview}
              >
                Preview
              </button>
            </div>
          </div>

          {/* input image and input title */}
          <div className="flex mx-8">
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
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>

          {/* rich text buttons */}
          <div className="options mx-8">
            {/* <!-- text format --> */}
            <button id="bold" className="option-button format">
              <i className="fa-solid fa-bold"></i>
            </button>
            <button id="italic" className="option-button format">
              <i className="fa-solid fa-italic"></i>
            </button>
            <button id="underline" className="option-button format">
              <i className="fa-solid fa-underline"></i>
            </button>
            <button id="strikethrough" className="option-button format">
              <i className="fa-solid fa-strikethrough"></i>
            </button>
            <button id="superscript" className="option-button script">
              <i className="fa-solid fa-superscript"></i>
            </button>
            <button id="subscript" className="option-button script">
              <i className="fa-solid fa-subscript"></i>
            </button>

            {/* <!-- lists --> */}
            <button id="insertOrderedList" className="option-button">
              <i className="fa-solid fa-list-ol"></i>
            </button>
            <button id="insertUnorderedList" className="option-button">
              <i className="fa-solid fa-list-ul"></i>
            </button>
            <button id="undo" className="option-button">
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button id="redo" className="option-button">
              <i className="fa-solid fa-rotate-right"></i>
            </button>

            {/* <!-- link --> */}
            <button id="createLink" className="adv-option-button">
              <i className="fa-solid fa-link"></i>
            </button>
            <button id="unlink" className="option-button">
              <i className="fa-solid fa-unlink"></i>
            </button>

            {/* <!-- alignments --> */}
            <button id="justifyLeft" className="option-button">
              <i className="fa-solid fa-align-left"></i>
            </button>
            <button id="justifyCenter" className="option-button">
              <i className="fa-solid fa-align-center"></i>
            </button>
            <button id="justifyRight" className="option-button">
              <i className="fa-solid fa-align-right"></i>
            </button>
            <button id="justifyFull" className="option-button">
              <i className="fa-solid fa-align-justify"></i>
            </button>
            <button id="indent" className="option-button spacing">
              <i className="fa-solid fa-indent"></i>
            </button>
            <button id="outdent" className="option-button spacing">
              <i className="fa-solid fa-outdent"></i>
            </button>
            {/* <button id="" className="option-button image">
          <i class="fa-solid fa-image"></i>
          </button> */}

            {/* <!-- headings --> */}
            <select id="formatBlock" className="adv-option-button">
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H4">H4</option>
              <option value="H5">H5</option>
              <option value="H6">H6</option>
            </select>

            {/* <!-- font name --> */}
            <select id="fontName" className="adv-option-button"></select>
            <select id="fontSize" className="adv-option-button"></select>

            {/* <!-- colors --> */}
            <div className="input-wrapper">
              <input
                type="color"
                id="foreColor"
                className="adv-option-button"
              />
              <label htmlFor="foreColor">Font Color</label>
            </div>
            <div className="input-wrapper">
              <input
                type="color"
                id="backColor"
                className="adv-option-button"
              />
              <label htmlFor="backColor">Highlight Color</label>
            </div>
          </div>

          {/* rich text content area */}
          <div
            id="text-input"
            className="editor_content_area outline-none mx-8 bg-white break-all"
            contentEditable={true}
            suppressContentEditableWarning
            onInput={updateContent}
          ></div>

          {/* Preview Post */}
          {showPreviewPost && (
            <PreviewPostModal
              postTitle={postTitle}
              customEditorContent={customEdContent}
              setShowPreviewPost={setShowPreviewPost}
              previewImage={previewImage ? previewImage : imageEdit}
            />
          )}

          {/* Confirm Publish Modal */}
          {showConfirmPublishModal && (
            <ConfirmPublishModal
              question={"Are you certain you wish to publish at this time?"}
              setPublished={setPublished}
              setShowConfirmPublishModal={setShowConfirmPublishModal}
              handleCreatePost={handleCreatePost}
            />
          )}

          {loading && <Loading message="Loading" />}
        </div>
      </div>
    </>
  );
};

export default RichTextEditor;
