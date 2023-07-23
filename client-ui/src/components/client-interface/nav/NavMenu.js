import React from "react";
import NavLinks from "./NavLinks";

const NavMenu = () => {
  // return (
  //   <>
  //     <ul className="">
  //       <NavLinks />
  //     </ul>
  //     <p className="text-white font-bold text-xs absolute bottom-2 left-5">© YteAngel {new Date().getFullYear()}</p>
  //   </>
  // );

  const menuList = () => {
    return (
      <>
      <ul className="">
        <NavLinks />
      </ul>
      <p className="text-white font-bold text-xs absolute bottom-2 left-5">© YteAngel {new Date().getFullYear()}</p>
    </>
    )
  }

  return (
    <div className="bg-gray-900 w-2/12 min-h-screen fixed pt-3">
      {menuList()}
      </div>
  )
};

export default NavMenu;
