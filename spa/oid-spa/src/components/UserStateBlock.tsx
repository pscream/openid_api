import { UserState } from "../types/UserState";
import "./UserStateBlock.css"

const UserStateBlock = (props: { globalUserState: UserState }) => {
  const { globalUserState } = props;

  return (
    <div className="user-state-block">
      LoggedIn: {globalUserState.isLoggedIn.toString()} as '
      {globalUserState.username}', token={globalUserState.apiToken}
    </div>
  );
};

export default UserStateBlock;
