import React, {useContext} from "react";
import UserContext from "./UserContext";

function UserDetails(){
    //use the usecontext hook to access the user data from usercontext

    const userData = useContext(UserContext);

    return (
        <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
        </div>
    );
}

export default UserDetails;
