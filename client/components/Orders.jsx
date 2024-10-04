import React, { useEffect, useState } from 'react'
import axios from 'axios'
import order from '../src/assets/Images/order.png'
import { Link } from 'react-router-dom';
const Orders = ({user,nav,setNav}) => {
  const [ids,setIds]=useState([]);
  const [orderItems,setOrderItems]=useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:9800/mychoice/users/orders/${user}`)
    .then((res)=>{
      setIds(res.data);
    })
    .catch((err)=>{
        console.log(err)})
      },[])
      
  useEffect(()=>{
    axios.post("http://localhost:9800/mychoice/orders/list/ids",{ids})
    .then((res)=>{
        setOrderItems(res.data)
      })
    .catch((err)=>{
         console.log(err)
        })
  });

  const cancel=(id)=>{
     const updatedIds=ids.filter((item)=>{
      return item._id!=id;
    })
    setIds(updatedIds)
    axios.delete(`http://localhost:9800/mychoice/orders/remove/id/${id}`)
    .then((res)=>{
       alert("Order Is Canceled")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const feedback=()=>{
    console.log("feedback")
  }
  return (
    <div className={`orders ${user?"":"block"}`}>
        <div className='cartsHeader'>
        <h2 style={{padding:"0px 0px 20px 0px"}}>Orders:</h2>
        {<h2 className='cartPlus' onClick={()=>{setNav('Orders')}}><Link to="/carts" className='cartPlus'>+</Link></h2>}
        </div>
        <div className='order-container'>
          {  orderItems.map((item,id)=>{
              return <>
              <div className='order' key={id}>
                <img className='logo' src={order}/>
                <p>{item.item}</p>
                <p>$ {item.total}</p>
                <p>Items:{item.count}</p>
                <p><span style={{color:"green"}}>{item.status==0?"Conformed":item.status==1?"Out For Delivery":"Delivered"}</span></p>
                {item.status==2?<p className='traceOrderBtn'  onClick={()=>{feedback()}}> Feedback</p>:<p className='traceOrderBtn'  onClick={()=>{ cancel(item._id)}}>Cancel Order</p>}
               </div>
              </>
            })}
        </div>
    </div>
  )
}

export default Orders