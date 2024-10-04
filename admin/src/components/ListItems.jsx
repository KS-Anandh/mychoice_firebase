import React, { useEffect, useState } from 'react'
import Container from './Container'
import axios from 'axios'
import { Link } from 'react-router-dom';

const ListItems = () => {
  const [delay,setDelay]=useState(true);
  const[data,setData]=useState([])
  useEffect(()=>{
     axios.get("https://mychoice-firebase.vercel.app/mychoice/products")
     .then((res)=>{
      setData(res.data)
      setDelay(false)
     })
     .catch((err)=>{
      console.log(err)
     })
  },[])

  const removeProduct=(id)=>{
    axios.delete(`https://mychoice-firebase.vercel.app/mychoice/product/id/${id}`)
    .then((res)=>{
      console.log(res.data)
      const remaining=data.filter((item)=>{
        return item._id!=id
      })
      setData(remaining)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className='container'>
        <Container/>
        <div className='listItems'>
          {delay?<center>Loading....</center>:<></>}
          {
            data.map((item ,id)=>{
              return <div className='item' key={id}>
              <p><img src={`${item.productImageUrl}`} width={80} height={80}/></p>
              <p>{item.productName}</p>
              <p>{item.productCategory}</p>
              <p>{item.productPrice}</p>
             <Link to={`/updateItem/${item._id}`}> <p className='updateBtn' >Update</p></Link>
              <p className='deleteBtn' onClick={()=>{removeProduct(item._id)}}>Remove</p>
          </div>  
            })
          }
             
        </div>
    </div>
  )
}

export default ListItems