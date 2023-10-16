import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from '../firebase/client.js'

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

  const[arrayActivities, setArrayActivities] = useState()

  const notifyUpdateForm = () => toast.success("Sentencia actualizada correctamente!");

  const notifyCreateForm = () => toast.success("Sentencia guardada correctamente!");

  const currentUser = useAuth()

  return <MainContext.Provider value={{ showSaveQuery, setShowSaveQuery, showQueryList, setShowQueryList,
    queryList, setQueryList, showNav, setShowNav, showUpdateQuery, setShowUpdateQuery, 
    arrayActivities, setArrayActivities, notifyUpdateForm, notifyCreateForm, currentUser }}>
    {children}
    </MainContext.Provider>
}