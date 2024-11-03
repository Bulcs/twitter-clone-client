import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/");
    }
  }, []);

  const login = () => {
    const data = {
      username: username,
      password: password,
    };

    axios
      .post(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com/auth/login`,
        data
      )
      .then((response) => {
        console.log(response.data.error);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          history("/");
        }
      });
  };

  return (
    <div className="login-content">
      <div className="formContainerLog">
        <input
          className="input-form-default"
          type="text"
          name="username"
          placeholder="username"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          className="input-form-default"
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <span className="login-btn-container">
          <button className="btn" type="submit" onClick={login}>
            Login
          </button>
          <button className="btn">
            <a className="go-to-register" href="/registration">
              Register
            </a>
          </button>
        </span>
      </div>
    </div>
  );
}

export default Login;
