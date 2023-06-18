import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import react, {useEffect} from "react";
import Axios from "axios";

const AdminViewComments = () => {

    let [userComment, setUserComment] = react.useState([])

    useEffect(() => {
        Axios.get("http://localhost:3003/api/comment/getAllComments")
            .then((res) => {

                setUserComment(res.data.data)
            })
    }, [])

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
                        <input type="button" className={"btn-1"} name="Bloquer" value="Bloquer" onClick={""}/>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <MenuVerticalAdmin/>
            <div className={'border_page'}>
                <h1 className={"title_h1"}>Admin View Comments</h1>
                <div className="sectionCommentsTab tab">
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

export default AdminViewComments;