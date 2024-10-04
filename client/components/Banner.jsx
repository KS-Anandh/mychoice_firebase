import React from 'react'
import { Link } from 'react-router-dom'
const Banner = ({setNav,nav}) => {
  return (
    <div className='banner'>
            <div className="info">
                <h1>Order your </h1><h1>favorite food here</h1>
                <p>A hotel app will provide a better platform to house your guest loyalty program by allowing the guests to collect points for different actions they take on the app. They can then go to a hub to see their progress and potentially cash in their rewards instantly.</p>
                {nav==='Orders'?<p style={{color:'orangered'}} className='btn'><Link to="/carts">My Cart</Link></p>:<p className='btn' onClick={()=>{setNav('Orders')}}><Link to="/carts">My Cart</Link></p>}

            </div>
    </div>
  )
}

export default Banner