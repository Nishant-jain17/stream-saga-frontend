import React from "react";
import "./Button.css";

export default function Button({ type = "primary", children, onClick }) {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {children}
    </button>
  );
}
