import React from "react";
import { useState } from "react";
import { dbService } from "fbase";



const HanzulFactory = ({ userObj }) => {
  const [hanzul, setHanzul] = useState("");
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
          );
        };

export default HanzulFactory;