import React, {useEffect, useState} from "react";
import axios from "axios";
import VideoThumbnail from "../../Components/Video/VideoThumbnail";
import Cookies from "universal-cookie";

const DeleteVideo = () => {

    const [data, setData] = React.useState([]);
    const [id, setId] = React.useState('');
    const [video, setVideo] = useState(null);

    const cookies = new Cookies();
    const id_user = cookies.get('id_user');

    useEffect(() => {
        axios.post("http://localhost:3003/api/video/getVideoByUser", {
            id_user
        }).then((res) => {
            setData(res.data.data);
        });
    });

    const content = []
    data.map((video) => {
        content.push(
            <option value={video.id}>{video.title}</option>
        );
    });

    const handleDeleteVideo = (e) => {
        e.preventDefault();
        axios.delete("http://localhost:3003/api/video/deleteVideo/" + id)
            .then((res) => {

            window.location.replace("/studio");
        });
    }

    return(
        <div>
            <h1>Supprimer une vidéo</h1>
            <form onSubmit={handleDeleteVideo}>
                <label>Publication :</label><br/>
                <select name="state" id="video-select" value={video}
                        onChange={(e) => setId(e.target.value)}>
                    <option value="">--Choisir une vidéo--</option>
                    {content}
                </select>
                <br/><br/>
                <input type="submit" name="submit"/><br/>
            </form>
        </div>
    )
}

export default DeleteVideo