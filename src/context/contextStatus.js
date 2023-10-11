
import { parseCookies } from "nookies";
import { createContext, useContext, useState } from "react";

const ContextStatus = createContext();

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {

   const cookie = parseCookies();


  const [token, setToken] = useState(cookie?.token ? cookie?.token : "");
  const [accountMenu, setaccountMenu] = useState('dashboard')



  return (
    <ContextStatusProvider
      value={{
        token,
        setToken,
        accountMenu,
        setaccountMenu

      }}
    >
      {children}
    </ContextStatusProvider>
  );
}

function useStatus() {
  const all = useContext(ContextStatus);
  return all;
}

export { StatusProvider, useStatus };

