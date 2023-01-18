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
  <div className="hanzul">
    {editing ? (
      <>
      <form onSubmit={onSubmit} className="container hanzulEdit">
        <input 
        onChange={onChange} 
        value={newHanzul} 
        required
        placeholder="한줄을 편집하세요."
        autoFocus
        className="formInput"
        />
        <input type="submit" value="업데이트" className="formBtn" />
        </form>
        <button onClick={toggleEditing} className="formBtn cancelBtn">
          취소
          </button>
        </>
    ) : (
      <>
    <h4>{hanzulObj.text}</h4>
    {isOwner && (
      <div className="hanzul__actions">
        <span onClick={onDeleteClick}>
          삭제
        </span>
        <span onClick={toggleEditing}>
          수정
        </span>
      </div>
    )}
    </>
    )}
  </div>
  );
};

export default Hanzul;