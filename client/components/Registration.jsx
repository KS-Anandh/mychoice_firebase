import React from 'react'
import cross from '../src/assets/Images/cross.png'
const Registration = () => {
  return (
    <div className='registration'>
               <div className='reg'>
                <h2>Registration</h2>
                <img src={cross}  />
              </div>
               <div className='form'>
                <input type="mail" placeholder='Your mail' required/><br/>
                <input type="password" placeholder='password' required/><br/>
                <input type='submit'  value='Login'/><br/>
                <input type='checkbox'/> I Agree to terms of use and private policy
            </div>

    </div>
  )
}

export default Registration