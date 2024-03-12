import React, { useState } from "react";
import { UserState } from "../../types/UserState";
import KeycloakService from "./KeycloakService";

const LoginKeycloakPage = (props: {
  setGlobalUserState: React.Dispatch<React.SetStateAction<UserState>>;
}) => {
  const [username, setUsername] = useState("");

  const [disabledLogin, setDisabledLogin] = useState(true);

  // const navigate = useNavigate();

  const { setGlobalUserState } = props;

  const OnAuthenticated = () => {
    console.log(setDisabledLogin(false));
    setDisabledLogin(false);
  };

  const onInitButtonClick = () => {
    const instance = KeycloakService.TryInit(OnAuthenticated);
    setGlobalUserState({
      isLoggedIn: instance.authenticated ?? false,
      username: username,
      apiToken: ""
    });
  };

  const onLoginButtonClick = () => {
    KeycloakService.TryLogin(username);
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onInitButtonClick}
          value={"Init"}
        />
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
          className={"inputButton"}
          type="button"
          onClick={onLoginButtonClick}
          value={"Login"}
          disabled={disabledLogin}
        />
      </div>
    </div>
  );
};

export default LoginKeycloakPage;
