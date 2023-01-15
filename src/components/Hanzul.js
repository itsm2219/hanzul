import React, { useState } from "react";
import { dbService } from "fbase";

const Hanzul = ({ hanzulObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newHanzul, setNewHanzul] = useState(hanzulObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      console.log(hanzulObj.id);
      const data = await dbService.doc(`hanzuls/${hanzulObj.id}`).delete();
      console.log(data);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewHanzul(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`hanzuls/${hanzulObj.id}`).update({ text: newHanzul });
    setEditing(false);
  };

  return (
  <div>
    {editing ? (
      <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={newHanzul} required />
        <input type="submit" value="업데이트" />
        </form>
        <button onClick={toggleEditing}>취소</button>
        </>
    ) : (
      <>
    <h4>{hanzulObj.text}</h4>
    {isOwner && (
      <>  
    <button onClick={onDeleteClick}>삭제</button>
    <button onClick={toggleEditing}>수정</button>
    </>
    )}
    </>
    )}
  </div>
  );
};

export default Hanzul;