import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Main from './pages/Main/Main.jsx'
import { ContextProvider } from './context/Context.jsx'
import './App.css'
import Login from './pages/Login/Login.jsx'
import QueryList from './pages/QueryList/QueryList.jsx'

function App() {

  return (
    <ContextProvider>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/list' element={<QueryList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ContextProvider>
  )
}

export default App
