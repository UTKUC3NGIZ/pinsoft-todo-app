import React, {  useState } from "react";
import { userData, register, storage } from "../firebase";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRandomName = () => {
    const randomName = uuidv4(); // Generate a random name using uuidv4
    return randomName;
  };

  const imageRef = ref(storage, `users/${generateRandomName()}`);

  const fetchImageUrl = async () => {
    try {
      const downloadURL = await getDownloadURL(imageRef);
      setUrl(downloadURL);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (email) {
  //     fetchImageUrl();
  //   }
  // }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(email, password);
      await userData({
        uid: user.uid,
        todo: [],
        theme: true,
        username: username,
        img: url,
      });
      window.location = "/";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    setLoading(true);
    uploadBytes(imageRef, file)
      .then(() => fetchImageUrl())
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full  ${
            props.theme ? "bg-slate-700 text-white" : ""
          }`}
        />
        <input type="file" onChange={handleFileChange} />
        {loading ? <div>Loading...</div> : url && "successful"}
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
        <Link
          to="/login"
          className={` text-center ${
            props.theme ? "text-slate-400" : "text-cyan-400"
          }`}
        >
          Giriş Yap
        </Link>
      </form>
    </div>
  );
}

export default Register;
