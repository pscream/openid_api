import { PropsWithChildren } from "react";
import { UserState } from "../../types/UserState";
import UserStateBlock from "../../components/UserStateBlock";
import "./Layout.css"

type PropsType =
{
    globalUserState : UserState;
}

const Layout = (props: PropsWithChildren<PropsType>) => {
  return (
    <>
      <div className="user-state-in-layout">
        <UserStateBlock globalUserState={props.globalUserState} />
      </div>
      {props.children}
    </>
  );
};

export default Layout;
