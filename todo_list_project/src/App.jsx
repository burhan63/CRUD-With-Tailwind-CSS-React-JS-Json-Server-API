import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import TodoTableComponent from './TodoTableScreen'
import { Route, Routes } from 'react-router'
import PageNotFoundComponent from './PageNotFound'
import AddNewTaskComponent from './AddNewTodoTask'
import EditUserComponent from './EditUserComponent'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<TodoTableComponent />}></Route>
        <Route path="/addnew" element={<AddNewTaskComponent/>}></Route>
        <Route path="/edit/:id" element={<EditUserComponent/>}></Route>
        <Route path="/*" element={<PageNotFoundComponent />}></Route>
      </Routes>
    </>
  )
}

export default App
