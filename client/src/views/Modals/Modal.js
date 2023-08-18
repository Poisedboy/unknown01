import React from "react";
import "../../css/modal.css";

export const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return <div className="modal-overlay">{children}</div>;
};
