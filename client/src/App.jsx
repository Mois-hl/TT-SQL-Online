import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Main from './pages/Main/Main.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import { TaskContextProvider } from './context/TaskContext.jsx'
import './App.css'

function App() {

  return (
    <TaskContextProvider>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </TaskContextProvider>
  )
}

export default App
