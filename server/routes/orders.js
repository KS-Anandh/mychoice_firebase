import express from 'express'
import UserOrders from '../models/userOrdersModel.js';
import Users from '../models/userModel.js';

const orderRoute=express.Router();
orderRoute.get("/",async(req,res)=>{
    const orders=await UserOrders.find({})
    return res.status(200).json(orders)
})
orderRoute.post("/:order",async(req,res)=>{
    const {order}=req.params;
    try{ 
        const orders=new UserOrders(req.body)
        await orders.save();
        const result =await Users.updateOne({_id:order},{$push:{orders:orders._id}})
       if(!result){
        return res.status(500).json("Internal Server Error")
       }
       return res.status(200).json("Succseffully Stored")

    }
    catch(err){ return res.status(404).json(err)}  
})
orderRoute.post("/remove/:id",async(req,res)=>{
    const {id}=req.params;
    const {user}=req.body;
    try{
      const result =await Users.updateOne({_id:user},{$pull:{orders:id}})
      if(result){
        res.status(200).json("Successfully Removed from Orders");
      }
      res.status(500).json("Internal Server Error");
    }
    catch(err){
      res.status(400).json(err)
    }
  })
orderRoute.get("/id/:id",async(req,res)=>{
    const {id}=req.params
    try{ const orders=await UserOrders.find({id:id})
       return res.status(200).json(orders) }
    catch(err){ return res.status(404).json(err)} 
})
orderRoute.put("/admin/update/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const status = await UserOrders.findByIdAndUpdate(id,req.body)
        res.status(200).json("successfully Updated")
    }
    catch(err){
        return res.status(500).json("Internal Server Problem");
    }
})
//for getting all products by passing array of object id's 
orderRoute.post("/list/ids", async (req, res) => {
  const {ids}=req.body;
  try {
      const orders = await  UserOrders.find({_id:{$in:ids}});
      return res.status(200).json(orders)
  }
  catch (err) {
      return res.status(404).json("get method error from server")
  }

})
//for remove product in client page from admin pannel based on object id
orderRoute.delete("/remove/id/:id", async (req, res) => {
  const id = req.params.id
  try {
      const status = await UserOrders.findByIdAndDelete(id)
      if (status) {
          return res.status(200).json("Student Data deleted Successfuly...")
      }
      else {
          return res.status(401).json("Something Went Wrong..")
      }
  }
  catch {
      return res.status(500).json("Update Method Error..")
  }
})
export default orderRoute;
