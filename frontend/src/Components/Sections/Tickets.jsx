import React from "react";
import Axios from "axios";
import Modal from "react-modal";

const Tickets = (props) => {

    const [content, setContent] = React.useState("")
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const handleTicket = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3003/api/tickets/createTicket", {
            id_user : props.id_user,
            username: props.username,
            email: props.email,
            text : content
        }).then((res) => {

                setIsOpen(true);
        })
    }
    const closeModal = () => {
        setIsOpen(false);
        window.location.replace("/");
    }

    return(
        <div className="sectionTickets">
        <h2>Tickets</h2>
            <p>Nos équipes tenterons de vous répondre dans les plus bref délais</p>
            <form onSubmit={handleTicket}>
            <textarea id="text_ticket" name="text_ticket" rows="4" cols="50" placeholder={"Entrez votre message ..."}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}/>
            <input type="submit" value="Envoyer"/>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="annoncement"
                >
                <h2>Votre demande a bien été envoyé à nos équipe !</h2>
                <input type="button" name="close" value="Fermer" onClick={closeModal}/>
            </Modal>
        </div>
    )
}

export default Tickets