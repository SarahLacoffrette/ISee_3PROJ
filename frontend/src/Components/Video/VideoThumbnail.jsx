import image_temp from '../Asset/image_temp.jpeg';
import "./Video.css";
import axios from "axios";

const VideoThumbnail = (props) => {

    const title = props.title;
    const id = props.id;
    const redirectVideo = () => {
        axios.put("http://localhost:3003/api/video/addView", {
            id: id
        }).then((res) => {
            console.log(res.data)
        });
        window.location.replace("/video?id="+id+"&creator="+props.id_user);
    }

    return (
        <div className="section_nav_video" onClick={redirectVideo}>
            <div><img src={"http://localhost:9000/isee-bucket/"+ props.image}
                      alt="video" className="image_thumbnail" id="image"/></div>
            <br/>
            <div className="section_smallTitle"><span className="smallArtTitle">{title}</span></div>
        </div>
    )
}

export default VideoThumbnail