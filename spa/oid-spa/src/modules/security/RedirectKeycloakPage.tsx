import { useNavigate } from "react-router-dom";
import { UserState } from "../../types/UserState";
import KeycloakService from "./KeycloakService";

const RedirectKeycloakPage = (props: {
  setGlobalUserState: React.Dispatch<React.SetStateAction<UserState>>;
}) => {

  const navigate = useNavigate();

  const { setGlobalUserState } = props;

  const OnAuthenticated = () => {
    console.log("instance: ", JSON.parse(JSON.stringify(instance)));
    setGlobalUserState({isLoggedIn: instance.authenticated??false, username: instance.idTokenParsed?.preferred_username ?? "", apiToken: instance.idToken ?? "" })
    navigate("/");
  };

  const instance = KeycloakService.TryInit(OnAuthenticated);

  return (
    <>
    </>
  );
};

export default RedirectKeycloakPage;
