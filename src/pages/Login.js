import React, { useState } from "react";


//login
// function Login(){
//   return(
//     <div className="main">
//       <p className="sign" align="center">
//         Sign in
//       </p>
//       <form  className="form1">
//         <input className="username" type="text" placeholder="Username"/>
//         <input className="password" type="password" placeholder="Password"/>
//         <a className="submit" align="center">
//           Sign in
//         </a>
//         <p className="forgot" align="center">
//           <a href="#">Forgot Password</a>
//         </p>
//       </form>
//     </div>
//   )
// }

 
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
      e.preventDefault();
      // Login işlemi yapılacak
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
    );
  }
   export default Login;