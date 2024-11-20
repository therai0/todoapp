import React, { useState } from "react";

import react from "react"

export const UserContext = react.createContext();


export default function UserContextProvider({ children }) {
  const [userid, setUserid] = useState(null);
  const [islogedIn, setIsLogedIn] = useState(false);
  return(
      <UserContext.Provider value={{userid,setUserid,islogedIn,setIsLogedIn}}>{children}</UserContext.Provider>
  )
}
