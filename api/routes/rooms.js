import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";

const router = express.Router();

// CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

// READ
router.get("/:id", verifyAdmin, getRoom);

// READ ALL
router.get("/", verifyAdmin, getRooms);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export default router;