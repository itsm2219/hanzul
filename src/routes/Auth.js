import React from "react";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = () => {


  return (
    <div className="authContainer">
      <span style={{ fontSize: 30 }}>
        오늘의 한줄
      </span>

      <AuthForm />
      <div className="authBtns">

      </div>
    </div>
  );
};

export default Auth;