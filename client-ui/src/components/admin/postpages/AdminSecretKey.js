import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Loading } from "./index";

const AdminSecretKey = () => {
  const adminLocation = useLocation();

  const [secretInput, setSecretInput] = useState("");
  const [boolSecretKey, setBoolSecretKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminMessage, setAdminMessage] = useState(
    adminLocation.state !== null ? adminLocation.state.message : ""
  );

  const navigate = useNavigate();

  const handleSecretKeyInput = (e) => {
    const value = e.target.value;
    setSecretInput(value);
    if (value.length === 28) {
      axios
        .post(`http://localhost:3764/api/v1/admin/secret`, { secretKey: value })
        .then((res) => {
          setLoading(true);
          const { msg, response, token } = res.data;
          if (msg === "Successful Request" && response) {
            localStorage.setItem("tToken", token);
            setBoolSecretKey(true);
            setSecretInput("");
            setLoading(false);
            navigate("/admin/register");
          } else {
            localStorage.removeItem("tToken");
            setBoolSecretKey(false);
            setSecretInput("");
            setLoading(false);
          }
          return;
        })
        .catch((err) => window.location.reload());
    }
    if (value.length >= 29) {
      setBoolSecretKey(false);
      setSecretInput("");
    }
  };

  useEffect(() => {
    const tToken = localStorage.getItem("tToken");
    if (tToken) {
      localStorage.removeItem("token");
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
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading className="absolute top-0 w-full h-full" message="loading" />
      ) : (
        <div className="flex bg-black h-screen w-screen items-center justify-center">
          <p className="text-gray-200 absolute top-28 text-2xl font-bold">
            {adminMessage}
          </p>
          <input
            type="password"
            name="input"
            value={secretInput}
            className="rounded border-2 border-black w-4/12 h-10 px-2 outline-none"
            onChange={handleSecretKeyInput}
            placeholder="Enter secret key"
          />
        </div>
      )}
    </>
  );
};

export default AdminSecretKey;
