import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    }
)
const UserOrders = mongoose.model("Orders", OrderSchema)
export default UserOrders;