// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   Children,
// } from "react";

// const AuthContext = createContext();

// //  its a basically global data item for authorization.
// // store data in local storage on login
// // take jwt and login stored it .
// // is user currently logged in so thats for we making this check.

// //use auth is custom hook which return context.
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currUser, setCurrUser] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       setCurrUser(userId);
//     }
//   }, []);

//   const value = {
//     currUser,
//     setCurrUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // curruser means user not loggedin it chnaged when user loggedin

import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

// useAuth is a custom hook that returns the context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);

  // Set currUser if there's a userId stored in localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrUser(userId);
    }
  }, []);

  // Provide both currUser and setCurrUser as part of the context
  const value = {
    currUser,
    setCurrentUser: setCurrUser, // Change this to 'setCurrentUser'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
