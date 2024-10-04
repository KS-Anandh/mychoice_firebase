import React, { useEffect, useState } from 'react'
import rating from '../src/assets/Images/rating.png'
import plus from '../src/assets/Images/plus.png'
import axios from 'axios'

const ListItems = ({products,delay,user,setCart}) => { 

  const CartPage=(id,name)=>{
  axios.post(`https://mychoice-firebase.vercel.app/mychoice/users/carts/${user}`,{carts:id})
  .then((res)=>{
    setCart(res.data)
     alert("Item added in Cart");
  
  })
  .catch((err)=>{
    console.log(err)
  })
    console.log(id)
  }

  return (
  <div className={`listItems ${user?"":"block"}`}>
    
       <div className="info">
            <h2>Top Dishes Near You</h2>
       </div>
       <div className="items">
        {delay?<h2 className='loadingH'>Loading...</h2>:<></>}
       {
            products.map((item,id)=>{
                return(
                    <div className='item' key={id}>
                    <div  className='img'>
                            <img  src={item.productImageUrl}/>
                    </div>
                    <div className='info'>
                    <img onClick={()=>{
                      CartPage(item._id,item._productName)
                    }} className='addPlus' src={plus}/>
                         <div className='info-header'>
                         <h3>{item.productName}</h3>
                         <img src={rating}/>
                        </div>         
                        <p>{item.productDesc.slice(0,80)}...</p>
                        <p className='price'>$ {item.productPrice}</p>

                    </div>
                </div>
                )
            })
        }
       



       </div>
    </div>
  )
}

export default ListItems