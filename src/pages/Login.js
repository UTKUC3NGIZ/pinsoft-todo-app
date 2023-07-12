import React, { useState } from "react";

import { login } from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);

    if (user) {
      window.location = "/";
      toast("Signed in", {
        icon: "👍",
        style: {
          background: props.theme ? "#2e4155" : "#fff",
          color: props.theme ? "#fff" : "#00ebfb",
        },
      });
    }
  };

  return (
    <div
      className={`responsive flex justify-center flex-col  items-center min-h-screen ${
        props.theme ? "bg-slate-900" : "bg-cyan-100"
      }`}
    >
            <h1
        className={` text-3xl mb-10 font-bold  ${
          props.theme ? " text-white" : "text-cyan-700"
        }`}
      >
        Sign In
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
          type="password"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <button
          disabled={!email || !password}
          type="submit"
          className={` text-right text-xl ${
            props.theme
              ? "text-slate-400 hover:text-slate-200 "
              : "text-cyan-400 hover:text-cyan-600"
          }`}
        >
          Login
        </button>
        <Link
          to="/register"
          className={` text-center mt-8 text-base  ${
            props.theme
              ? "text-slate-400 hover:text-slate-200 "
              : "text-cyan-400 hover:text-cyan-600"
          }`}
        >
          New Account
        </Link>
      </form>
    </div>
  );
}
export default Login;
