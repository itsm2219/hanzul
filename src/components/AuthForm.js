import React from "react";
import { authService } from "fbase";
import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;

      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }

    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

return (
  <>
    <form onSubmit={onSubmit} className="container">
      <input
        name="email"
        type="email"
        placeholder="이메일"
        required
        value={email}
        onChange={onChange}
        className="authInput"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        required
        value={password}
        onChange={onChange}
        className="authInput"
      />
      <input
        type="submit"
        value={newAccount ? "회원가입" : "로그인"}
        className="authInput authSubmit"
      />
      {error && <span className="authError">{error}</span>}
    </form>
    <span onClick={toggleAccount} className="authSwitch">
      {newAccount ? "로그인" : "회원가입"}
    </span>
  </>
);
};

export default AuthForm;
