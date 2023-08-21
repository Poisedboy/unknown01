import React, { useEffect, useState } from "react";
import "../../css/modal.css";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../api/verifyToken";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserInfo } from "redux/userSlice";

export const RouteModal = ({ isOpen, children }) => {
  const [session, setSession] = useState(false);
  const token = useSelector((state) => state.userInfo.googleTokens);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function validateToken() {
      const session = await verifyToken(token);
      setSession(session);
      if (!session) {
        dispatch(deleteUserInfo());
      }
    }
    validateToken();
  }, []);

  const handleClick = () => {
    if (session) {
      navigate("/note-editor");
    } else if (!session) {
      navigate("/");
    }
  };

  if (!isOpen) return null;

  return (
    <div onClick={() => handleClick()} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
