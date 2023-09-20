import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultMenu } from "../AdminMenu";
import adminMenuList from "../admin-menu-list";
import yteFive from "../../../images/yte_five.jpg";
import Compressor from "compressorjs";
import axios from "axios";

const VideosHome = () => {
  const navigate = useNavigate();

  

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
            Videos Overview
          </h2>

          <div className="grid grid-cols-dashboard-menu gap-5 px-8 mt-4  ">
            <div className="flex items-center justify-center bg-black opacity-80 h-96">
              <p className="text-2xl font-bold text-gray-200">
                You don't have any YouTube videos uploaded yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideosHome;
