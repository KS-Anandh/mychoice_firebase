import express from 'express'
import Users from '../models/userModel.js';

const userRoute=express.Router();

// for getting all users info
userRoute.get("/",async(req,res)=>{
       try{
            const users= await Users.find({})
            return res.status(200).json(users);
       }
       catch(err){
             return res.status(400).json("Error from users get method..");
       }
})

// userRoute.get("/",async(req,res)=>{
//   try{
//        const users= await Users.find({})
//        return res.status(200).json(users);
//   }
//   catch(err){
//         return res.status(400).json("Error from users get method..");
//   }
// })
//for verigy user exist or not using username
userRoute.get("/:userNam",async(req,res)=>{
       const userNam=req.params.userNam;
       try{
            const user= await Users.findOne({userName:userNam})
            if(user){
              return res.status(200).json(user);
            }
            else{
              return res.status(200).json(false);
            }
       }
       catch(err){
             return res.status(400).json("Error from users get method..");
       }
})
userRoute.get("/userInfo/:userId",async(req,res)=>{
  const {userId}=req.params;
  try{
       const user= await Users.findOne({_id:userId})
       if(user){
         return res.status(200).json(user);
       }
       else{
         return res.status(200).json(false);
       }
  }
  catch(err){
        return res.status(400).json("Error from users get method..");
  }
})
//for adding item into cart using user object id
userRoute.post("/carts/:id",async(req,res)=>{
  const {id}=req.params;
  const {carts}=req.body;
  try{
    const result =await Users.updateOne({_id:id},{$push:{carts:carts}})
    if(result){
       const carts =await Users.findOne({_id:id})
      res.status(200).json(carts.carts);
    }
  }
  catch(err){
    res.status(400).json(err)

  }
})
//for get all cart from user object by paasing object id of user
userRoute.get("/carts/:id",async(req,res)=>{
  const {id}=req.params;
  try{
    const result =await Users.findOne({_id:id})
    res.status(200).json(result.carts);
  }
  catch(err){
    res.status(400).json(err)

  }
})
//for get all orders from user object by paasing object id of user
userRoute.get("/orders/:id",async(req,res)=>{
  const {id}=req.params;
  try{
    const result =await Users.findOne({_id:id})
    res.status(200).json(result.orders);
  }
  catch(err){
    res.status(400).json(err)

  }
})
//for Sign-up Users
userRoute.post("/",async(req,res)=>{
       const mail=req.body.userName;
       const dup=await Users.findOne({userName:mail})
       if(!dup){
         try{
           const user=await new Users(req.body)
           await user.save()
           res.status(200).json("yah user data saved. ")
           }
         catch(err){
           return res.status(400).json("Error from users post method..");
            }
       }
       else{
          return res.status(200).json("User alredy exist..");  
       }
})
//for remove item into cart using user object id
userRoute.post("/carts/remove/:id",async(req,res)=>{
  const {id}=req.params;
  const {carts}=req.body;
  try{
    const result =await Users.updateOne({_id:id},{$pull:{carts:carts}})
    if(result){
       const carts =await Users.findOne({_id:id})
      res.status(200).json(carts.carts);
    }
  }
  catch(err){
    res.status(400).json(err)
  }
})
//for adding item into order using user object id
userRoute.post("/orders/:id",async(req,res)=>{
  const {id}=req.params;
  const {order}=req.body;
  try{
    const result =await Users.updateOne({_id:id},{$push:{orders:order}})
    if(result){
       const user =await Users.findOne({_id:id})
      res.status(200).json(user.orders);
    }
  }
  catch(err){
    res.status(400).json(err)

  }
})
//for remove item into order using user object id
userRoute.post("/orders/remove/:id",async(req,res)=>{
  const {id}=req.params;
  const {order}=req.body;
  try{
    const result =await Users.updateOne({_id:id},{$pull:{orders:order}})
    if(result){
       const user =await Users.findOne({_id:id})
      res.status(200).json(user.orders);
    }
  }
  catch(err){
    res.status(400).json(err)

  }
})


export default userRoute;