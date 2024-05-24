// src/components/Snackbar.js
import React from "react";
import "../styles/Snackbar.css";

const Snackbar = ({ message, type }) => {
  let icon;
  switch (type) {
    case "success":
      icon = "checkmark-circle-outline";
      break;
    case "error":
      icon = "close-circle-outline";
      break;
    case "warning":
      icon = "alert-circle-outline";
      break;
    case "info":
      icon = "information-circle-outline";
      break;
    default:
      icon = null;
  }

  return (
    <div className={`snackbar ${type}`}>
      {icon && <ion-icon name={icon} className="snackbar-icon"></ion-icon>}
      <span>{message}</span>
    </div>
  );
};

export default Snackbar;
