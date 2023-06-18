import Axios from "axios";
import Cookies from "universal-cookie";
import react, {useEffect, useState} from 'react';
import MenuChanel from "../../Components/Navigation/MenuChanel";
import MenuVertical from "../../Components/Navigation/MenuVertical";
import PreviewPage from "../../Components/Sections/PreviewPage";
import Spacer from "../../Components/Elements/Spacer";
import "./Style/Style.css"
import MenuVerticalSimple from "../../Components/Navigation/MenuVerticalSimple";
import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import MenuVerticalUser from "../../Components/Navigation/MenuVertical";
import React from "react";
import NavigationByUser from "../../Components/Video/NavigationByUser";
import Modal from "react-modal";
import UploadVideo from "./Upload/UploadVideo";
import SelectVideo from "./SelectVideo";
import DeleteVideo from "./DeleteVideo";
import ManageComments from "../../Components/Sections/ManageComments";


const Studio = () => {

    const cookies = new Cookies();
    let [id, setId] = react.useState("")
    let [role, setRole] = react.useState("")
    let [navBar, setNavBar] = react.useState("")
    const id_user = cookies.get('id_user');

    useEffect(() => {
        if(cookies.get('token') === undefined){
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

    const handleUpload = () => {
        window.location.replace("/upload")
    }
    const handleDelete = () => {
        window.location.replace("/deleteVideo")
    }
    const handleUpdate= () => {
        window.location.replace("/selectVideo")
    }

    const [modalIsOpen_upload, setModalIsOpen_upload] = useState(false);
    const [modalIsOpen_comment, setModalIsOpen_comment] = useState(false);
    const [modalIsOpen_update, setModalIsOpen_update] = useState(false);
    const [modalIsOpen_delete, setModalIsOpen_delete] = useState(false);
    const openModal_upload = () => {
        setModalIsOpen_upload(true);
    };

    const closeModal_upload = () => {
        setModalIsOpen_upload(false);
    };
    const openModal_update = () => {
        setModalIsOpen_update(true);
    };

    const closeModal_update = () => {
        setModalIsOpen_update(false);
    };
    const openModal_delete = () => {
        setModalIsOpen_delete(true);
    }

    const closeModal_delete = () => {
        setModalIsOpen_delete(false);
    }

    const openModal_comment = () => {
        setModalIsOpen_comment(true);
    }

    const closeModal_comment = () => {
        setModalIsOpen_comment(false);
    }

    return(
        <div className={"page_userHome"}>
            {navBar}
            <MenuChanel state={false} id={id_user}/>
            <div className={'border_page'}>
                <div className={'group_buttons_studio'}>
                    <input type="button" name="Upload" className={"btn-1"} value="Ajouter du contenu" onClick={openModal_upload}/><br/><br/>
                    <input type="button" name="Comments" className={"btn-1"} value="Gérer les commentaires" onClick={openModal_comment}/><br/><br/>
                    <input type="button" name="Modify" className={"btn-1"} value="Modifier du contenu" onClick={openModal_update}/><br/><br/>
                    <input type="button" name="Delete" className={"btn-1"} value="Supprimer du contenu" onClick={openModal_delete}/><br/><br/>
                </div>
                <NavigationByUser id_user={id_user}/>
            </div>

            {/* POP UP*/}
            <Modal
                isOpen={modalIsOpen_upload}
                onRequestClose={closeModal_upload}
                contentLabel="Upload video"
                className={"dialogue"}
            >
                <UploadVideo/>
            </Modal>
            <Modal
                isOpen={modalIsOpen_update}
                onRequestClose={closeModal_update}
                contentLabel="Update Video"
            >
                <SelectVideo/>
            </Modal>
            <Modal
                isOpen={modalIsOpen_delete}
                onRequestClose={closeModal_delete}
                contentLabel="Delete Video"
            >
                <DeleteVideo/>
            </Modal>

            <Modal
                isOpen={modalIsOpen_comment}
                onRequestClose={closeModal_comment}
                contentLabel="Manage comments"
            >
                <ManageComments id_user={id_user} />
            </Modal>
        </div>
    )
}

export default Studio;