import React from "react";

const ConfirmPublishModal = (props) => {
  const {setPublished, setShowConfirmPublishModal, handleCreatePost} = props

  const handleYesClicked = () => {
    setShowConfirmPublishModal(false)
    handleCreatePost(true)
  }
  
  const handleNoClicked = () => {
    setPublished(false)
    setShowConfirmPublishModal(false)
  }


  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 zindex h-40 w-4/12 p-4 bg-black text-gray-200 font-bold text-center text-xl">
        <p>Are you certain you wish to publish at this time?</p>
        <div className="flex items-center justify-around mt-4">
          <button className="bg-gray-100 px-6 py-1 font-bold text-base text-black" onClick={handleYesClicked}>Yes</button>
          <button className="bg-gray-100 px-6 py-1 font-bold text-base text-black" onClick={handleNoClicked}>No</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmPublishModal;
