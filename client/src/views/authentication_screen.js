import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import "../css/auth.css";
import GoogleLogo from "../components/icons/googleLogo.png";
import useAPI from "api/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "redux/userSlice";
import { useNavigate } from "react-router-dom";
import { getExpiresIn } from "redux/userSlice";

export function AuthenticationScreen() {
  const [googleData, setGoogleData] = useState(null);
  const [token, setToken] = useState(null);
  const [expires, setExpires] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localToken = useSelector((state) => state.userInfo.googleToken);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setGoogleData(tokenResponse),
  });

  useEffect(() => {
    if (googleData) {
      setToken(googleData.access_token);
      setExpires(googleData.expires_in);
    }
  }, [googleData]);
  console.log(googleData);
  useEffect(() => {
    async function getUserInfo() {
      const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const getData = await res.json();
      setUser(getData);
    }
    getUserInfo();
    dispatch(getToken(token));
    dispatch(getExpiresIn(expires));
  }, [token]);

  useEffect(() => {
    const uploadData = async () => {
      if (user && token) {
        const data = await useAPI.registerUser(user, token);
        const registeredUser = data.data.user[0];
        dispatch(getUser(registeredUser));
        if (registeredUser && localToken) {
          navigate("/note-editor");
        }
      }
    };
    uploadData();
  }, [user]);

  const handleClick = async () => {
    try {
      login();
    } catch (e) {
      console.log("Custom LOG ERROR: ", e.message);
    }
  };

  return (
    <div className="wrapper">
      <div onClick={handleClick} className="authBox">
        <img src={GoogleLogo} className="authLogo" alt="google logo" />
        <p className="authText">Sign in with Google</p>
      </div>
    </div>
  );
}
