import express from "express";
import { addFood, listFood, removeFood } from "../Controller/foodController.js";
import multer from "multer";
import fs from "fs";

const foodRouter = express.Router();

// Ensure "Uploads" directory exists
const uploadDir = "./Uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Images storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads"); // Store images in "Uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood )
foodRouter.post("/remove",removeFood)

export default  foodRouter; 