import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { allDrivers, allTeams, originDrivers } from './redux/Actions';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import Form from './views/form/Form';
import Nav from './components/nav/Nav';
import Error404 from './views/404/404';
import About from './views/about/About';
import './App.css'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allTeams())
        dispatch(allDrivers())
        dispatch(originDrivers('All'))
    })
  let path = true
  if(location.pathname === '/'){
      path = false
  }

  return (
    <>
        {path ? <Nav /> : null}
      <Routes>
        <Route path='*' element={<Error404/>} />
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/form' element={<Form/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </>
  )
}

export default App
