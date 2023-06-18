import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import react, {useEffect} from "react";
import Axios from "axios";
import axios from "axios";

const AdminViewVideos = () => {

    let [userVideo, setUserVideo] = react.useState([])
    let [userComment, setUserComment] = react.useState([])

    useEffect(() => {
        Axios.get("http://localhost:3003/api/video/getAllVideosAllState")
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

    const blockVideo = (id_video) => {
        Axios.put("http://localhost:3003/api/video/changeStateVideo", {
            id: id_video, state: 0
        }).then((res) => {
            console.log(res.data.data);
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
                        <input type="button" className={"btn-1"} name="Bloquer" value="Bloquer" onClick={() => blockVideo(video.id)}/>
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
                        <input type="button" className={"btn-1"} name="Bloquer" value="Supprimer" onClick={() => handleDeleteComment(comment.id)}/>
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
            <MenuVerticalAdmin/>
            <div className={"border_page"}>
                <h1 className={"title_h1"}>AdminViewVideos</h1>
                <div className="sectionVideosTab tab">
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
                <div className="sectionCommentsTab tab" style={{display: "none"}}>
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
        </div>
    );
}

export default AdminViewVideos;