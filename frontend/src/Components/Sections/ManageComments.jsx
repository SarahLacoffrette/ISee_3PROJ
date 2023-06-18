import react, {useEffect} from "react";
import Axios from "axios";
import MenuVerticalAdmin from "../Navigation/MenuVerticalAdmin";

const ManageComment = (props) => {
    let [userVideo, setUserVideo] = react.useState([])
    let [userComment, setUserComment] = react.useState([])

    useEffect(() => {
        Axios.post("http://localhost:3003/api/video/getVideoByUser", {
                id_user : props.id_user
            })
            .then((res) => {

                setUserVideo(res.data.data)
            })
    }, [])

    const showComments = (id_video) => {
        document.getElementsByClassName("sectionCommentsTab")[0].style.display = "block";
        Axios.post("http://localhost:3003/api/comment/getAllCommentsByVideo", {
            id_video
        }).then((res) => {
            setUserComment(res.data.data);
        });
    }


    const deleteVideo = (id_video) => {
        Axios.delete("http://localhost:3003/api/video/deleteVideo/" + id_video)
            .then((res) => {
                window.reload();
            });
    }



    const tableVideo = () => {
        return userVideo.map((video, i) => {
            return (
                <tr key={i}>
                    <td onClick={() => showComments(video.id)}>X</td>
                    <td>{video.id}</td>
                    <td>{video.title}</td>
                    <td>{video.state}</td>
                    <td>{video.view}</td>
                    <td>{video.likes}</td>
                    <td>
                        <input type="button" name="Bloquer" value="Supprimer" onClick={() => deleteVideo(video.id)}/>
                    </td>
                </tr>
            )
        })
    }

    const tableComment = () => {
        return userComment.map((comment, i) => {
            return (
                <tr key={i}>
                    <td>{comment.id}</td>
                    <td>{comment.id_video}</td>
                    <td>{comment.user}</td>
                    <td>{comment.text}</td>
                    <td>{comment.state}</td>
                    <td>
                        <input type="button" name="Bloquer" value="Supprimer" onClick={() => handleDeleteComment(comment.id)}/>
                    </td>
                </tr>
            )
        })
    }

    const handleDeleteComment = (id) => {
        Axios.put('http://localhost:3003/api/comment/deleteComment',
            {
                id: id
            })
            .then((res) => {
                console.log(res);
            })
        window.reload();
    }

    return (
        <div>


                <h1 className={"title_h1"}>Vos Vidéos</h1>
                <div className="sectionVideosTab">
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">The table header</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
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

                {
                    //HIDE
                }
                <div className="sectionCommentsTab" style={{display: "none"}}>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">The table header</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>videoId</td>
                            <td>User</td>
                            <td>Text</td>
                            <td>State</td>
                            <td>Actions</td>
                        </tr>
                        {tableComment()}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default ManageComment