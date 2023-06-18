import './Style/Style.css';
import {useEffect, useState} from "react";
import Axios from "axios";
const MenuChanel = (props) => {

    const [data, setData] = useState([]);
    const [nbView, setNbView] = useState([]);
    const [nbSub, setNbSub] = useState([]);
    const [nbLike, setNbLike] = useState([]);

    const queryParameters = new URLSearchParams(window.location.search);
    const queryId = queryParameters.get("id");

    useEffect(() => {
        Axios.post("http://localhost:3003/api/user/getUserById", {
            id: props.id
            }).then((res) => {
                setData(res.data.data);
        });
        Axios.post("http://localhost:3003/api/video/sumOfViews", {
            id_user: props.id
        }).then((res) => {
            setNbView(res.data.data);
        });
        Axios.post("http://localhost:3003/api/video/sumOfLikes", {
            id_user: props.id
        }).then((res) => {
            setNbLike(res.data.data);
        });
        Axios.post("http://localhost:3003/api/user/sumOfSubscriptions", {
            id: props.id
        }).then((res) => {
            setNbSub(res.data.data);
        });
    }, []);

    const displayMenu = () => {
        if(props.state === true){
            return(
                <ul className={"ul_menuChanel"}>
                    <li className={"li_menuChanel"}><a className={"a_menuChanel"} href={"/user?id="+queryId+"&page=0"}>Home</a></li>
                    <li className={"li_menuChanel"}><a className={"a_menuChanel"} href={"/user?id="+queryId+"&page=1"}>Videos</a></li>
                    <li className={"li_menuChanel"}><a className={"a_menuChanel"} href={"/user?id="+queryId+"&page=2"}>A Propos</a></li>
                    <li className={"li_menuChanel"}><a className={"a_menuChanel"} href={"/user?id="+queryId+"&page=3"}>Recommandation</a></li>
                </ul>
            )
        }
    }
    return (
        <div className="menuChanel">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,100,1,0" />
            <div className={"left_menuChanel part"}>
                <div className={"image_user"}>
                    <img className={"image_user_chanel"} src={"http://localhost:9000/isee-bucket/" + data.picture} alt={""}/>
                </div>
            </div>
            <div className={"center_menuChanel part"}>
                <div className={"section_profile_menuChanel"}>
                    <h3>{data.username}</h3>
                </div>
                <div className={"section_menu_menuChanel"}>
                    {displayMenu()}
                </div>
            </div>
            <div className={"right_menuChanel part"}>
                <div className={"group_text_menuChanel"}>
                    <div className={"text_likes_menuChanel texts_group_menuChanel"}><span className="material-symbols-outlined">favorite</span> {nbLike} Likes</div><br/>
                    <div className={"text_views_menuChanel texts_group_menuChanel"}><span className="material-symbols-outlined">visibility</span> {nbView} Views</div><br/>
                    <div className={"text_subscribers_menuChanel texts_group_menuChanel"}><span className="material-symbols-outlined">group</span> {nbSub} Subscribers</div><br/>
                </div>
            </div>
        </div>
    )
}

export default MenuChanel;