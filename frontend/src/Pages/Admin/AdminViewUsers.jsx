import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import react, {useEffect, useState} from "react";
import Axios from "axios";
import ModifyUserByAdmin from "../UserPages/ModifyUserByAdmin";
import ModifyUser from "../UserPages/ModifyUser";
import Modal from "react-modal";
import axios from "axios";
const AdminViewUsers = () => {

    let [userList, setUserList] = react.useState([])
    let [idUser, setIdUser] = react.useState("")
    let [videoList, setVideoList] = react.useState([])

    useEffect(() => {
        Axios.get("http://localhost:3003/api/user/getAllUsers")
            .then((res) => {

                setUserList(res.data.data)
            });
    }, []);

    const handleModify = () => {
        window.location.replace("/modifyUser");
    }

    const showVideos = (role, id_user) => {
        if(role === 1){
            document.getElementsByClassName("sectionVideosTab")[0].style.display = "block";
        }
        Axios.post("http://localhost:3003/api/video/getVideoByUser", {
            id_user
        }).then((res) => {

            setVideoList(res.data.data);
        });
    }

    const tableVideo = () => {
        return videoList.map((video, i) => {
            return (
                <tr key={i}>
                    <td>{video.id}</td>
                    <td>{video.title}</td>
                    <td>{video.state}</td>
                    <td>{video.view}</td>
                    <td>{video.likes}</td>
                    <td>
                        <input type="button" name="Modifier" value="Modifier" onClick={""}/>
                        <input type="button" name="Bloquer" value="Bloquer" onClick={""}/>
                    </td>
                </tr>
            )
        })
    }

    const tableUser = () => {
        return userList.map((user, i) => {
            return (
                <tr key={i} onClick={() => showVideos(user.role, user.id)}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{userRole(user.role)}</td>
                    <td>
                        <input type="button" className={'btn-1'} name="Modifier" value="Modifier" onClick={() => openModal_user(user.id)}/>
                        <input type="button" className={'btn-1'} name="Bloquer" value="Bloquer" onClick={() => handleChangeRole(user.id)}/>
                    </td>
                </tr>
            )
        })
    }

    const handleChangeRole = (id_user) => {

        Axios.put("http://localhost:3003/api/user/changeRoleUser", {
            id: id_user, role: 3
        }).then((res) => {

            window.location.reload();
        });
    }

    const userRole = (role) => {
        if(role === 0){
            return "User"
        }else if(role === 1){
            return "Creator"
        }else if(role === 2){
            return "Admin"
        }else if(role === 3) {
            return "Banned"
        }
    }

    // POP UP MODAL

    const [modalIsOpen_user, setModalIsOpen_user] = useState(false);

    const openModal_user = (id) => {
        setIdUser(id)
        setModalIsOpen_user(true);
    };

    const closeModal_user = () => {
        setModalIsOpen_user(false);
    };

    return (
        <div>
            <MenuVerticalAdmin />
            <div className={"border_page"}>
                <h1 className={"title_h1"}>Admin Home Page</h1>

                <div className="sectionUsersTab tab">
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">The table header</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>Firstname</td>
                            <td>Lastname</td>
                            <td>Username</td>
                            <td>Email</td>
                            <td>Role</td>
                            <td>Actions</td>
                        </tr>
                        {tableUser()}
                        </tbody>
                    </table>
                </div>
                {
                    // HIDE
                }

                <div className="sectionVideosTab" style={{display : "none"}}>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">The table header</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>Title</td>
                            <td>State</td>
                            <td>Number of views</td>
                            <td>Number of likes</td>
                            <td>Actions</td>
                        </tr>
                        {tableVideo()}
                        </tbody>
                    </table>
                </div>
            </div>



            {
                //POP UP MODAL
            }

            <Modal
                isOpen={modalIsOpen_user}
                onRequestClose={closeModal_user}
                contentLabel="Modify User"
            >
                <ModifyUserByAdmin id={idUser}/>
            </Modal>

        </div>
    );
}

export default AdminViewUsers;