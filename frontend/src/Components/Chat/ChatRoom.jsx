import useChat from "../../Pages/Brouillon/useChat";
import React, {useEffect} from "react";
import './chat.css';

const ChatRoom = (props) => {
    const { roomId } = props.id; // Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

    useEffect(() => {
        if(props.user !== undefined){
            document.getElementsByClassName("section_input")[0].style.display = "block";
        }
    }   , [props.user]);

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(props.user +" : " + newMessage);
        setNewMessage("");
    };

    return (
        <div className="chat-room-container">
            <h1 className="room-name title_h1">Live Chat: {roomId}</h1>
            <div className="messages-container">
                <ul className="messages-list">
                    {messages.map((message, i) => (
                        <li
                            key={i}
                            className={`message-item ${
                                message.ownedByCurrentUser ? "my-message" : "received-message"
                            }`}
                        >
                            {message.body}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"section_input"}  style={{display: "none"}}>
                <div className="input-container">
                <textarea
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write message..."
                    className="new-message-input-field"
                />
                    <button onClick={handleSendMessage} className="send-message-button">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;