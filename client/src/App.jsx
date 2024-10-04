import React, { useState,useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'
import {Route,Routes,Router,BrowserRouter} from 'react-router-dom'
import Home from '../components/Home'
import OrderingPage from '../components/OrderingPage'
import Orders from '../components/Orders'
import axios from 'axios'

const App = () => {
  const [user,setUser]=useState(null);
  const [cart,setCart]=useState([]);
  const [change,setChange]=useState(false);//reload when cart change
  const [data,setData]=useState([])
  const [products,setProducts]=useState([]);
  const [delay,setDelay]=useState(true);
  const [userInfo,setUserInfo]=useState();
  const [nav ,setNav]=useState('home');

  //for loading product to home page
  useEffect(()=>{
          axios.get("http://localhost:9800/mychoice/products")
          .then((res)=>{
              setProducts(res.data)
              setDelay(false)
          })
          .catch((err)=>{
            console.log(err)
          })
      },[])

  //cart products info
  useEffect(()=>{
      axios.post(`http://localhost:9800/mychoice/product/ids`,{ids:cart})
      .then((res)=>{
          setData(res.data)
      })
      .catch((err)=>{
          console.log(err)
      })

  },[cart])
 
  //all cart ids
  useEffect(()=>{
    axios.get(`http://localhost:9800/mychoice/users/carts/${user}`)
    .then((res)=>{
        setCart(res.data);
    })
    .catch((err)=>{
        console.log(err)})
  },[user,data])
  
  return (
    <div className='app'>
      <BrowserRouter>
      <NavBar setUser={setUser} userInfo={userInfo} nav={nav} setNav={setNav}user={user}/>
      <Routes>
         <Route index path="/" element={<Home user={user} setNav={setNav} nav={nav} setProducts={setProducts} setCart={setCart} products={products} delay={delay}setChange={setChange} />}/>
         <Route path="/carts" element={<Cart setChange={setChange}data={data} user={user} nav={nav} setNav={setNav}setData={setData}/>}/>
         <Route path="/orderPage" element={<OrderingPage user={user} data={data}/>} />
         <Route path="/orders" element={<Orders user={user} nav={nav} setNav={setNav}/>}/>
         <Route path="/about" element={<></>}/>
      </Routes>
      <Footer nav={nav} setNav={setNav} user={user}/>
      </BrowserRouter>
    </div>
  )
}
export default App