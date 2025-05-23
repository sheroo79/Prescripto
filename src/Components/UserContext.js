import React, { createContext, useState } from 'react';
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      profileImage: null
    });
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}


