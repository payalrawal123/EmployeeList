
import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import EmployeeTable from './components/Employee'
import Update from './components/Update'

function App() {
  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<EmployeeTable/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
    </Routes>
    </BrowserRouter>
     {/* <EmployeeTable/>  */}
    </>
  )
}

export default App
