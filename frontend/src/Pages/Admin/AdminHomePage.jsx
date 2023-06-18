import Cookies from "universal-cookie";
import react, {useEffect, useState} from "react";
import Axios from "axios";
import '../Style.css';
import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import Modal from "react-modal";
import ModifyUserByAdmin from "../UserPages/ModifyUserByAdmin";

const AdminHomePage = () => {

    const cookies = new Cookies();
    const [username, setUsername] = react.useState("user")
    let [id, setId] = react.useState("")
    let [role, setRole] = react.useState("")
    let [userList, setUserList] = react.useState([])
    let [idModify, setIdModify] = react.useState("")
    let [totalUser, setTotalUser] = react.useState("")
    let [totlaVideo, setTotalVideo] = react.useState("")

    useEffect(() => {
        if(cookies.get('token') === undefined){
            window.location.replace("/login");
        }else{
            const token = cookies.get('token');
            cookies.set('token', token, { path: '/' });
            Axios.post("http://localhost:3003/api/user/getCookie", {
                token
            }).then((res) => {
                setUsername(res.data.data.username);
                setId(res.data.data.id);
                setRole(res.data.data.role);
                id = res.data.data.id;
                role = res.data.data.role;

            })
        }
        Axios.get("http://localhost:3003/api/user/numberOfUsers").
        then((res) => {
            setTotalUser(res.data.data);
        });
        Axios.get("http://localhost:3003/api/video/numberOfVideos").
        then((res) => {
            setTotalVideo(res.data.data);
        });
    })



    const handleModify = () => {
        window.location.replace("/modifyUser");
    }


    return (
        <div>
            <MenuVerticalAdmin/>
            <div className={"border_page"}>
                <h1 className={"title_h1"}>Admin Home Page : {username}</h1>
                <div>
                    <h2 className={"title_h2"}>Utilisateurs</h2>
                    <p className={"text"}>Nombre total d'utilisateur : {totalUser}</p>
                </div>
                <div>
                    <h2 className={"title_h2"}>Vidéos</h2>
                    <p className={"text"}>Nombre total de vidéos : {totlaVideo}</p>
                </div>


            </div>
        </div>
    )
}

export default AdminHomePage