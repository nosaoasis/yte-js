import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "../postpages";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

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

    axios
      .post(`http://localhost:3764/api/v1/admin/login`, input)
      .then((res) => {
        const { msg, token } = res.data;
        if (msg === "Error") {
          localStorage.removeItem("token");
          window.location.reload();
        }
        localStorage.removeItem("tToken");
        localStorage.setItem("token", token);
        navigate("/admin/dashboard");
        return;
      })
      .catch((err) => {
        const resObj = Object.values(err.response);
        const { msg, response } = resObj[0];
        if (response === "Server Error") {
          setServerError("Sorry, an error occurred, please try again.");
        }
        if (response === "Unauthorized") {
          setServerError("You are unauthorized.");
        }
        setTimeout(() => {
          setServerError("");
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
          <p className="text-center absolute top-40 font-bold text-xl text-red-600">
            {serverError}
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
              <Link
                className="cursor-pointer text-blue-200"
                to="/admin/register"
              >
                admin access
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
