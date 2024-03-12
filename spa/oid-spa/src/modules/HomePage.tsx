import { Link } from "react-router-dom";
import { UserState } from "../types/UserState";
import Layout from "./Layout/Layout";

export const HomePage = (props: { globalUserState: UserState }) => {
  const { globalUserState } = props;
  return (
    <>
      <Layout globalUserState={globalUserState}>
        <p>
          <Link to="/loginApi" className="flex">
            Login Api
          </Link>
        </p>
        <p>
          <Link to="/loginKeycloak" className="flex">
            Login Keycloak
          </Link>
        </p>
        <p>
          <Link to="/getApi" className="flex">
            GetApi
          </Link>
        </p>
      </Layout>
    </>
  );
};

export default HomePage;
