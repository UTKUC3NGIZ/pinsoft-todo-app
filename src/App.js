import React, { useEffect, useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router";
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { auth, db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

function App() {
  const [theme, setTheme] = useState(true);
  const [users, setUsers] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid);
      } else {
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getUserData = (userId) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserData({ id: doc.id, ...doc.data() });
          setTheme(doc.data().theme);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
          element={
            <Home
              theme={theme}
              setTheme={setTheme}
              users={users}
              loggedIn={loggedIn}
              userData={userData}
            />
          }
        />
        <Route
          path="/register"
          element={<Register theme={theme} users={users} />}
        />
        <Route path="/login" element={<Login theme={theme} />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/settings"
          element={<Settings theme={theme} userData={userData} />}
        />
      </Routes>
    </>
  );
}

export default App;
