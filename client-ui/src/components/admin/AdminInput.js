import React, { useState } from "react";
import axios from "axios";

const AdminInput = () => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    const inputLength = value.length
    console.log("inputLength value is ", inputLength)
    setInput(value);
    if (Number(inputLength) === 8) {
      console.log("äbc");
      // axios.post("/api/v1/admin", { input })
      // .then((resp) => {
        //   console.log(resp)
        // });
      }
  };

  return (
    <>
      <div className="bg-gray-400 flex items-center justify-center h-screen pt-4 pl-2">
        <input
          type="password"
          name="input"
          value={input}
          className="rounded border-2 border-black w-2/6 h-10 px-2"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default AdminInput;
