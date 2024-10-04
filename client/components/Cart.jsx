import React, { useEffect, useState } from 'react'
import cross from '../src/assets/Images/cross.png'
import { Link } from 'react-router-dom' 
import axios from 'axios'

const Cart = ({data,user,setData,setChange,nav,setNav}) => {
    let amount=0;
      data.forEach((item)=>{
        amount=amount+item.productPrice;
     })
     const removeCart=(cart)=>{
          axios.post(`http://localhost:9800/mychoice/users/carts/remove/${user}`,{carts:cart})
          .then((res)=>{
            alert("Item Removed Successfully");
            const carts= data.filter((item)=>{
                return item!=cart;
            })
            setData(carts)
            setChange((value)=>{
                return !value
            })
          })
          .catch((err)=>{
             console.log(err)
          })
     }
  return (
    <div className={`cart ${user?"":"block"}`} >
        <div className='cartsHeader'>
        <h2 style={{padding:"0px 0px 20px 0px"}}>Carts:</h2>
        {<h2 className='cartPlus' onClick={()=>{setNav('home')}}><Link to="/" className='cartPlus'>+</Link></h2>}
        </div>
        <div className="cart-table">        
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Tittle</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>  
                {
                data.map((item,id)=>{
                      return(
                        <tr key={id}>
                        <td><img className='table-item-img' src={item.productImageUrl}/></td>
                        <td>{item.productName}</td>
                        <td>{item.productPrice}</td>
                        <td>1</td>
                        <td>$ {item.productPrice}</td>
                        <td onClick={()=>{removeCart(item._id)}}><img className='table-item-remove' src={cross} /></td>
                    </tr>
                         )
                })
                 }                   
                </tbody>
            </table>
        </div>
        <div className="cart-info">
            <div className='amount-info'>
            <div className='sub-total'>
                <p>Sub Total</p>
                <p>$ {amount}</p>
            </div>
            <hr/>
            <div className='delivery-fee'>
            <p>Delivery Fee</p>
            <p>$ {amount/10}</p>
            </div>
            <hr/>
            <div className='total'>
                <p>Total</p>
                <p>$ {amount+amount/10}</p>
            </div>
          <button> <Link to={`/orderPage`}>Proceed To Order</Link></button> 
        </div>
        <div className="promo-code">
            <p>If You Have Promo Code ,Enter it Here</p>
            <div className='input-box'>
                <input type='text' placeholder='Enter Prome Code'/>
                <p>Submit</p>
            </div>
        </div>

        </div>
          

    </div>
  )
}

export default Cart