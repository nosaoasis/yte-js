import React, { useState, useEffect } from "react";
import yteOne from "../../images/yte_one.jpg";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Loading, BlogTableList } from "./";
import adminMenuList from "./admin-menu-list";
import { defaultMenu } from "./AdminMenu";
import Pagination from "../helper-components/Pagination";

function AdminPost() {
  const adminPostLocation = useLocation();

  const [input, setInput] = useState({
    searchPost: "",
    searching: false,
    searchResult: null,
    loading: false,
    createPost: adminPostLocation.state !== null ? true : false,
  });

  const pageNum = localStorage.getItem("page");

  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [allPost, setAllPost] = useState([]);
  let [page, setPage] = useState(pageNum || 1);
  const [pages, setPages] = useState(1);
  const [searchPage, setSearchPage] = useState(null);

  const handleSearch = async (e) => {
    const value = e.target.value;

    if (!value) {
      setSearchPage(null);
      return setInput((prev) => ({
        ...prev,
        loading: false,
        searching: false,
        searchPost: "",
      }));
    }
    setSearchPage(1);
    setLoadingPost(true);
    setInput((prev) => ({
      ...prev,
      loading: true,
      searching: true,
      searchPost: value,
    }));

    const token = localStorage.getItem("token");
    await axios
      .post(
        `http://localhost:3764/api/v1/post/search_post`,
        { searchString: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        const { msg, post } = res.data;
        setAllPost(post);
        setInput((prev) => ({
          ...prev,
          loading: false,
          searching: true,
          searchResult: msg,
        }));
        setLoadingPost(false);
      })
      .catch((err) => console.error(`An error occured ${err}`));
  };

  const fetchPosts = (page) => {
    setLoadingPost(true);
    axios
      .get(`http://localhost:3764/api/v1/post/${page}`)
      .then((resp) => {
        const { posts, pages: totalPages } = resp.data;
        setPages(totalPages);
        setAllPost(posts);
        setLoadingPost(false);
      })
      .catch((err) => {
        console.error("An unexpected error occurred", err);
        setLoadingPost(false);
      });
  };

  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
    localStorage.setItem("page", page);
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    if (!input.searchPost.length === 0) {
      setSearchPage(null);
    }
  }, [input.searchPost.length]);

  const delPost = (id, page) => {
    const token = localStorage.getItem("token");
    const payload = {
      post_id: id,
    };
    axios
      .post(`http://localhost:3764/api/v1/post/delete_post`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchPosts(page);
      })
      .catch((err) => console.log("An error occured", err));
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
          className="pt-4 pl-2 bg-no-repeat bg-cover h-screen flex-1 border-gray-600 border-2"
          style={{ backgroundImage: `url(${yteOne})` }}
        >
          <h2 className="text-3xl text-gray-100 font-bold ml-8">Posts</h2>
          <button className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white">
            <i className="far fa-plus-square mr-2"></i>
            <Link to="/admin/create_post">create new post</Link>
          </button>

          {input.createPost || (
            <div className="py-2 pl-2 ml-6 mr-8 mt-4">
              <input
                type="text"
                name="searchPost"
                placeholder="Search Posts by Title"
                value={input.searchPost}
                className="border-2 border-white w-full p-2 outline-none"
                onChange={handleSearch}
              />
            </div>
          )}

          {/* Table of Posts */}
          {input.createPost || (
            <>
              <div className="bg-white pb-2 ml-8 mr-8 mt-4 h-96 overflow-y-scroll z-10 relative">
                <div>
                  {loadingPost ? (
                    <Loading message="Fetching Blog" />
                  ) : (
                    <>
                      <table className="">
                        <thead>
                          <tr className="sticky top-0 bg-black text-white text-sm">
                            <th className="w-14 py-2 border-x-white border-2">
                              Blog Title
                            </th>
                            <th className="w-14 py-2 border-x-white border-2">
                              Content
                            </th>
                            <th className="w-14 py-2 border-x-white border-2">
                              Author
                            </th>
                            <th className="w-14 py-2 border-x-white border-2">
                              Comments
                            </th>
                            <th className="w-14 py-2 border-x-white border-2">
                              Time Created
                            </th>
                            <th className="w-14 py-2 border-x-white border-2">
                              Published
                            </th>
                            <th className="w-14 py-2 border-x-white border-2">
                              Action
                            </th>
                          </tr>
                        </thead>

                        {input.searching ||
                          (input.searchPost === "" && (
                            <tbody>
                              {allPost.map((post, idx) => (
                                <BlogTableList
                                  key={idx}
                                  post={post}
                                  delPost={delPost}
                                  page={page}
                                />
                              ))}
                            </tbody>
                          ))}
                        {input.searching && (
                          <tbody>
                            {allPost.map((post, idx) => (
                              <BlogTableList
                                key={idx}
                                post={post}
                                delPost={delPost}
                                page={page}
                              />
                            ))}
                          </tbody>
                        )}
                      </table>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                {searchPage == null ? (
                  <Pagination page={page} pages={pages} setPage={setPage} />
                ) : (
                  ""
                )}
              </div>
            </>
          )}

          {loading && <Loading message="Loading" />}
        </div>
      </div>
    </>
  );
}

export default AdminPost;
