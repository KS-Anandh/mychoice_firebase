import React from 'react'
import { Link } from 'react-router-dom'

const Container = () => {
  return (
        <div className='options'>
            <ul>
               <Link to="/addItem"><li>Add Items</li></Link>
                <Link to="/"><li>List Items</li></Link>
                <Link to="/orders"><li>Orders</li></Link>
            </ul>
        </div>
  )
}

export default Container