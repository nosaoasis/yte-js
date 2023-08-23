import React, { useState } from "react";
import axios from "axios";

const SingleImage = (props) => {
  const { id, imageTitle, imageLink, setImageSent, imageSent } = props;

  const [deleteIconClicked, setDeleteIconClicked] = useState(false);
  const handleDeleteImage = () => setDeleteIconClicked(true);

  const handleYesClicked = () => {
    axios
      .delete(`http://localhost:3764/api/v1/pictures/delete_image/${id}`)
      .then((res) => {
        if (res.status > 299 && res.status > 499) {
          alert("Sorry an error, occurred, please try again")
        }
        setImageSent(!imageSent)
    })
    .catch((err) => {
      alert("Sorry an error, occurred, please try again")
      setDeleteIconClicked(false)
      });
  };

  const handleNoClicked = () => setDeleteIconClicked(false);

  return (
    <>
      <div className="border-2 border-black bg-black pb-3 relative">
        <i
          onClick={handleDeleteImage}
          className="fa fa-trash text-white hover:text-red-700 absolute top-2 right-2 p-2 bg-black rounded-full cursor-pointer"
          aria-hidden="true"
        ></i>
        <div className="h-40">
          <img
            className="h-full w-full border-2 border-gray-600"
            src={imageLink}
            alt="images"
          />
        </div>
        {deleteIconClicked ? (
          <p className="text-white bg-red-600 font-bold uppercase text-lg mt-3 pl-3">
            <span
              className="cursor-pointer hover:text-green-500"
              onClick={handleYesClicked}
            >
              Confirm Delete
            </span>
            <span
              className="float-right mr-3 cursor-pointer hover:text-green-500"
              onClick={handleNoClicked}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </span>
          </p>
        ) : (
          <p className="text-gray-200  text-lg mt-3 pl-3">{imageTitle}</p>
        )}
      </div>
    </>
  );
};

export default SingleImage;
