import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Examples
// router.get("/checkAuth", verifyToken, (req, res, next) => {
//     res.send("You are authorised");
// })

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//     res.send("You are the authorised user");
// })

// router.get("/checkAdmin/:id", verifyUser, (req, res, next) => {
//     res.send("You're the admin and can update/delete accounts");
// })

// READ
router.get("/:id", verifyUser, getUser);

// READ ALL
router.get("/", verifyAdmin, getUsers);

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

export default router;