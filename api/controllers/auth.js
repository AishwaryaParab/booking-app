import User from "../models/User.js";
import brcypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = brcypt.genSaltSync(10);
        const hashedPassword = brcypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        res.status(201).json("User has been created.");
    } catch(err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if(!user) {
            return next(createError(404, "User not found!"));
        }

        const isPasswordCorrect = brcypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) {
            return next(createError(401, "Invalid password or username."))
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);

        const {password, isAdmin, ...otherDetails} = user._doc; // to avoid sending password & isAdmin
        res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails});
    } catch(err) {
        next(err);
    }
}