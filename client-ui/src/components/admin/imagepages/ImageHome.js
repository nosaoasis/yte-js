import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultMenu } from "../AdminMenu";
import adminMenuList from "../admin-menu-list";
import yteFive from "../../../images/yte_five.jpg";
import { SingleImage } from "./index";
import Compressor from "compressorjs";
import axios from "axios";

const ImageHome = () => {
  const [imageTitle, setImageTitle] = useState("");
  const [imageSelected, setImageSelected] = useState();
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSent, setImageSent] = useState(false);
  const [imageList, setImageList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    axios
      .get(`http://localhost:3764/api/v1/pictures`)
      .then((res) => {
        setImageList(res.data.allPictures);
      })
      .catch((err) => console.log("error on loading", err));
  }, [imageSent]);

  const handleCompression = (e) => {
    const image = e.target.files[0];

    if (image && image.type.substr(0, 5) === "image") {
      setImageSelected(image);
    } else {
      setImageSelected(null);
    }

    new Compressor(image, {
      quality: 0.6,
      success: (compressedResult) => {
        setCompressedImage(compressedResult);
      },
    });
  };

  const handleUploadImage = async () => {
    if (!imageSelected || !compressedImage) {
      alert("You title and image cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("image", compressedImage);
    await axios
      .post(`http://localhost:3764/api/v1/images/post`, formData)
      .then(async (res) => {
        await axios
          .post(`http://localhost:3764/api/v1/pictures/create_picture`, {
            title: imageTitle,
            imageLink: res.data.image,
          })
          .then((resp) => {
            setLoading(false);
            setImageTitle("");
            setImageSelected();
            setCompressedImage(null);
            setImageSent(!imageSent);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => console.log("error on loading", err));
  };

  return (
    <>
      <div className="flex">
        {/* menu start */}
        <div className="w-2/12 bg-black min-h-screen pt-4 pl-2">
          <ul>{defaultMenu(adminMenuList)}</ul>
        </div>
        {/* menu end */}

        <div
          className="pt-4 pl-2 bg-no-repeat bg-cover min-h-screen flex-1"
          style={{ backgroundImage: `url(${yteFive})` }}
        >
          <h2 className="text-3xl text-white font-bold ml-8">
            Picture Overview
          </h2>

          {/* input image and input title */}
          <div className="flex mx-8 mt-5">
            <label
              htmlFor="postImage"
              className="inputLabel  mb-2 p-2 mr-1 cursor-pointer bg-green-400"
            >
              <i className="fa-solid fa-image text-white w-3/12 h-full">
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
              className="w-10/12 mb-2 px-2 py-1 bg-gray-100 capitalize border-none"
              type="text"
              value={imageTitle}
              placeholder="Image Title"
              onChange={(e) => setImageTitle(e.target.value)}
            />
            <button
              className="capitalize mb-2 w-2/12 bg-slate-700 text-sm text-white hover:bg-slate-900"
              onClick={handleUploadImage}
            >
              Upload New Image
            </button>
          </div>

          <div className="grid grid-cols-dashboard-menu gap-5 px-8 mt-4  ">
            {/* {DashboardGridMenu(adminMenuList)} */}
            {!loading && imageList.length > 1 ? (
              imageList.map((img, index) => (
                <SingleImage
                  key={index}
                  imageTitle={img.title}
                  imageLink={img.imageLink}
                  id={img._id}
                  setImageSent={setImageSent}
                  imageSent={imageSent}
                />
              ))
            ) : (
              <>
                <div className="flex items-center justify-center bg-black opacity-80 h-96">
                  <p className="text-2xl font-bold text-gray-200">
                    You don't have any pictures uploaded yet.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageHome;
