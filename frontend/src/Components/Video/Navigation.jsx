import image_temp from "../Asset/image_temp.jpeg";
import "./Video.css";
import VideoThumbnail from "./VideoThumbnail";
import axios from "axios";
import {useEffect, useState} from "react";

const Navigation = () => {

    const [data, setData]= useState([]);


    useEffect(() => {
        axios.get("http://localhost:3003/api/video/getAllVideos").then((res) => {
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
        <div className="container_nav">
            <span className="text_section">Titre</span>
            <div className="nav_video">
                {content}
            </div>
        </div>
    )
}

export default Navigation