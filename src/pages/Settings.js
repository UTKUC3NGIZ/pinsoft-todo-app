import {
  getAuth,
  signOut,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Settings(props) {
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    await signOut(auth);
    window.location = "/login";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Password updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating password:", error);
        });
    } else {
      console.log("User not signed in");
    }
  };

  return (
    <div
      className={`responsive flex justify-center  items-center min-h-screen ${
        props.theme ? "bg-slate-900" : "bg-cyan-100"
      }`}
    >
      <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full  ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <button
          type="submit"
          className={` text-right text-xl ${
            props.theme ? "text-slate-400" : "text-cyan-400"
          }`}
        >
          Change
        </button>
      </form>
      <div className="flex absolute top-0 right-0 p-5 text-white text-xl gap-5">
        <span
          className={` ${props.theme ? "text-slate-400" : "text-cyan-400"}`}
        >
          {props.userData?.username}
        </span>
        <Link
          to="/"
          className={` text-center ${
            props.theme ? "text-slate-400" : "text-cyan-400"
          }`}
        >
          ToDo App
        </Link>
        <button
          onClick={logOut}
          className={` ${props.theme ? "text-slate-400" : "text-cyan-400"}`}
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

export default Settings;
