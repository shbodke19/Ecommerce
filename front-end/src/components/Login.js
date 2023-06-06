import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("userData");
    if (auth) {
      navigate("/");
    }
  }, []);
  const collectData = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:3600/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);

    if (result.auth) {
      localStorage.setItem("userData", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("please enter your name");
    }
  };
  return (
    <>
      <div className="login">
        <h1>Login Here</h1>

        <input
          className="input-box"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-box"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={collectData} className="signbtn" type="button">
          Login
        </button>
        {/* <Link to="/signup">
          <button onClick={collectData} className="signbtn" type="button">
            Sign Up
          </button>
        </Link> */}
      </div>
    </>
  );
};

export default Login;
