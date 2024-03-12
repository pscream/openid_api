import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../types/UserState";

const LoginApiPage = (props: {
  setGlobalUserState: React.Dispatch<React.SetStateAction<UserState>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setGlobalUserState } = props;

  const onButtonClick = () => {
    fetch("https://localhost:5002/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          window.alert("Wrong email or password");
        } else {
          return response.json();
        }
      })
      .then((json) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, token: json.token })
        );
        setGlobalUserState({
          isLoggedIn: true,
          username: username,
          apiToken: json.token
        });
        navigate("/");
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your email here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Login"}
        />
      </div>
    </div>
  );
};

export default LoginApiPage;
