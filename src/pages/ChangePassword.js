import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const history = useNavigate();

  const changePassword = () => {
    axios
      .put(
        "https://twitter-clone-api-vini-b52fcd914831.herokuapp.com/auth/change-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          newPasswordCheck: newPasswordCheck,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          alert(response.data);
          localStorage.removeItem("accessToken");
          setAuthState({ ...authState, status: false });
          history("/login");
        }
      });
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>

      <div className="form-change-password-container">
        <input
          type="text"
          placeholder="old password"
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="new password"
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="confirm new password"
          onChange={(event) => {
            setNewPasswordCheck(event.target.value);
          }}
        />
      </div>
      <div className="login-btn-container">
        <button
          type="submit"
          className="btn"
          onClick={() => {
            changePassword();
          }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
