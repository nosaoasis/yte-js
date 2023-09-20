import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultMenu } from "../AdminMenu";
import adminMenuList from "../admin-menu-list";
import yteFive from "../../../images/yte_five.jpg";
import axios from "axios";

const QuotesHome = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [charExceeded, setCharExceeded] = useState(false);
  const [maxChars, setMaxChars] = useState(150);
  const [charErrorMsg, setCharsErrorMsg] = useState("");
  const [allQuotes, setAllQuotes] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteColor, setQuoteColor] = useState("blue");

  const navigate = useNavigate();

  const quoteColorList = [
    "gray",
    "blue",
    "red",
    "stone",
    "orange",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    axios
      .get(`http://localhost:3764/api/v1/quotes`)
      .then((res) => {
        setAllQuotes(res.data.quotes);
      })
      .catch((err) => {
        console.log("an error occured in the quote component", err);
      });
  }, [quoteIndex]);

  const handleTextAreaChange = (e) => {
    setCharExceeded(false);
    const totalChars = e.target.value.length;
    if (totalChars > maxChars) {
      setCharsErrorMsg(`You can't exceed ${maxChars} characters`);
      setCharExceeded(true);
    }
    setTextAreaValue(e.target.value);
  };

  const handlePublishQuote = () => {
    if (textAreaValue.length > maxChars) {
      setCharsErrorMsg(
        `You can't exceed ${maxChars} characters. Your current character count is ${textAreaValue.length}`
      );
      return;
    }

    const token = localStorage.getItem("token");
    const payload = { quote_body: textAreaValue };
    axios
      .post(`http://localhost:3764/api/v1/quotes/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTextAreaValue("");
        const newQuote = res.data;
        allQuotes.push(newQuote);
      })
      .catch((err) => {
        setTextAreaValue("");
        console.log("an error occured in the quote component", err);
      });
  };

  const handleQuoteIndex = (action) => {
    const quoteColorListLength = quoteColorList.length;
    const randomNumber = Math.floor(
      0 + Math.random() * (quoteColorListLength - 0)
    );
    const quoteColorValue = quoteColorList[randomNumber];
    setQuoteColor(quoteColorValue);
    if (action === "add") {
      if (quoteIndex === allQuotes.length - 1) {
        setQuoteIndex(0);
        return;
      }
      setQuoteIndex((prev) => prev + 1);
    }

    if (action === "remove") {
      if (quoteIndex === 0) {
        setQuoteIndex(allQuotes.length - 1);
        return;
      }
      setQuoteIndex((prev) => prev - 1);
    }
  };

  const handleDeleteQuote = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3764/api/v1/quotes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuoteIndex(0);
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
          className="pt-4 pl-2 bg-no-repeat bg-cover min-h-screen flex-1"
          style={{ backgroundImage: `url(${yteFive})` }}
        >
          <h2 className="text-3xl text-white font-bold ml-8">
            Quotes Overview
          </h2>

          <div className="grid grid-cols-dashboard-menu gap-5 px-8 mt-4  text-white">
            <div className="flex flex-col items-center justify-center bg-black opacity-80 h-96 relative">
              {charExceeded && (
                <div className="text-red-300 mb-2">{charErrorMsg}</div>
              )}

              <div className="absolute top-4 flex items-center justify-center">
                <p className=" capitalize text-2xl font-bold text-white">
                  create quote
                </p>
              </div>
              <div className="w-full px-4">
                <textarea
                  className="w-full h-16 p-1 text-black"
                  onChange={handleTextAreaChange}
                  value={textAreaValue}
                >
                  {textAreaValue}
                </textarea>
                <button
                  onClick={handlePublishQuote}
                  className="text-white bg-green-900 w-full text-xl p-1 font-semibold cursor-pointer  border-white border-2"
                >
                  Publish Quote
                </button>
              </div>
              {/* all quote section */}
              <div className="flex items-center justify-center w-full px-4 mt-8 pt-6">
                <button
                  disabled={quoteIndex === 0 ? true : false}
                  onClick={() => handleQuoteIndex("remove")}
                >
                  <i
                    className={`fa-solid fa-chevron-left ${
                      quoteIndex === 0 ? "text-gray-700" : "text-green-400"
                    }`}
                  ></i>
                </button>
                <div className="flex-1 flex items-center justify-center bg-white py-4 mx-4 rounded-md relative">
                  <i
                    className="fa fa-trash absolute top-2 right-2 text-red-700 text-xs cursor-pointer"
                    aria-hidden="true"
                    onClick={() => handleDeleteQuote(allQuotes[quoteIndex]._id)}
                  ></i>
                  <p
                    className={`font-bold italic`}
                    style={{ color: quoteColor }}
                  >
                    "&nbsp;{" "}
                    {allQuotes.length > 0 && allQuotes[quoteIndex].quote_body}
                    &nbsp; "
                  </p>
                </div>
                <button
                  onClick={() => handleQuoteIndex("add")}
                  disabled={allQuotes.length - 1 === quoteIndex ? true : false}
                >
                  <i
                    className={`fa-solid fa-chevron-right ${
                      allQuotes.length - 1 === quoteIndex
                        ? "text-gray-700"
                        : "text-green-400"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotesHome;
