import React from "react";
import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
    }
  };
  
  return (
    <>
    <form onSubmit={onSubmit}>
      <input 
      onChange={onChange}
      type="text" 
      placeholder="Display name"
      value={newDisplayName}
      />
      <input 
      type="submit" value="프로필 업데이트" />
    </form>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;