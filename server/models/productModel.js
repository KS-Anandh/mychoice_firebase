import mongoose from "mongoose";
const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productCategory: {
            type: Number,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        productDesc: {
            type: String,
            required: true
        },
        productRating:{
            type:Number,
            required:true
        },
        productImageUrl:{
            type:String,
            required:true

        }
    }
)
const Product = mongoose.model("product",productSchema)
export default Product;