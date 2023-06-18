import Axios from "axios";
import Navigation from "../Video/Navigation";
import React, {useState} from "react";
import VideoThumbnail from "../Video/VideoThumbnail";

const Recommandation = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const handleSearch = () => {
        Axios.post('http://localhost:3003/api/video/searchVideo', {
            title: searchQuery
        })
            .then((res) => {
                setVideos(res.data.data);
                document.getElementsByClassName("section_AllVideos")[0].style.display = "none";
            })
            .catch((error) => {
                console.log('Error searching videos:', error);
            });
    };

    return(
        <div>
            <div className={'search'}>
            <input className={'searchTerm'} type="text" value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder={"Recherche ..."}/>
            <button  className="searchButton" onClick={handleSearch}>
                <span className="material-symbols-outlined">search</span>
            </button>
            </div>
            <div className={'section_AllVideos'}>
                <Navigation/>
            </div>
            {videos.map((video) => (
                <div key={video.id}>
                    <VideoThumbnail title={video.title} id={video.id} id_user={video.id_user} image={video.image}/>
                </div>
            ))}
        </div>
    )
}

export default Recommandation