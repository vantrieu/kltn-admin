import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { AuthenticatedUser } from "../../../store/Account/types";

const EditProfile = (props: any) => {
    const user = useSelector<AppState>((state) => state.account.user) as AuthenticatedUser;
    
    return (
        <div>
            <h1>{user?.avatar}</h1>
        </div>
    )
}

export default EditProfile;