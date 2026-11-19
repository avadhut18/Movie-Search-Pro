import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ label = "Loading" }) => {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__reel" aria-hidden="true" />
      <span className="spinner__label">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
