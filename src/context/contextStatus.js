
import { parseCookies } from "nookies";
import { createContext, useContext, useState } from "react";

const ContextStatus = createContext();

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {

   const cookie = parseCookies();


  const [token, setToken] = useState(cookie?.dropToken ? cookie?.dropToken : "");
  const [accountMenu, setaccountMenu] = useState('dashboard')
  const [sideCategory, setSideCategory] = useState(false);
  const [userName, setuserName] = useState(cookie?.userName ? cookie?.userName : "")
  const [userPhone, setuserPhone] = useState(cookie?.userPhone ? cookie?.userPhone : "")
  const [refreshApi, setrefreshApi] = useState(false)



  return (
    <ContextStatusProvider
      value={{
        token,
        setToken,
        accountMenu,
        setaccountMenu,
        sideCategory,
        setSideCategory,
        userName,
        setuserName,
        userPhone,
        setuserPhone,
        refreshApi,
        setrefreshApi

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

