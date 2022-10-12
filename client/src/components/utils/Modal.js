import React from "react";
import "./modal.css";
const Modal = ({ children, setIsModalOpen }) => {
  return (
    <div onBlur={() => setIsModalOpen(false)} className="modal">
      {children}
    </div>
  );
};

export default Modal;
