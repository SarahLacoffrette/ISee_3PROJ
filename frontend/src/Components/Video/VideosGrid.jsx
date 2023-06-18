import image_temp from "../Asset/image_temp.jpeg";
import "./Video.css";
import VideoThumbnail from "./VideoThumbnail";
import axios from "axios";
import {useEffect, useState} from "react";

const VideosGrid = (props) => {

    const [data, setData]= useState([]);
    const queryParameters = new URLSearchParams(window.location.search);
    const queryId = queryParameters.get("id");
    useEffect(() => {
        axios.post("http://localhost:3003/api/video/getVideoByUser", {
            id_user: queryId
        }).then((res) => {
            setData(res.data.data);
        });
    }, []);
    const content = []
    data.map((video) => {
        content.push(
            <VideoThumbnail title={video.title} id={video.id} id_user={video.id_user} image={video.image}/>
        );
    })



    return (
        <div className="container_nav_grid">
            <div className="nav_video_grid">
                {content}
            </div>
        </div>
    )
}

export default VideosGrid