import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useChat from "./useChat";
function Brouillon() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const getImageUrl = async () => {
            try {
                const response = await axios.get("http://localhost:3003/api/getImageUrl");
                const imageUrl = response.data.imageUrl;
                //setImageUrl(imageUrl);
            } catch (error) {
                console.error("Error retrieving image URL:", error);
            }
        };

        getImageUrl();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            await axios.post("http://localhost:3003/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            <br/><br/>
            <h1>Image URL:</h1>
            <div>
                {imageUrl && <img src={imageUrl} alt="Image" />}
            </div>
        </div>
    );
};

export default Brouillon;
