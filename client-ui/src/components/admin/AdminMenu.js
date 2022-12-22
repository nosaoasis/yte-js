import React from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultMenu = (adminMenuList) => {
  const menuList = adminMenuList.map((menu) => {
    const { id, page_name, to_link, fa_icon } = menu;
    return (
      <React.Fragment key={id}>
        <li className="text-gray-200 py-2 px-2 mr-2 font-bold hover:bg-white hover:text-black">
          <Link to={`/admin/${to_link}`}>
            <i className={`${fa_icon} mr-2`}></i>
            {page_name}
          </Link>
        </li>
      </React.Fragment>
    );
  });

  return menuList;
};

const DashboardGridMenu = (adminMenuList) => {
  const navigate = useNavigate();
  const gridMenuDashboard = adminMenuList.map((menu) => {
    const { id, page_name, to_link, fa_icon } = menu;
    return (
      <React.Fragment key={id}>
        <div className="border border-solid border-white h-36 text-white bg-gray-500 flex flex-col items-center justify-center hover:bg-gray-900 opacity-90">
          <i
            className={`${fa_icon} fa-3x cursor-pointer`}
            onClick={() => navigate(`/admin/${to_link}`)}
          ></i>
          <p
            className="mt-4 text-lg font-bold cursor-pointer"
            onClick={() => navigate(`/admin/${to_link}`)}
          >
            {page_name}
          </p>
        </div>
      </React.Fragment>
    );
  });

  return gridMenuDashboard;
};

export { defaultMenu, DashboardGridMenu };
