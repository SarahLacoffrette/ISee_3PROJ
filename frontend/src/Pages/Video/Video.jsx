import VideoYoutube from "../../Components/Video/VideoYoutube";
import axios from "axios";
import {useEffect, useState} from "react";

const Video = () => {

    const queryParameters = new URLSearchParams(window.location.search);
    const queryId = queryParameters.get("id");
    const queryCreator = queryParameters.get("creator");
    const [data, setData] = useState();
    const [title, setTitle] = useState();
    const [view, setView] = useState();
    const [description, setDescription] = useState();
    const [video, setViceo] = useState();
    const [picture, setPicture] = useState("");

    useEffect(async () => {
        await axios.post("http://localhost:3003/api/video/getVideoById", {id: queryId}).then((res) => {

            setData(res.data.source);
            setTitle(res.data.title);
            setView(res.data.view);
            setDescription(res.data.description);
            setViceo(res.data.source);
        });
        await axios.post("http://localhost:3003/api/user/getUserById", {id: queryCreator}).then((res) => {
            setPicture(res.data.data.picture);
        })

    }, []);

    return(
        <div>
            <VideoYoutube src={data} title={title} view={view} description={description} id={queryId} id_user={queryCreator} source={video} image={picture}/>
        </div>
    )
}

export default Video