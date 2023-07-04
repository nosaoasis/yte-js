import { useEffect } from "react";
import { createMarkup } from "../../../helpers/posts";
import { useNavigate } from "react-router-dom";

const PreviewPost = (props) => {
  const { customEditorContent, setShowPreviewPost, postTitle, previewImage } = props;

  const navigate = useNavigate()

  const handleClosePreview = () => {
    setShowPreviewPost(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/admin", { replace: true });
      return
    }
  }, [])

  return (
    <>
      <div className="absolute p-4 top-0  w-10/12 h-full bg-black">
        <div className="relative">
          <img
            className="mx-auto h-64 w-auto"
            src={previewImage}
            alt="img"
          />
          <i
            className="fa-solid fa-window-close cursor-pointer text-gray-400 text-xl absolute top-2 right-2"
            onClick={handleClosePreview}
          ></i>
        </div>
        <div className="mt-4">
          <h1 className="text-gray-100 capitalize font-bold text-xl">{postTitle}</h1>
          <div
            className="post_content mt-4 text-black bg-white p-2 overflow-y-scroll h-72"
            dangerouslySetInnerHTML={createMarkup(customEditorContent)}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PreviewPost;
