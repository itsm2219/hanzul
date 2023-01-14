import React, { useState } from "react";

const Home = () => {
  const [hanzul, setHanzul] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
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
    </div>
  );
};

export default Home;