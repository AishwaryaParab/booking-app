import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unqiue: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true 
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;