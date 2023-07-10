import React, { useEffect, useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";

function App() {
  const [theme, setTheme] = useState(true);
  const [users, setUsers] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setUsers(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path=""
          element={<Home theme={theme} setTheme={setTheme} users={users} loggedIn={loggedIn} />}
        />
        <Route
          path="/register"
          element={<Register theme={theme} setTheme={setTheme} />}
        />
        <Route
          path="/login"
          element={<Login theme={theme} setTheme={setTheme} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
