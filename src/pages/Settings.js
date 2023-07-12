import { signOut, updatePassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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

  // photo change

  const [changeUrl, setChangeURl] = useState(null);
  const [loadingChange, setLoadingChange] = useState(false);
  const generateRandomName = () => {
    const randomName = uuidv4();
    return randomName;
  };

  const imageRef = ref(storage, `users/${generateRandomName()}`);

  const fetchImageUrl = async () => {
    try {
      const downloadURL = await getDownloadURL(imageRef);
      setChangeURl(downloadURL);
      const docRef = doc(db, "users", props.userData.id);
      updateDoc(docRef, { img: downloadURL });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingChange(false);
    }
  };

  const handleSubmitPhoto = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    setLoadingChange(true);
    uploadBytes(imageRef, file)
      .then(() => fetchImageUrl())
      .catch((error) => {
        console.log(error);
        setLoadingChange(false);
      });
  };

  return (
    <div
      className={`responsive flex justify-center  items-center min-h-screen ${
        props.theme ? "bg-slate-900" : "bg-cyan-100"
      }`}
    >
      <div className="flex absolute top-0 items-center sm:right-0 p-5 text-white sm:text-2xl text-xl sm:gap-16 gap-8">
        <div className="flex flex-row items-center sm:gap-4 gap-2">
          <img
            src={props.userData?.img}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span
            className={` text-center ${
              props.theme ? "text-slate-400  " : "text-cyan-400 "
            }`}
          >
            {props.userData?.username}
          </span>
        </div>
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
        <form
          className="flex flex-row gap-4  items-center"
          onSubmit={handleSubmitUserName}
        >
          <input
            type="text"
            placeholder="New Username"
            value={newUserName}
            onChange={(e) => setUserName(e.target.value)}
            className={`border-2 rounded-2xl w-2/3 border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none  ${
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
        <form
          className="flex flex-row gap-4  items-center"
          onSubmit={handleSubmitPassword}
        >
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`border-2 rounded-2xl w-2/3 border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none  ${
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
        <form className="flex flex-row gap-4  items-center">
          <input
            type="file"
            onChange={handleSubmitPhoto}
            className={`text-sm font-bold   w-2/3
            file:mr-4 file:py-2 file:px-4
            file:rounded-2xl file:border-0
            file:text-sm file:font-semibold
            bg-transparent 
            file:text-gray-400
            hover:file:bg-violet-100${
              props.theme
                ? " text-gray-400  file:bg-slate-700 file:hover:bg-white"
                : "  file:bg-white  text-gray-400 file:hover:bg-white file:hover:text-cyan-400"
            }`}
          />
          {loadingChange ? (
            <div
              className={` text-right text-xl ${
                props.theme ? "text-slate-400  " : "text-cyan-400 "
              }`}
            >
              Loading...
            </div>
          ) : (
            changeUrl && (
              <div
                className={` text-right text-xl ${
                  props.theme ? "text-slate-400 " : "text-cyan-400 "
                }`}
              >
                successful
              </div>
            )
          )}
        </form>
      </div>
    </div>
  );
}

export default Settings;
