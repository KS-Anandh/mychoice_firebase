import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const OrderingPage = ({data,user}) => {
    var count=0;
     var item='';
     var price=0;
    data.forEach(element => {
        price=element.productPrice+price;
        item=item+"- "+element.productName;
        count++;  
    });
    const order=()=>{
             const total=price+price/10
             const status=0
             alert("Successfully Ordered...")
             axios.post(`http://localhost:9800/mychoice/orders/${user}`,{item,count,total,status})
             .then((res)=>{
                console.log(res.data)
             })
             .catch((err)=>{
                console.log(err)
             })
    }
  return (
    <div className='orderingPage'>
        <div className="order-addr">
            <h2>Delivery Inforamtion</h2>
                <div className="two">
                    <input type="text" placeholder='First name'/>
                    <input type="text" placeholder='Secound name'/>
                </div>
                <div className="one">
                    <input type="mail" placeholder='Enter Mail'/>
                </div>
                <div className="one">
                <input type="text" placeholder='Complete Address'/>
                </div>
                <div className="two">
                 <input type="text" placeholder='City/Town' />
                 <input type="number" placeholder='pincode'/>
                </div>
                <div className="one">
                  <input type="number" placeholder='Phone No'/>
                </div>
        </div>

        <div className="cart-info">
            <div className='amount-info'>
            <p><span style={{fontWeight:"700",color:"orangered"}}>Items:</span> {item}</p>
            <div className='sub-total'>
                <p>Sub Total</p>
                <p>$ {price}</p>
            </div>
            <hr/>
            <div className='delivery-fee'>
            <p>Delivery Fee</p>
            <p>$ {price/10}</p>
            </div>
            <hr/>
            <div className='total'>
                <p>Total</p>
                <p>$ {price+price/10}</p>
            </div>
          <Link to="/carts"> <button onClick={order}>Proceed To Order</button></Link>
        </div>
        </div>
    </div>
  )
}

export default OrderingPage