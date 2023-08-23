import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import "../css/auth.css";
import GoogleLogo from "../components/icons/googleLogo.png";
import useAPI from "api/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "redux/userSlice";
import { useNavigate } from "react-router-dom";
import logo from "../components/icons/logo.png";
import emptyCap from "../components/icons/Group-empty-cap.svg";
import smallPen from "../components/icons/Group-small-pen.svg";
import rightShadow from "../components/icons/Group-shadow-right.svg";
import printMachine from "../components/icons/Group-print-machine.svg";
import leftShadow from "../components/icons/Group-left-shadow.svg";
import pen from "../components/icons/Group-pen.svg";
import cap from "../components/icons/Group-cap.svg";
import rightHand from "../components/icons/Group-right-hand.svg";
import leftHand from "../components/icons/Group-left-hand.svg";
import axios from "axios";

export function AuthenticationScreen() {
  console.log("rerender");
  const [googleData, setGoogleData] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOpen, setCloseModal] = useState(false);

  const dispatch = useDispatch();

  const localToken = localStorage.getItem("token");

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setGoogleData(tokenResponse),
  });

  useEffect(() => {
    if (googleData) {
      setToken(googleData.access_token);
    }
  }, [googleData]);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const userData = response.data;
        console.log("USERDATAINSIDE", userData);
        setUser(userData);
      } catch (error) {
        console.log("ERROR MESSAGE: ", error);
      }
    }
    getUserInfo();
    localStorage.setItem("token", token);
  }, [token, dispatch]);

  useEffect(() => {
    const uploadData = async () => {
      if (user && localToken) {
        const data = await useAPI.registerUser(user, token);
        const registeredUser = data.data.user;
        dispatch(getUser(registeredUser));
      }
    };
    uploadData();
  }, [user, localToken]);

  useEffect(() => {
    setCloseModal(true);
  }, []);

  const handleClick = async () => {
    try {
      login();
    } catch (e) {
      console.log("Custom LOG ERROR: ", e.message);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <img className="logo" src={logo} alt="logo" />
        <p className="text">Create your free account</p>
        <div className="pictures">
          <img src={emptyCap} className="emptyCap" alt="piece of collage" />
          <img src={smallPen} className="smallPen" alt="piece of collage" />
          <img
            src={rightShadow}
            className="rightShadow"
            alt="piece of collage"
          />
          <img src={leftShadow} className="leftShadow" alt="piece of collage" />
          <img
            src={printMachine}
            className="printMachine"
            alt="piece of collage"
          />
          <img src={pen} className="pen" alt="piece of collage" />
          <img src={cap} className="cap" alt="piece of collage" />
          <img src={leftHand} className="leftHand" alt="piece of collage" />
          <img src={rightHand} className="rightHand" alt="piece of collage" />
        </div>
      </div>
      <div onClick={handleClick} className="signInBtn">
        <img src={GoogleLogo} alt="google logo" />
        <p>Sign in with Google</p>
      </div>
    </div>
  );
}
