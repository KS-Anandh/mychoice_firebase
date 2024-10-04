import React, { useEffect, useState } from 'react'
import search from '../src/assets/Images/search.png'
import cart from '../src/assets/Images/cart.webp'
import cross from '../src/assets/Images/cross.png'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const NavBar = ({user,setUser,userInfo,nav,setNav}) => {
    const navigate =useNavigate()
    const [mail,setMail]=useState();
    const [userName,setUserName]=useState(null);
    const [password,setPassword]=useState(null);
    const mailSet=(e)=>{ setMail(e.target.value)}
    const loginClose=()=>{
            alert("Without Login We can't access web and if account not exits create new one by new Acoount Create in Below ")
    }
    const Close=()=>{
        const btn=document.getElementById('login')
        btn.classList.remove('active')    
     }

    const PageDirect=()=>{
        const value=document.getElementById("select").value;
        if(value==='login'){
            login()
        }
        navigate(`/${value}`);}
        const userSet=()=>{
        if(mail=="anandh"){
            alert("login Successfully Completed")
            setUser(mail);
            Close();
        }
        else{
            axios.get(`http://localhost:9800/mychoice/users/${mail}`)
            .then((res)=>{
                if(res.data){
                    Close()
                    alert("login Successfully Completed")
                    setUser(res.data._id);
                    console.log(res.data._id)              
                }
                else{
                    alert("Incorect username ")
                }
            })
            .catch((err)=>{
                console.log(err)
            })  
        }
        
    }
    const logout=()=>{
    const btn=document.getElementById('login')
    btn.classList.add('active')
    setUser(null)   
    }
    const registration=()=>{
        const btn=document.getElementById('reg')
        btn.classList.add('active')
        const btn2=document.getElementById('login')
        btn2.classList.remove('active')
    }
    const RegSub=()=>{
        if(userName!=null && password!=null && userName!=" " && password!=" "){
            var index=userName.indexOf("@");
            var domine=userName.slice(index+1,userName.length);
            if(domine==="gmail.com"){
                axios.post("http://localhost:9800/mychoice/users/",{userName,password})
                .then((res)=>{
                    alert(res.data)
                })
                .catch((err)=>[
                    console.log(err)
                ])
            }     
            else{
                alert("Gmail is Invalid..")
            }
            logout()
            const btn=document.getElementById('reg')
            btn.classList.remove('active')
        }
        else{
             alert("Enter Both Password and Mail ")
        }     
    }

  return (
    <div className='navBar'>
        <div className={`left-navBar`}>
            <h1>MyChoice.</h1>
        </div>
        <div className={`center-navBar`}>
            <ul>
            {nav==='home'?<li style={{color:'orangered',borderBottom:"3px solid orangered"}}><Link to="/">Home</Link></li>:<li onClick={()=>{setNav('home')}}><Link to="/">Home</Link></li>}
            {nav==='Orders'?<li style={{color:'orangered',borderBottom:"3px solid orangered"}}><Link to="/carts">My Cart</Link></li>:<li onClick={()=>{setNav('Orders')}}><Link to="/carts">My Cart</Link></li>}
            {nav==='Contact'?<li style={{color:'orangered',borderBottom:"3px solid orangered"}}><Link to="/orders">My Orders</Link></li>:<li onClick={()=>{setNav('Contact')}}><Link to="/orders">My Orders</Link></li>}
            {nav==='About'?<li style={{color:'orangered',borderBottom:"3px solid orangered"}}><Link to="/about">Contact Us</Link></li>:<li onClick={()=>{setNav('About')}}><Link to="/about">Contact Us</Link></li>}
            </ul>
            <select className='navBar-2' onChange={PageDirect} id="select" >
                <option value="">Home</option>
                <option value="carts">My Carts</option>
                <option value="orders">My Orders</option>
                <option value="about">About Us</option>
            </select>
        </div>
        <div className={`right-navBar`}>
            {/* <img src={search}/> */}
            <h3></h3>
           {<h2  onClick={()=>{setNav('Orders')}}><Link to="/carts" ><img src={cart}/></Link></h2>}      
          {user?<p onClick={logout}>log Out</p>:<p>Sign in</p>}  
        </div>

        <div className="loginForm active" id='login'>
            <div className='login-header'>
                <h2>Login</h2>
                <img src={cross} onClick={loginClose} />
            </div>
            <div className='login-form'>               
                <input type="mail" placeholder='Your mail' onChange={mailSet}required/><br/>
                <input type="password" placeholder='password' required/><br/>
                <input type='submit' onClick={userSet} value={'Login'}/>
                <input type='checkbox'/> I Agree to terms of use and private policy
                <p>Create a new account ? <span className='color' onClick={registration}>Click here</span></p>             
            </div>
        
        </div>
        <div className='registration' id="reg">
               <div className='reg'>
                <h2>Registration</h2>
                <img src={cross}  />
              </div>
               <div className='form'>
                <input type="mail" onChange={(e)=> setUserName(e.target.value)} placeholder='Your mail' required/><br/>
                <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder='password' required/><br/>
                <input type='submit' onClick={RegSub}  value='Login'/><br/>
                <input type='checkbox'/> I Agree to terms of use and private policy
            </div>

    </div>
    </div>
  )
}

export default NavBar