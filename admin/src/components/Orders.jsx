import React, { useEffect, useState } from 'react'
import Container from './Container'
import order from '../assets/order.png'
import axios from 'axios'

const Orders = () => {
    const [orderItems,setOrderItems]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:9800/mychoice/orders")
        .then((res)=>{
            setOrderItems(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    var status=0;
     const update=(id)=>{
        axios.put(`http://localhost:9800/mychoice/orders/admin/update/${id}`,{status})
        .then((res)=>{
            alert(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
     }
    const state=(id)=>{
         status=document.getElementById(`${id}`).value;
         console.log(status)
    }
  return (
    <div className='container'>
    <Container/>
    <div className='orders-list'>
    <div className='orders'>

             {
               orderItems.map((item)=>{
                return <>
                 <div className='order'>
                <img className='logo' src={order}/>
                <p>{item.item}</p>
                <p>$ {item.total}</p>
                <p>Items:{item.count}</p>
                <select id={`${item._id}`} defaultValue={item.status} onChange={()=>{state(item._id)}}>
                    <option value={0}>Conformed</option>
                    <option value={1}>Out For Delivery</option>
                    <option value={2}>Delivered..</option>
                </select>
                <p className='traceOrderBtn' onClick={()=>{
                     update(item._id)
                }}>Update</p>
                </div>
                </>
               })  
             }

    </div>
    </div>
    </div>
  
  )
}

export default Orders