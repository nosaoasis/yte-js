import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "./index";

const AdminRegister = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState("");

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
      alert("All field inputs are required");
      setInput({
        firstname: input.firstname ? input.firstname : "",
        lastname: input.lastname ? input.lastname : "",
        email: input.email ? input.email : "",
        password: "",
        confirmPassword: "",
      });
      return;
    }
    if (input.password !== input.confirmPassword) {
      setInput({ ...input, password: "", confirmPassword: "" });
      setFormError("Enter mathching password");
      setTimeout(() => {
        setFormError("");
      }, 5000);
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
      .catch((error) => {
        const resObj = Object.values(error)[2].data.response;
        if (resObj.code && resObj.code === 11000) {
          // KeyValue Error
          setFormError("The email or password entered is not available.");
        }
        if (resObj.name && resObj.name === "ValidationError") {
          // Validation Error
          setFormError(
            "You have exceeded the maximum allowed characters of 12 for both Firstname and Lastname fields."
          );
        }
        setTimeout(() => {
          setFormError("");
        }, 5000);
      });
  };

  useEffect(() => {
    const tToken = localStorage.getItem("tToken");
    if (tToken) {
      localStorage.removeItem("token");
      axios
        .get(`http://localhost:3764/api/v1/admin/authenticate_route/${tToken}`)
        .then((res) => {
          const { tokenExpired } = res.data;
          if (tokenExpired === true) {
            localStorage.removeItem("tToken");
            navigate("/admin", { replace: true });
            return;
          }
        })
        .catch((err) => {
          const errObj = Object.values(err)[2];
          console.log("error object", errObj[2]);
          if (
            errObj.status === 500 &&
            errObj.statusText === "Internal Server Error"
          ) {
            localStorage.removeItem("tToken");
            navigate("/admin", { replace: true });
            return;
          }
          navigate("/admin", { replace: true });
          return;
        });
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("tToken");
      axios
        .get(`http://localhost:3764/api/v1/admin/authenticate_route/${token}`)
        .then((res) => {
          const { isLoggedIn } = res.data.response;
          if (isLoggedIn) {
            navigate("/admin/dashboard", { replace: true });
            return;
          }
        })
        .catch((err) => {
          navigate("/admin", { replace: true });
          return;
        });
    }
    setTimeout(() => {
      navigate("/admin", { replace: true });
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading className="absolute top-0 w-full h-full" message="loading" />
      ) : (
        <div className="bg-black flex items-center justify-center h-screen">
          <div className="w-4/12">
            <p className="text-center font-bold text-sm text-red-600 mb-4">
              {formError}
            </p>
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
      )}
    </>
  );
};

export default AdminRegister;
