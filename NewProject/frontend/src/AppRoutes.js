import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/Home/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
