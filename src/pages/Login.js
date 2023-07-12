import React, { useState } from "react";

import { login } from "../firebase";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      window.location = "/";
    }
  };

  return (
    <div
      className={`responsive flex justify-center  items-center min-h-screen ${
        props.theme ? "bg-slate-900" : "bg-cyan-100"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full  ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <input
          type="password"
          placeholder="parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <button
          disabled={!email || !password}
          type="submit"
          className={` text-right ${
            props.theme ? "text-slate-400" : "text-cyan-400"
          }`}
        >
          Giriş Yap
        </button>
        <Link to="/register"  className={` text-center ${
            props.theme ? "text-slate-400" : "text-cyan-400"
          }`}>
          Yeni Hesap Aç
        </Link>
      </form>
    </div>
  );
}
export default Login;
