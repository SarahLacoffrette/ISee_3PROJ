import image_temp from "../Asset/image_temp.jpeg";
import "./Style/Style.css";
import Navigation from "../Video/Navigation";
import NavigationByUser from "../Video/NavigationByUser";
import {useEffect, useState} from "react";
import axios from "axios";
import VideoThumbnail from "../Video/VideoThumbnail";
import PreviewVideo from "../Video/PreviewVideo";

const PreviewPage = (props) => {

    return (
        <div>
            <br/>
            <PreviewVideo id_user={props.id}/>
            <div className={"section_navigation_previewVideo"}>
                <NavigationByUser id_user={props.id}/>
            </div>
        </div>
    )

}

export default PreviewPage