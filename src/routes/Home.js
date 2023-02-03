import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Hanzul from "components/Hanzul";
import HanzulFactory from "components/HanzulFactory";

const Home = ({ userObj }) => {

  const [hanzuls, setHanzuls] = useState([]);

  const[search, setSearch] = useState("");


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

  const searchHanzul=(e)=>{
    e.preventDefault();
    setHanzuls(hanzuls.filter((hanzul)=>
    hanzul.text.toLowerCase().includes(search.toLowerCase())
    ));
  };


  return (
    <div className="container">

      <form onSubmit={(e)=>{searchHanzul(e)}}>
        <input onChange={(e)=>{setSearch(e.target.value)}} placeholder="한줄 검색"/>
        <button type="submit">찾기</button>
      </form>
   

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