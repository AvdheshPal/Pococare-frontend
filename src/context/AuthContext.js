import React, { createContext, useState } from "react";

const AuthContext = createContext();

//  function for creating context

const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user,setUser] = useState(null)

    return <> <AuthContext.Provider value={{ token, setToken , user, setUser }} >{children}</AuthContext.Provider> </>
}
// <---  ---->
export { AuthContext, ContextProvider }
