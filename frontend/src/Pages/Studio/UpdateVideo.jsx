import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Axios from "axios";
import MenuVertical from "../../Components/Navigation/MenuVertical";
import MenuChanel from "../../Components/Navigation/MenuChanel";

const UpdateVideo = () => {

    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');
    const [id_user, setId_user] = useState('');
    const [state, setState] = useState('');
    const cookies = new Cookies();



    const queryParameters = new URLSearchParams(window.location.search);
    const queryId = queryParameters.get("id");

    useEffect(( ) => {
        setId_user(cookies.get('id_user'))
        axios.post("http://localhost:3003/api/video/getVideoById", {id: queryId})
            .then((res) => {
                console.log(res.data)
                setTitle(res.data.title);
                setDescription(res.data.description);
                setSource(res.data.source);
                setState(res.data.state);
        });
    }, []);

    const handleSubmitUpload = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3003/api/video/updateVideoById', {title, description, id_user, source, state})
            .then((res) => {

                window.location.replace('/studio');
            });
    }

    const handleBackStudio = () => {
        window.location.replace('/studio');
    }

    return (
        <div>
            <MenuVertical/>
            <MenuChanel state={false}/>
            <div className={"border_page"}>
                <h1>UploadVideo</h1>
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
                    <input type="text" name="videoTemp"
                           value={source}
                           onChange={(e) => setSource(e.target.value)}
                    />
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
        </div>
    )
}

export default UpdateVideo