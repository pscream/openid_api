import { useState } from "react";
import RouteList from "./routes/RouteList";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserState } from "./types/UserState";

function App() {
  const emptyUserState: UserState = {
    isLoggedIn: false,
    username: "",
    apiToken: "",
  };

  const [globalUserState, setGlobalUserState] = useState(emptyUserState);

  return (
    <>
      <BrowserRouter>
        <RouteList
          globalUserState={globalUserState}
          setGlobalUserState={setGlobalUserState}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
