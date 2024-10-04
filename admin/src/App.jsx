import React from 'react'
import NavBar from './components/NavBar'
import Container from './components/Container'
import AddItem from './components/AddItem'
import ListItems from './components/ListItems'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Update from './components/Update'
import Orders from './components/Orders'


const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <NavBar/>
      <Routes>
            <Route index path="/" element={<ListItems/>}/>
            <Route  path="/addItem" element={<AddItem/>}/>
            <Route  path="/updateItem/:id" element={<Update/>}/>
            <Route  path="/orders" element={<Orders/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App