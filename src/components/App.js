import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
       } else {
          setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
    {init ? (
    <AppRouter 
    refreshUser={refreshUser}
    isLoggedIn={Boolean(userObj)} 
    userObj={userObj} 
    />
    ) : (
      "Initializing..."
      )}
    <footer>&copy; {new Date().getFullYear()} 오늘의한줄</footer>
    </>
  );
}

export default App;