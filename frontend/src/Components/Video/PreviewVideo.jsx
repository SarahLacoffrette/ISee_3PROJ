import image_temp from "../Asset/image_temp.jpeg";
import "./Video.css";
import "../Sections/Style/Style.css"
import axios from "axios";
import {useEffect, useState} from "react";

const PreviewVideo = (props) => {

    const [data, setData]= useState([]);
    const id_user = props.id_user;



    useEffect(() => {
        axios.post("http://localhost:3003/api/video/getVideoByUserLimit", {
            id_user
        }).then((res) => {
            setData(res.data.data);
        });
    }, []);
    const content = []
    if(data.length === 0){
        content.push(
            <div className="section_previewVideo" key={0}>
                <div className={"section_right_previewVideo"}>
                    <h1 className={"title_h1"}>Cette personne n'a pas encore de vidéo</h1>
                    <p className={"text"}>Vous pouvez trouver d'autres vidéos une en cliquant sur le bouton "Home" ou en recherchnat avec la barre de navigation</p>
                </div>
            </div>
        );
    }else{
        data.map((video) => {
            content.push(
                <div className="section_previewVideo" key={video.id}>
                    <div className={"section_left_previewVideo"}>
                        <img src={"http://localhost:9000/isee-bucket/"+ video.image} alt="video" className="image_previewPage" id="image"/>
                    </div>
                    <div className={"section_right_previewVideo"}>
                        <h1 className={"title_h1"}>{video.title}</h1>
                        <p className={"text"}>{video.description}</p>
                    </div>
                </div>
            );
        })
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default PreviewVideo