import './Style/Style.css'
import Divider from '../Divider/Divider'
import Cookies from "universal-cookie";
import Axios from "axios";
import react, {useEffect, useState} from "react";
import Modal from "react-modal";
import ModifyUser from "../../Pages/UserPages/ModifyUser";
import UploadVideo from "../../Pages/Studio/Upload/UploadVideo";
import Ticket from "../Sections/Tickets";
import Logo from "../../Components/Elements/Logo";

const MenuVertical = () => {

    const cookies = new Cookies();
    const [username, setUsername] = react.useState("user")
    let [id, setId] = react.useState("")
    let [role, setRole] = react.useState("")
    let [email, setEmail] = react.useState("")
    let [dataSubscriptions, setDataSubscriptions] = react.useState([])
    let [listSubscriptions, setListSubscriptions] = react.useState([])
    let [content, setContent] = react.useState([])

    useEffect(() => {
        if (cookies.get('token') === undefined) {
            //TODO
            window.location.replace("/login"); /// A MODIFIER
        } else {
            const token = cookies.get('token');
            cookies.set('token', token, { path: '/' });
            Axios.post("http://localhost:3003/api/user/getCookie", {
                token
            }).then((res) => {
                setUsername(res.data.data.username);
                setId(res.data.data.id);
                setRole(res.data.data.role);
                setEmail(res.data.data.email);

                // Utilisez directement l'id dans le deuxième appel Axios
                Axios.post("http://localhost:3003/api/subscribe/getSubscribes", {
                    id_user: res.data.data.id
                }).then((res) => {
                    const data = res.data.data;

                    // Utilisez Promise.all pour attendre que toutes les requêtes Axios soient terminées
                    Promise.all(
                        data.map((val) => {
                            return Axios.post("http://localhost:3003/api/user/getUserById", {
                                id: val.id_channel
                            }).then((res) => {
                                return res.data.data;
                            });
                        })
                    ).then((results) => {
                        // Toutes les requêtes Axios sont terminées, mettez à jour le contenu
                        const content = results.map((data) => (
                            <li className="li_verticalMenu" onClick={() => {handleChannel(data.id)}}>
                                <div className="miniImage_user">
                                    <img className="miniImage_user_chanel" src={"http://localhost:9000/isee-bucket/" + data.picture} alt={""} />
                                </div>
                                <div className="mini_text_creator">
                                    <span>{data.username}</span>
                                </div>
                            </li>
                        ));
                        setContent(content);
                    });
                });
            });
        }
    }, []);

    const handleChannel = (id_channel) => {
        window.location.replace("/user?id=" + id_channel + "&page=0");
    }

    const handleHome = () => {
        window.location.replace("/");
    }

    const handleUser = () => {
        window.location.replace("/user?id=" + id + "&page=0");
    }

    const handleVideo = () => {
        window.location.replace("/studio");
    }

    const handleDelete = () => {
        // const id = cookies.get('id_user')
        console.log(id)
        Axios.delete("http://localhost:3003/api/user/deleteUser/" + id)
            .then((res) => {
                console.log(res)
                window.location.replace("/login");
            })
    }

    const handleLogOut = () => {
        cookies.remove('token');
        cookies.remove('id_user');
        window.location.replace("/");
    }

    const handleHelp = () => {
        window.location.replace("/faq");
    }

        // POP UP MODAL

    const [modalIsOpen_user, setModalIsOpen_user] = useState(false);
    const [modalIsOpen_upload, setModalIsOpen_upload] = useState(false);
    const [modalIsOpen_ticket, setModalIsOpen_ticket] = useState(false);

    const openModal_user = () => {
        setModalIsOpen_user(true);
    };

    const closeModal_user = () => {
        setModalIsOpen_user(false);
    };

    const closeModal_upload = () => {
        setModalIsOpen_upload(false);
    };

    const openModal_ticket = () => {
        setModalIsOpen_ticket(true);
    }

    const closeModal_ticket = () => {
        setModalIsOpen_ticket(false);
    }

    return (
        <div className="verticalMenu">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,100,1,0" />
            <div className={"section_logo_verticalMenu"}>
                <Logo/>
            </div>
            <ul className={"ul_verticalMenu section_top_verticalMenu"}>
                <li className={"li_verticalMenu"} onClick={handleHome}><span className="material-symbols-outlined">home</span>Home</li>
                <li className={"li_verticalMenu"} onClick={handleUser}><span className="material-symbols-outlined">account_circle</span>Compte</li>
                <li className={"li_verticalMenu"} onClick={handleVideo}><span className="material-symbols-outlined">videocam</span>Studio</li>
                <li className={"li_verticalMenu"} onClick={openModal_user}><span className="material-symbols-outlined">settings</span>Paramètres</li>
            </ul>
            <Divider/>
            <ul className={"ul_verticalMenu section_middle_verticalMenu"}>
                {content}
            </ul>
            <Divider/>
            <ul className={"ul_verticalMenu section_bottom_verticalMenu"}>
                <li className={"li_verticalMenu"} onClick={handleHelp}><span className="material-symbols-outlined">help</span>FAQ</li>
                <li className={"li_verticalMenu"} onClick={openModal_ticket}><span className="material-symbols-outlined">support</span>Support</li>
                <li className={"li_verticalMenu"} onClick={handleLogOut}><span className="material-symbols-outlined">meeting_room</span>Déconnexion</li>
            </ul>

            {/* POP UP */}

            <Modal
                isOpen={modalIsOpen_user}
                onRequestClose={closeModal_user}
                contentLabel="Modify User"
            >
                <button onClick={handleDelete}>Supprimer le compte</button>
                <ModifyUser/>
            </Modal>

            <Modal
                isOpen={modalIsOpen_upload}
                onRequestClose={closeModal_upload}
                contentLabel="Upload Video"
            >
                <UploadVideo/>
            </Modal>

            <Modal
                isOpen={modalIsOpen_ticket}
                onRequestClose={closeModal_ticket}
                contentLabel="Ticket"
            >
                <Ticket id_user={id} username={username} email={email} />
            </Modal>
        </div>
    )

}

export default MenuVertical;