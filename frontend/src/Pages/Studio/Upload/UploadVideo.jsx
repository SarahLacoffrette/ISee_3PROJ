import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";

const UploadVideo = () => {

    const [videoFile, setVideoFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState(null);
    const [id_user, setId_user] = useState('');
    const [state, setState] = useState('');
    const cookies = new Cookies();

    useEffect(() => {
        setId_user(cookies.get('id_user'))

    })

    const handleSubmitUpload = async (event) => {
        event.preventDefault();
        await handleUploadCloud();
        await handleUploadCloudImage();
        await axios.post('http://localhost:3003/api/video/createVideo', {
            title: title, description: description, id_user: id_user, source: source.name, image: imageUrl.name, state: state})
            .then((res) => {
            window.location.replace('/studio');
        });
    };

    const handleUploadCloud = async () => {
        try {
            const formData = new FormData();
            formData.append("file", source);
            await axios.post("http://localhost:3003/api/uploadVideo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleUploadCloudImage = async () => {
        try {
            const formData = new FormData();
            formData.append("file", imageUrl);
            await axios.post("http://localhost:3003/api/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleBackUpload = () => {
        window.location.replace('/studio');
    }

    const handleFileChange = (event) => {
        setSource(event.target.files[0]);
    };

    const handleFileChangeImage = (event) => {
        setImageUrl(event.target.files[0]);
    };

    return (
        <div>
            <h1>UploadVideo</h1>

            <input type="button" name="back" value="Retour" onClick={handleBackUpload}/><br/><br/>

            <form onSubmit={handleSubmitUpload}>

                <label>Titre:</label><br/>
                <input type="text" name="title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                /><br/>

                <label>Description :</label><br/>
                <input type="text" name="description"
                       value={description}
                       onChange={(e) => setDescription(e.target.value)}
                />
                <br/>

                <label>Upload video :</label><br/>
                <input type="file" name="videoTemp" onChange={handleFileChange}/>
                <br/>

                <label>Upload la miniature :</label><br/>
                <input type="file" name="videoPicture" onChange={handleFileChangeImage}/>
                <br/>

                <label>Publication :</label><br/>
                <select name="state" id="state-select" value={state}
                        onChange={(e) => setState(e.target.value)}>
                    <option value="">--Choisir un état--</option>
                    <option value="0">Privé</option>
                    <option value="1">Non répertorié</option>
                    <option value="2">Public</option>
                </select>
                <br/><br/>
                <input type="submit" name="submit"/><br/>
            </form>
        </div>
    )
}
///<!--<input type="file" id="video" accept="video/*" onChange={handleFileChange} />-->

export default UploadVideo