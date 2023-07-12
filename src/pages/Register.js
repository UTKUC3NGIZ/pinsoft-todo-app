import React, { useState } from "react";
import { userData, register, storage } from "../firebase";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [url, setUrl] = useState(null);

  const generateRandomName = () => {
    const randomName = uuidv4();
    return randomName;
  };

  const imageRef = ref(storage, `users/${generateRandomName()}`);

  const fetchImageUrl = async () => {
    try {
      const downloadURL = await getDownloadURL(imageRef);
      setUrl(downloadURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        confirmPassword === password &&
        email.length > 0 &&
        username.length >= 8 &&
        password.length >= 6
      ) {
        const user = await register(email, password);
        await userData({
          uid: user.uid,
          todo: [],
          theme: true,
          username: username,
          img: url,
        });
        toast("mean someone new", {
          icon: "🤠",
          style: {
            background: props.theme ? "#2e4155" : "#fff",
            color: props.theme ? "#fff" : "#00ebfb",
          },
        });
        window.location = "/";
      } else {
        toast("You filled in the required fields incompletely or incorrectly", {
          icon: "😔",
          style: {
            background: props.theme ? "#2e4155" : "#fff",
            color: props.theme ? "#fff" : "#00ebfb",
          },
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    uploadBytes(imageRef, file)
      .then(() => fetchImageUrl())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`responsive flex justify-center flex-col p-5 items-center min-h-screen ${
        props.theme ? "bg-slate-900" : "bg-cyan-100"
      }`}
    >
      <h1
        className={` text-3xl mb-10 font-bold  ${
          props.theme ? " text-white" : "text-cyan-700"
        }`}
      >
        Create Your Account
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full  ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full  ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <input
          type="file"
          onChange={handleFileChange}
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full ${
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
          Register
        </button>
        <Link
          to="/login"
          className={` text-center text-base mt-8 ${
            props.theme
              ? "text-slate-400 hover:text-slate-200 "
              : "text-cyan-400 hover:text-cyan-600"
          }`}
        >
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
