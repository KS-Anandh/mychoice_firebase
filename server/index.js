import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orders.js'
import compression from 'compression'
const app=express()
app.use(express.static("public"))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));// limit for passing Base-64 Object of Image to MongoDB from Json Body
app.use(compression());

app.use(cors())
app.use("/mychoice",productRoute) //for Product Info
app.use("/mychoice/users",userRoute) //for User Info[mail,pass,carts,orders]
app.use("/mychoice/orders",orderRoute)// for Order Details

//for connecting mongodb 
// mongodb+srv://ks_anandh:nandha1432@cluster0.q8u6zz9.mongodb.net/mychoice?retryWrites=true&w=majority&appName=Cluster0
// mongodb://localhost:27017/testProject_1
mongoose.connect("mongodb+srv://ks_anandh:nandha1432@cluster0.q8u6zz9.mongodb.net/mychoice?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Database Connected Successfully")
    //for listening port
    app.listen(9800,()=>{
        console.log("the Server Running on Port:9800");
    })
})
.catch((err)=>{
    console.log(err)
})