import React, { createContext, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Home />
      <Login />
      <Toaster />
    </>
  );
}

export default App;
