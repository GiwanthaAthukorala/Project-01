import React from "react";

export default function Title({ title, fontSize, margin }) {
  return (
    <div>
      <h1 style={{ fontSize, margin, color: "#616161" }}>{title}</h1>
    </div>
  );
}
