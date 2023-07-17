import React, { useState } from "react";
import axios from "axios";
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const ChangePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };
  return (
    <div>
      <h1>Change your password</h1>
      <input
        type="text"
        placeholder="old password..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="New password..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={ChangePassword}>save changes</button>
    </div>
  );
}

export default ChangePassword;
