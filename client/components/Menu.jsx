import React from 'react'
import cake from '../src/assets/Images/category/cake.jpg'
import juce from '../src/assets/Images/category/juce.jpg'
import pizza from '../src/assets/Images/category/pizza.jpg'
import ice from '../src/assets/Images/category/ice.jpg'
import tee from '../src/assets/Images/category/tee.jpg'
import axios from 'axios'

const Menu = ({setProducts}) => {
    const category=(category)=>{
         axios.get(`http://localhost:9800/mychoice/product/category/${category}`)
         .then((res)=>{
            setProducts(res.data)

         })
    }

    return (
        <div className='menu'>
            <div className="menu-about">
                <h2>Explore our menu</h2>
                <p>Greet the customers as soon as they walk through the door, say hello once they sit at the
                    table, get drinks to them quickly, check on the customers within two minutes of delivering food, make sure to refill drinks </p>
            </div>
            <div className="menu-list">

                <div onClick={()=>category(1)} className="item">
                    <img src={cake}/>
                    <p>Cake</p>
                </div>
                <div onClick={()=>category(2)} className="item">
                    <img src={pizza}/>
                    <p>pizza</p>
                </div>
                <div onClick={()=>category(3)} className="item">
                    <img src={ice}/>
                    <p>ice</p>
                </div>
                <div onClick={()=>category(4)} className="item">
                    <img src={tee}/>
                    <p>tee</p>
                </div>
                <div onClick={()=>category(5)} className="item">
                    <img src={juce}/>
                    <p>juce</p>
                </div>

            </div>
            <hr/>
        </div>
    )
}

export default Menu