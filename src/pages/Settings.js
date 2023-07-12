import { signOut, updatePassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

function Settings(props) {
  const [newPassword, setNewPassword] = useState("");
  const [newUserName, setUserName] = useState("");
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
  const handleSubmitPassword = async (e) => {
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
      toast("Password Updated Successfully", {
        icon: "👋",
        style: {
          background: props.theme ? "#2e4155" : "#fff",
          color: props.theme ? "#fff" : "#00ebfb",
        },
      });
    } else {
      console.log("User not signed in");
    }
  };
  const handleSubmitUserName = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", props.userData.id);
    updateDoc(docRef, { username: newUserName });
    toast("username successfully updated", {
      icon: "👋",
      style: {
        background: props.theme ? "#2e4155" : "#fff",
        color: props.theme ? "#fff" : "#00ebfb",
      },
    });
  };

  return (
    <div
      className={`responsive flex justify-center  items-center min-h-screen ${
        props.theme ? "bg-slate-900" : "bg-cyan-100"
      }`}
    >
      <div className="flex absolute top-0 sm:right-0 p-5 text-white sm:text-2xl text-xl sm:gap-16 gap-8">
        <span
          className={` ${props.theme ? "text-slate-400" : "text-cyan-400"}`}
        >
          {props.userData?.username}
        </span>
        <Link
          to="/"
          className={` text-center ${
            props.theme
              ? "text-slate-400 hover:text-slate-200 "
              : "text-cyan-400 hover:text-cyan-600"
          }`}
        >
          Todo
        </Link>
        <button
          onClick={logOut}
          className={` ${
            props.theme
              ? "text-slate-400 hover:text-slate-200 "
              : "text-cyan-400 hover:text-cyan-600"
          }`}
        >
          Log out
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <form className="flex flex-row gap-4" onSubmit={handleSubmitUserName}>
          <input
            type="text"
            placeholder="New Username"
            value={newUserName}
            onChange={(e) => setUserName(e.target.value)}
            className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full  ${
              props.theme ? "bg-slate-700 text-white" : ""
            }`}
          />
          <button
            type="submit"
            className={` text-right text-xl ${
              props.theme
                ? "text-slate-400 hover:text-slate-200 "
                : "text-cyan-400 hover:text-cyan-600"
            }`}
          >
            Update
          </button>
        </form>
        <form className="flex flex-row gap-4" onSubmit={handleSubmitPassword}>
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
              props.theme
                ? "text-slate-400 hover:text-slate-200 "
                : "text-cyan-400 hover:text-cyan-600"
            }`}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
