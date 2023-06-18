import Navigation from "../../Components/Video/Navigation";
import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import MenuVerticalSimple from "../../Components/Navigation/MenuVerticalSimple";
import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import MenuVerticalUser from "../../Components/Navigation/MenuVertical";
import Axios from "axios";
import "./style.css";


const HomePage = () => {

    const cookies = new Cookies();
    let [id, setId] = useState("")
    let [role, setRole] = useState("")
    let [navBar, setNavBar] = useState("")
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);


    useEffect(() => {
        if(cookies.get('id_user') === undefined){
            setNavBar(<MenuVerticalSimple/>)
        }else{
            const token = cookies.get('token');
            cookies.set('token', token, { path: '/' });

            Axios.post("http://localhost:3003/api/user/getCookie", {
                token
            }).then((res) => {
                setId(res.data.data.id);
                setRole(res.data.data.role);
                role = res.data.data.role;
                if(role == 2){

                    setNavBar(<MenuVerticalAdmin/>)
                }else if(role == 0 || role == 1){

                    setNavBar(<MenuVerticalUser/>)
                }
            })
        }
    }, []);

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
            {navBar}
            <div className={"border_page"}>
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
                        <h2>{video.title}</h2>
                        <p>{video.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage