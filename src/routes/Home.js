import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Hanzul from "components/Hanzul";
import HanzulFactory from "components/HanzulFactory";

const Home = ({ userObj }) => {

  const [hanzuls, setHanzuls] = useState([]);

  useEffect(() => {
    dbService
    .collection("hanzuls")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const hanzulArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setHanzuls(hanzulArray);
    });
  }, []);


  return (
    <div className="container">
      <HanzulFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {hanzuls.map((hanzul) => (
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

export default Home;