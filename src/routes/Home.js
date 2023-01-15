import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Hanzul from "components/Hanzul";

const Home = ({ userObj }) => {
  const [hanzul, setHanzul] = useState("");
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

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("hanzuls").add({
      text: hanzul,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setHanzul("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setHanzul(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={hanzul}
          onChange={onChange}
          type="text"
          placeholder="글을 입력하세요."
          maxLength={120}
        />
        <input type="submit" value="입력" />
      </form>
      <div>
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