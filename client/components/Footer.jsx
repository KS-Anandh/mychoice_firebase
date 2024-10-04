import React from 'react'
import facebook from '../src/assets/Images/facebook.png'
import linkedin from '../src/assets/Images/linkedin.png'
import twitter from '../src/assets/Images/twitter.png'
import { Link } from 'react-router-dom'
const Footer = ({nav,setNav,user}) => {
  return (
    <div className='footer'>
      <div className={`${user?"":"block"}`}>
       <div className="info">
        <div className='info-links'>
            <h2>MyChoice</h2>
            <p>Greet the customers as soon as they walk through the door, say hello once they sit at the
                    table, get drinks to them quickly</p>
            <div className="links">
                <img src={facebook}/>
                <img src={linkedin}/>
                <img src={twitter}/>
            </div>
        </div>

        <div className='company'> 
            <h2>Company</h2>
            <ul>
            {nav==='home'?<li style={{color:'orangered'}}><Link to="/">Home</Link></li>:<li onClick={()=>{setNav('home')}}><Link to="/">Home</Link></li>}
            {nav==='Orders'?<li style={{color:'orangered'}}><Link to="/carts">My Cart</Link></li>:<li onClick={()=>{setNav('Orders')}}><Link to="/carts">My Cart</Link></li>}
            {nav==='Contact'?<li style={{color:'orangered'}}><Link to="/orders">My Orders</Link></li>:<li onClick={()=>{setNav('Contact')}}><Link to="/orders">My Orders</Link></li>}
            {nav==='About'?<li style={{color:'orangered'}}><Link to="/about">Contact Us</Link></li>:<li onClick={()=>{setNav('About')}}><Link to="/about">Contact Us</Link></li>}
            </ul>
        </div>

        <div className='contact'> 
            <h2>GET IN TOUCH</h2>
            <p>+91 9676906525<a href="tel:9676906525" style={{color:"orangered"}}>: Click To Call</a></p>
            <p>Nandhaanandh01@gmail.com<a href="mailto:nandhaanandh1432@gmail.com" style={{color:"orangered"}}> Click To Msg</a></p>
        </div>
       </div>
       </div>
    </div>
  )
}

export default Footer