
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [token, setToken] = useState(null);

  useEffect(function(){
    if(localStorage.getItem('tkn') !== null){
      setToken( localStorage.getItem('tkn') );
    }
  },[]);
  
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
