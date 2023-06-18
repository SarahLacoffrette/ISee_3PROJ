import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import react, {useEffect, useState} from "react";
import Axios from "axios";
import Modal from "react-modal";
import React from "react";

const AdminNotification = () => {

    const [dataNotification, setDataNotification] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:3003/api/tickets/getNotifications")
            .then((res) => {

                setDataNotification(res.data.data)
            });
    }, []);
    const tableNotification = () => {
        return (dataNotification.map((notification, i) => {
            let content = "check_circle";
            let color = "green";

            if(notification.state === 0){
                content = "cancel";
                color = "red";
            }
            return (
                <tr key={i}>
                    <td>{notification.id}</td>
                    <td>{notification.username}</td>
                    <td>{notification.email}</td>
                    <td>{notification.text}</td>
                    <td><span className="material-symbols-outlined" style={{color: `${color}`}}>{content}</span></td>
                    <td>
                        <input type="button" className={'btn-1'} name="Bloquer" value="Valider" onClick={() => {handleValidate(notification.id)}}/>
                        <input type="button" className={'btn-1'} name="Bloquer" value="Répondre" onClick={() => {handleTicket(notification.email, notification.username)}}/>
                    </td>
                </tr>
            )
        }));
    };
    const handleValidate = (id) => {
        Axios.put("http://localhost:3003/api/tickets/updateTicket", {
            id: id
        }).then((res) => {
            window.location.reload();
        });
    };

    const sendMail = () => {
        Axios.post('http://localhost:3003/api/email/send-email-ticket', {email : email, text : content})
            .then((res) => {

                closeModal()
            });
    }

    const handleTicket = (email, user) => {
        setEmail(email)
        setUsername(user)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <MenuVerticalAdmin/>
            <div className={"border_page"}>
                <h1 className={"title_h1"}>Centre de Notifications</h1>
                <div className="sectionTicketsTab tab">
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">The table header</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>User</td>
                            <td>Email</td>
                            <td>Text</td>
                            <td>State</td>
                            <td>Actions</td>
                        </tr>
                        {tableNotification()}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="annoncement"
            >
                <p>Répondre à : {username}</p>
                <form onSubmit={sendMail}>
            <textarea id="text_ticket" name="text_ticket" rows="4" cols="50" placeholder={"Entrez votre message ..."}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}/>
                    <input type="submit" value="Envoyer"/>
                </form>
            </Modal>

        </div>
    )
}

export default AdminNotification;