import { Route, Routes } from "react-router-dom";
import HomePage from "../modules/HomePage";
import LoginApiPage from "../modules/security/LoginApiPage";
import LoginKeycloakPage from "../modules/security/LoginKeycloakPage";
import RedirectKeycloakPage from "../modules/security/RedirectKeycloakPage";
import { UserState } from "../types/UserState";
import { UserStateProps } from "../types/UserStateProps";
import GetApiPage from "../modules/GetApiPage";

export const RouteList = (
  props: UserStateProps & {
    globalUserState: UserState;
    setGlobalUserState: React.Dispatch<React.SetStateAction<UserState>>;
  }
) => {
  const { globalUserState, setGlobalUserState } = props;
  console.log('RouteList: ', globalUserState);
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage globalUserState={globalUserState} />}
      />
      <Route
        path="/loginApi"
        element={<LoginApiPage setGlobalUserState={setGlobalUserState} />}
      />
      <Route
        path="/loginKeycloak"
        element={<LoginKeycloakPage setGlobalUserState={setGlobalUserState} />}
      />
      <Route
        path="/redirectKeycloak"
        element={<RedirectKeycloakPage globalUserState={globalUserState} setGlobalUserState={setGlobalUserState} />}
      />
      <Route
        path="/getApi"
        element={<GetApiPage globalUserState={globalUserState} />}
      />
    </Routes>
  );
};

export default RouteList;
