import React, { useState } from "react";

import { register } from "../firebase";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    console.log(user);
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
          Kayıt ol
        </button>
        <Link to="/login" className="text-center">Giriş Yap</Link>
      </form>
    </div>
  );
}
export default Login;
