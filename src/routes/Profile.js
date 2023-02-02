import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Hanzul from "components/Hanzul";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const [myHanzuls, setMyHanzuls] = useState([]);

  useEffect(() => {
    dbService
    .collection("hanzuls")
    .orderBy("createdAt", "desc")
    .where("creatorId", "==", userObj.uid)
    .onSnapshot((snapshot) => {
      const hanzulArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setMyHanzuls(hanzulArray);
    });
  }, []);



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
      refreshUser();
    }
  };
  
  return (
    <div className="container">
    <form onSubmit={onSubmit} className="profileForm">
      <input 
      onChange={onChange}
      type="text" 
      placeholder="프로필 이름"
      value={newDisplayName}
      autoFocus
      className="formInput"
      />
      <input 
      type="submit" 
      value="프로필 업데이트"
      className="formBtn"
      style={{
        marginTop: 10,
      }}
      />
    </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>


      <div style={{ marginTop: 30 }}>
        {myHanzuls.map((hanzul) => (
          <Hanzul 
          key={hanzul.id} 
          hanzulObj={hanzul}
          isOwner={hanzul.creatorId === userObj.uid}
          />
            ))}
            </div>


    </div>
  );
};

export default Profile;