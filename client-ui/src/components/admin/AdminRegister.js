import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminRegister = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !input.firstname ||
      !input.lastname ||
      !input.email ||
      !input.password ||
      !input.confirmPassword
    ) {
      alert("Please fill the form below");
      setInput({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      return;
    }
    if (input.password !== input.confirmPassword) {
      console.log("password mismatch.....");
      setInput({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      return;
    }
    const tToken = localStorage.getItem("tToken");
    const payload = {
      firstname: input.firstname,
      lastname: input.lastname,
      email: input.email,
      password: input.password,
    };
    axios
      .post(`http://localhost:3764/api/v1/admin/register`, payload, {
        headers: {
          Authorization: `Bearer ${tToken}`,
        },
      })
      .then((res) => {
        const { msg, token } = res.data;
        if (msg === "Error") {
          localStorage.removeItem("tToken");
          navigate("/admin", { state: { message: "You're not authorized." } });
        }
        if (msg === "Success") {
          localStorage.removeItem("tToken");
          localStorage.setItem("token", token);

          navigate("/admin/login", {
            state: {
              message:
                "Your admin account has been successfully created. You may now login.",
            },
          });
        }
      })
      .catch((err) => console.error("An error occurred ", err));
  };

  return (
    <>
      <div className="bg-black flex items-center justify-center h-screen">
        <div className="w-4/12">
          <div className="w-full">
            <input
              type="text"
              name="firstname"
              value={input.firstname}
              className="rounded border-2 border-black w-full h-10 px-2 outline-none"
              onChange={handleChange}
              placeholder="Firstname"
            />
          </div>
          <div className="mt-3 w-full">
            <input
              type="text"
              name="lastname"
              value={input.lastname}
              className="rounded border-2 border-black w-full h-10 px-2 outline-none"
              onChange={handleChange}
              placeholder="Lastname"
            />
          </div>
          <div className="mt-3">
            <input
              type="email"
              name="email"
              value={input.email}
              className="rounded border-2 border-black w-full h-10 px-2 outline-none"
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="mt-3">
            <input
              type="password"
              name="password"
              value={input.password}
              className="rounded border-2 border-black w-full h-10 px-2 outline-none"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="mt-3">
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              className="rounded border-2 border-black w-full h-10 px-2 outline-none"
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="button"
            className="text-white w-full bg-gray-900 focus:outline-none focus:ring-1 focus:ring-white font-medium font-bold py-2 mt-2"
            onClick={handleSubmit}
          >
            Register
          </button>
          <p className="text-white text-center mt-3">
            I have{" "}
            <Link className="cursor-pointer text-blue-200" to="/admin/login">
              admin access
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
