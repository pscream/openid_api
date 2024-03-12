import { UserState } from "./UserState"

export type UserStateProps = {
    globalUserState : UserState;
    setGlobalUserState: React.Dispatch<React.SetStateAction<UserState>>;
}
