import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Blog from "../blog/Blog";
import Peoms from "../peoms/Peoms";
import Pictures from "../pictures/Pictures";
import Videos from "../videos/Videos";
import Books from "../books/Books";
import DailyThoughts from "../daily-thoughts/DailyThoughts";
import ClientHomePage from "../ClientHomePage";

const NavLinks = () => {
  const navigate = useNavigate()
  const linkArray = [
    {
      component: { ClientHomePage },
      page_name: "Home",
      to_path: "/",
      fa_icon: "fa-solid fa-house"
    },
    {
      component: { Blog },
      page_name: "Blog",
      to_path: "/blog",
      fa_icon: "far fa-sticky-note fa-1x"
    },
    {
      component: { Pictures },
      page_name: "Pictures",
      to_path: "/pictures",
      fa_icon: "far fa-images"
    },
    {
      component: { Videos },
      page_name: "Videos",
      to_path: "/videos",
      fa_icon: "fas fa-video"
    },
    {
      component: { Peoms },
      page_name: "Peoms",
      to_path: "/peoms",
      fa_icon: "fa fa-list fa-1x"
    },
    {
      component: { Books },
      page_name: "Books",
      to_path: "/books",
      fa_icon: "fas fa-book-reader"
    },
    {
      component: { DailyThoughts },
      page_name: "DailyThoughts",
      to_path: "/daily-thoughts",
      fa_icon: "far fa-comment-dots"
    }
  ];

  const navlinks = linkArray.map((item, index) => {
    return (
      <li className="px-8 font-bold text-gray-200 hover:text-gray-800 hover:bg-gray-200 py-4 w-full" key={index}>
        <i className={`${item.fa_icon} cursor-pointer mr-2`}></i>
        <Link to={item.to_path}>{item.page_name}</Link>
      </li>
    );
  });
  return <>{navlinks}</>;
};

export default NavLinks;
