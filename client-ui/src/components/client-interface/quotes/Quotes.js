import React, { useEffect, useState } from "react";
import yteOne from "../../../images/yte_one.jpg";
import axios from "axios";

const Quotes = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3764/api/v1/quotes/last_quote")
      .then((res) => setQuote(res.data.quote.quote_body))
      .catch((err) => console.log("An err occured", err));
  }, []);

  return (
    <>
      <div className="bg-blue-700 p-3 w-52 rounded-md relative text-white">
        <img
          src={yteOne}
          alt="yte_smile"
          className="absolute top-1 right-1 rounded-full h-8 w-8"
        />
        <p className="font-bold text-xs">Quote by Yte Angel</p>
        <p className="italic text-xs mt-2">"{quote}"</p>
      </div>
    </>
  );
};

export default Quotes;
