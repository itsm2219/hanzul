import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return(
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginBottom: 50 }}>
      
      
      <li>
        <Link to="/" style={{ marginRight: 10, fontSize: 30 }}>홈</Link>
      </li>


      <li>
        <Link 
        to="/explore/nweets/"
        style={{
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 12,
        }}
        >
          <span style={{ marginTop: 10 }}>
            <b>인기글</b>
          </span>
        </Link>
      </li>


      <li>
        <Link 
        to="/explore/nweets/"
        style={{
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 12,
        }}
        >
          <span style={{ marginTop: 10 }}>
            <b>#검색</b>
          </span>
        </Link>
      </li>
      
      <li>  
        <Link 
        to="/profile"
        style={{
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 12,
        }}
        >
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
            ? `${userObj.displayName}의 프로필`
            : "Profile"}
          </span>
          </Link>
      </li>




    </ul>
  </nav>
);
};

export default Navigation;