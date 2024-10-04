import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        carts: {
            type: [String],
            required: false
        },
        orders:{
            type:[String],
            required:false
        }
    }
)
const Users = mongoose.model("user", UserSchema)
export default Users;