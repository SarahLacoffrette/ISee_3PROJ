import './Style/Style.css'
import Divider from '../Divider/Divider'
import Cookies from "universal-cookie";
import Axios from "axios";
import react, {useState} from "react";
import Modal from "react-modal";
import ModifyUser from "../../Pages/UserPages/ModifyUser";
import UploadVideo from "../../Pages/Studio/Upload/UploadVideo";
import Logo from "../Elements/Logo";

const MenuVerticalAdmin = () => {

    const cookies = new Cookies();
    const [username, setUsername] = react.useState("user")
    let [id, setId] = react.useState("")
    let [role, setRole] = react.useState("")

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

    const handleHome = () => {
        window.location.replace("/admin");
    }

    const handleLogOut = () => {
        cookies.remove('token');
        cookies.remove('id_user');
        window.location.replace("/");
    }

    const handleViewVideos = () => {
        window.location.replace("/adminViewVideos")
    }

    const handleViewUsers = () => {
        window.location.replace("/adminViewUsers")
    }

    const handleViewComments = () => {
        window.location.replace("/adminViewComments")
    }

    const handleNotification = () => {
        window.location.replace("/adminNotification")
    }

    const handleHelp = () => {
        window.location.replace("/faq");
    }

        // POP UP MODAL

    const [modalIsOpen_user, setModalIsOpen_user] = useState(false);
    const [modalIsOpen_upload, setModalIsOpen_upload] = useState(false);

    const openModal_user = () => {
        setModalIsOpen_user(true);
    };

    const closeModal_user = () => {
        setModalIsOpen_user(false);
    };

    const openModal_upload = () => {
        setModalIsOpen_upload(true);
    };

    const closeModal_upload = () => {
        setModalIsOpen_upload(false);
    };


    return (
        <div className="verticalMenu">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,100,1,0" />
            <div className={"section_logo_verticalMenu"}>
                <Logo/>
            </div>
            <ul className={"ul_verticalMenu section_top_verticalMenu"}>
                <li className={"li_verticalMenu"} onClick={handleHome}><span className="material-symbols-outlined">home</span>Home</li>
                <li className={"li_verticalMenu"} onClick={handleViewUsers}><span className="material-symbols-outlined">group</span>Users</li>
                <li className={"li_verticalMenu"} onClick={handleViewVideos}><span className="material-symbols-outlined">videocam</span>Vidéos</li>
                <li className={"li_verticalMenu"} onClick={handleViewComments}><span className="material-symbols-outlined">forum</span>Commentaires</li>
            </ul>
            <Divider/>
            <ul className={"ul_verticalMenu section_middle_verticalMenu"}>
            </ul>
            <Divider/>
            <ul className={"ul_verticalMenu section_bottom_verticalMenu"}>
                <li className={"li_verticalMenu"} onClick={handleHelp}><span className="material-symbols-outlined">help</span>FAQ</li>
                <li className={"li_verticalMenu"} onClick={handleNotification}><span className="material-symbols-outlined">support</span>Notifications</li>
                <li className={"li_verticalMenu"} onClick={handleLogOut}><span className="material-symbols-outlined">meeting_room</span>Déconnexion</li>
            </ul>


            {/* POP UP */}

            <Modal
                isOpen={modalIsOpen_user}
                onRequestClose={closeModal_user}
                contentLabel="Modify User"
            >
                <ModifyUser/>
            </Modal>

            <Modal
                isOpen={modalIsOpen_upload}
                onRequestClose={closeModal_upload}
                contentLabel="Modify User"
            >
                <UploadVideo/>
            </Modal>
        </div>
    )

}

export default MenuVerticalAdmin;