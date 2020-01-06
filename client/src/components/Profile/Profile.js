import React from "react";
import Userinfo from "./Userinfo";
import UserRecipes from "./UserRecipes";
import WithAuth from "../WithAuth";

const Profile = ({ session }) => {
  return (
    <div className="App">
      <Userinfo session={session} />
      <UserRecipes username={session.getCurrentUser.username} />
    </div>
  );
};

export default WithAuth(session => session && session.getCurrentUser)(Profile);
