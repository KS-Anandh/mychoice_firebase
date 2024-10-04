import React from 'react'
import Banner from './Banner'
import Menu from './Menu'
import ListItems from './ListItems'
import axios from 'axios'
import {useState,useEffect} from 'react'

const Home = ({user,setProducts,setChange,delay,products,setCart,setNav,nav}) => {
  
  return (
    <div className={`home`}>
      
      <Banner setNav={setNav} nav={nav}/>
      <Menu setProducts={setProducts} user={user}/>
      <ListItems products={products} delay={delay} user={user} setCart={setCart} setChange={setChange}/>
    </div>
  )
}

export default Home