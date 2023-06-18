import image_temp from "../Asset/image_temp.jpeg";
import "./Video.css";
import VideoThumbnail from "./VideoThumbnail";
import axios from "axios";
import {useEffect, useState} from "react";

const NavigationByUser = (props) => {

    const [data, setData]= useState([]);
    const id_user = props.id_user;
    useEffect(() => {
        axios.post("http://localhost:3003/api/video/getVideoByUser", {
            id_user
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
        <div className="container_nav">
            <span className="text_section title_h2">Autres Vidéo :</span>
            <div className="nav_video">
                {content}
            </div>
        </div>
    )
}

export default NavigationByUser