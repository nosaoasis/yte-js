import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const adminLoginLocation = useLocation();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [adminRegister, setAdminRegistered] = useState(
    adminLoginLocation.state !== null ? adminLoginLocation.state.message : ""
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!input.email || !input.password) {
      alert("Please fill the form correctly.");
      setInput({
        email: "",
        password: "",
      });
      return;
    }
    // const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:3764/api/v1/admin/login`, input)
      .then((res) => {
        const { msg, response, token } = res.data;
        console.log("the logged in admin has the following details =====", response)
        if (msg === "Error") {
          localStorage.removeItem("token")
          window.location.reload();
        }
        localStorage.setItem("token", token)
        navigate("/admin/dashboard");
        return;
      })
      .catch((err) => console.error("An error occured", err));
  };

  return (
    <>
      <div className="bg-black flex items-center justify-center h-screen">
        <p className="text-gray-200 absolute top-28 text-2xl font-bold">
          {adminRegister}
        </p>

        <div className="w-4/12">
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
          <button
            type="button"
            className="text-white w-full bg-gray-900 focus:outline-none focus:ring-1 focus:ring-white font-medium font-bold py-2 mt-2"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className="text-white text-center mt-3">
            I require{" "}
            <Link className="cursor-pointer text-blue-200" to="/admin/register">
              admin access
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
