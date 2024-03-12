import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak("/keycloak.json");

const Init = (callback: () => void) => {
  // keycloakInstance.init({ onLoad: "login-required" }).catch((e) => {
  //   console.dir(e);
  //   console.log(`keycloak init exception: ${e}`);
  // });

  keycloakInstance
    .init({})
    .then((authenticated) => {
      console.log(
        `User is ${authenticated ? "authenticated" : "not authenticated"}`
      );
      console.log("callback:", callback);
      callback();
    })
    .catch((error) => {
      console.error("Failed to initialize adapter:", error);
    });
  console.log("keycloakInstance:", keycloakInstance);
  return keycloakInstance;
};

const Login = (username: string) => {
  keycloakInstance
    .login({
      loginHint: username,
      redirectUri: `${location.origin}/redirectKeycloak`,
    })
    .catch((e) => {
      console.dir(e);
      console.log(`keycloak login exception: ${e}`);
    });
};

// const Login = (onAuthenticatedCallback: () => void) => {
//   keycloakInstance
//     .init({ onLoad: "login-required" })
//     .then((authenticated) => {
//       console.log(`.then((authenticated):${authenticated}`);
//       authenticated ? onAuthenticatedCallback() : alert("non authenticated");
//     })
//     .catch((e) => {
//       console.dir(e);
//       console.log(`keycloak init exception: ${e}`);
//     });
//};

const KeycloakService = {
  TryInit: Init,
  TryLogin: Login,
  Instance: keycloakInstance,
};

export default KeycloakService;
