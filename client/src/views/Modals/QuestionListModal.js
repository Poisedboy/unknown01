import React, { useEffect, useState } from "react";
import "../../css/modal.css";
import { verifyToken } from "../../api/verifyToken";
import { useDispatch } from "react-redux";
import { deleteUserInfo } from "redux/userSlice";

export const QuestionListModal = ({ isMobile, modalVisible, children }) => {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    async function validateToken() {
      const session = await verifyToken(token);
      if (!session) {
        dispatch(deleteUserInfo());
      }
    }
    validateToken();
  }, []);

  return (
    <div>
      {modalVisible && (
        <div
          className={`fixed inset-0 z-50 ${
            isMobile ? "top-[156px]" : "flex items-center justify-center"
          }`}
        >
          <div
            className={`shadow-lg ${
              isMobile
                ? "rounded-t-2xl h-[100%] border-2 border-[#5C2D8B] bg-white overflow-hidden transform transition-all mx-5 "
                : "w-[360px] h-[410px] bg-white rounded-[15px] border-2 border-[#5C2D8B]"
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
