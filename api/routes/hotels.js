import express from "express";
import { createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, getHotelsByCity, getHotelsByType, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// READ
router.get("/find/:id", getHotel);

// READ ALL
router.get("/", getHotels);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", getHotelsByCity);
router.get("/countByType", getHotelsByType);

router.get("/rooms/:id", getHotelRooms);

export default router;