import React from "react";
import { useState } from "react";
import { dbService } from "fbase";
import Hanzul from "components/Hanzul";



const HanzulFactory = ({ userObj }) => {
  const [hanzul, setHanzul] = useState("");
  const [hanzuls, setHanzuls] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const hashtags =hanzul.split(" ").filter(word => word.startsWith('#'));
    if (hanzul === "") {
      return;
    }
    await dbService.collection("hanzuls").add({
      text: hanzul,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      hashtags: hashtags,
    });
    setHanzul("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setHanzul(value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const filteredHanzuls = hanzuls.filter(hanzul => hanzul.hashtags && hanzul.hashtags.includes(searchTerm));

  const filterHanzul = hanzuls.filter((p) => {
    return p.hanzul.toLocaleLowerCase().includes(search.toLocaleLowerCase())
})

return (
  <div>
    <form>
      <input value={searchTerm} onChange={onSearch} type="hashtags" placeholder="Search hashtags"/>
    </form>
    <div>
      {filteredHanzuls.map((hanzul) => (
        <Hanzul key={hanzul.id} hanzulObj={hanzul} isOwner={hanzul.creatorId === userObj.uid} hashtags={hashtags}/>
      ))}
    </div>


    <form onSubmit={e => onSearch(e)}>
            <input type="text" value={search} onChange={onChange} placeholder="한줄 검색"/>
            <button type="submit">검색</button>
    </form>
    <div>
                {filterHanzul.map(hanzul =>
                <Hanzul
                key={hanzul.id}
                hanzulObj={hanzul} 
                isOwner={hanzul.creatorId === userObj.uid}
                text={hanzul}
                />
               )}
    </div>

    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
      <input
      className="factoryInput__input"
        value={hanzul}
        onChange={onChange}
        type="text"
        placeholder="글을 입력하세요."
        maxLength={120}
      />
      <input type="submit" value="입력" className="factoryInput__arrow" />
      </div>
    </form>
  </div>
    );
  };

export default HanzulFactory;