import { createContext, useContext, useState } from "react";

export const MainContext = createContext();

export const useMainContext = () => {
  const context = useContext(MainContext)
  if(!context){
    throw new Error("useMainContext must be used within a ContextProvider");
  }
  return context;
}

export const ContextProvider = ({ children }) => {

  const[showSaveQuery, setShowSaveQuery] = useState(false)

  const[showQueryList, setShowQueryList] = useState(false)

  const[showNav, setShowNav] = useState(false)

  const[queryList, setQueryList] = useState()

  const[showUpdateQuery, setShowUpdateQuery] = useState()

  return <MainContext.Provider value={{ showSaveQuery, setShowSaveQuery, showQueryList, setShowQueryList,
    queryList, setQueryList, showNav, setShowNav, showUpdateQuery, setShowUpdateQuery }}>
    {children}
    </MainContext.Provider>
}