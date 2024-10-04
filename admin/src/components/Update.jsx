import React, { useEffect } from 'react'
import Container from './Container'
import { useState } from 'react'
import axios from 'axios'
import { useParams,Link, useNavigate } from 'react-router-dom'

const Update = () => {
  const [data,setData]=useState({});
  const nav=useNavigate();
  useEffect(()=>{
    axios.get(`http://localhost:9800/mychoice/product/id/${id}`)
   .then((res)=>{
       setData(res.data)
       console.log(res.data)
   })
  .catch((err)=>{
       console.log(err)
   })
 },[])
    const {id} =useParams();
    const[productName,setProductName]=useState();
    const[productCategory,setProductCategory]=useState(data.productCategory);
    const[productPrice,setProductPrice]=useState(data.productPrice);
    const[productRating,setProductRating]=useState(data.productRating);
    const[productDesc,setProductDesc]=useState(data.productDesc);
    const sendToDB=async()=>{
       await axios.put(`http://localhost:9800/mychoice/product/id/${id}`,{productName,productCategory,productPrice,productRating,productDesc})
        .then((res)=>{
          console.log(res.data)
          nav("/")
        })
        .catch((err)=>{
          console.log(err)
        })
       }
  return (
    <div className='container'>
    <Container/>
    <div className='addItem'>
    <div className='imageUploader'>
    <h2 style={{padding:"20px",fontSize:"20px",color:"green",fontWeight:"700"}}>Update Product (MyChoice)</h2>
    <input type="text" onChange={(e)=>setProductName(e.target.value)} defaultValue={data.productName} placeholder='Product Name *'/><br/>
    <input type="number" onChange={(e)=>setProductPrice(e.target.value)} defaultValue={data.productPrice} placeholder='Product price *'/><br/>
    <input type="number" onChange={(e)=>setProductCategory(e.target.value)} defaultValue={data.productCategory} placeholder='Product category *'/><br/>
    <input type="number" onChange={(e)=>setProductRating(e.target.value)} defaultValue={data.productRating} placeholder='Product rating *'/><br/>
    <input type="text" onChange={(e)=>setProductDesc(e.target.value)} defaultValue={data.productDesc} placeholder='Product desc *'/><br/>
    <button onClick={sendToDB} className='submitBtn'>submit</button>
    </div>
    </div>
</div>
  )
}

export default Update