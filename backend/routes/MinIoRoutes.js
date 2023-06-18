const express = require("express");
const multer = require("multer");
const minioClient = require("../services/minioService");

const router = express.Router();
const upload = multer();

const bucketName = "isee-bucket";

router.post("/uploadImage", upload.single("file"), async (req, res) => {
    try {
        const metadata = {
            'Content-Type': 'image',
        }
        const file = req.file;
        await minioClient.putObject(bucketName, file.originalname, file.buffer, metadata);

        res.json({ success: true, message: "Image uploaded successfully!" });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, error: "Failed to upload image." });
    }
});

router.post("/uploadVideo", upload.single("file"), async (req, res) => {
    try {
        const metadata = {
            'Content-Type': 'video/mp4',
        }
        const file = req.file;
        await minioClient.putObject(bucketName, file.originalname, file.buffer, metadata);

        res.json({ success: true, message: "Video uploaded successfully!" });
    } catch (error) {
        console.error("Error uploading video:", error);
        res.status(500).json({ success: false, error: "Failed to upload video." });
    }
});

router.get("/getImageUrl", async (req, res) => {
    try {
        const objectName = "logo.png"; // Remplacez par le nom de votre image dans MinIO

        const imageUrl = await minioClient.presignedGetObject(bucketName, objectName);
        res.json({ imageUrl });
    } catch (error) {
        console.error("Error retrieving image URL:", error);
        res.status(500).json({ error: "Failed to retrieve image URL." });
    }
});

module.exports = router;