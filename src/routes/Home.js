import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Hanzul from "components/Hanzul";
import HanzulFactory from "components/HanzulFactory";

const Home = ({ userObj }) => {

  const [hanzuls, setHanzuls] = useState([]);

  useEffect(() => {
    dbService.collection("hanzuls").onSnapshot((snapshot) => {
      const hanzulArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setHanzuls(hanzulArray);
    });
  }, []);


  return (
    <>
      <HanzulFactory userObj={userObj} />
      <div>
        {hanzuls.map((hanzul) => (
          <Hanzul 
          key={hanzul.id} 
          hanzulObj={hanzul}
          isOwner={hanzul.creatorId === userObj.uid}
          />
            ))}
            </div>
            </>
            );
          };

export default Home;