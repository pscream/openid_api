import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import { UserState } from "../types/UserState";

const GetApiPage = (props: { globalUserState: UserState }) => {
  const { globalUserState } = props;

  //   fetch('https://reqbin.com/echo/get/json', {
  //     headers: {Authorization: 'Bearer {token}'}
  //   })
  //      .then(resp => resp.json())

  const [apiResponse, setApiResponse] = useState("");

  const onButtonClick = () => {
    if (!globalUserState.isLoggedIn) {
      setApiResponse("Not logged in!");
      return ;
    }

    fetch("https://localhost:5002/api/weatherforecast", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${globalUserState.apiToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return "Error !";
        } else {
          return response.json();
        }
      })
      .then((json) => {
        setApiResponse(JSON.stringify(json));
      });
  };

  return (
    <>
      <Layout globalUserState={globalUserState}>
        GetApiPage
        <div>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Get Api"}
          />
        </div>
        <div>{apiResponse}</div>
        <p>
          <Link to="/" className="flex">
            Home
          </Link>
        </p>
      </Layout>
    </>
  );
};

export default GetApiPage;
