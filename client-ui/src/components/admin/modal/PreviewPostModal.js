import { createMarkup } from "../../../helpers/posts";

const PreviewPost = (props) => {
  const { customEditorContent, setShowPreviewPost, postTitle, previewImage } = props;

  const handleClosePreview = () => {
    setShowPreviewPost(false);
  };

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
        {/* <div className="post_content mt-6 text-white">
          lorem12lfmvmfvmfv,ml,mfd,e,dlp,d
        </div> */}
      </div>
    </>
  );
};

export default PreviewPost;
