import React, { useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";

function App() {

  const [theme, setTheme] = useState(true);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="" element={<Home theme={theme} setTheme={setTheme}  />} />
        <Route path="/register" element={<Register theme={theme} setTheme={setTheme} />} />
      </Routes>
    </>
  );
}

export default App;
