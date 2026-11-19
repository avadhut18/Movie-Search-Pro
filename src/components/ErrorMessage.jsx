import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message" role="alert">
      <p className="error-message__title">Something went wrong</p>
      <p className="error-message__body">{message}</p>
    </div>
  );
};

export default ErrorMessage;
