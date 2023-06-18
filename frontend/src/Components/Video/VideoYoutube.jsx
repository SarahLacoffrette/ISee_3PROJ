import Cookies from "universal-cookie";
import react, {useEffect, useState} from 'react';
import Axios from "axios";
import moment from 'moment';
import "./Video.css";
import ChatRoom from '../../Components/Chat/ChatRoom';
import OffLike from "../../Components/Asset/OffLike.png";
import OnLike from "../../Components/Asset/OnLike.png";
import OnFollow from "../../Components/Asset/OnFollow.png";
import OffFollow from "../../Components/Asset/OffFollow.png";
import NavigationVertical from "./NavigationVertical";

import VideoThumbnail from "./VideoThumbnail";
import {wait} from "@testing-library/user-event/dist/utils";
import Logo from "../Elements/Logo";

const VideoYoutube = (props) => {

    const cookies = new Cookies();
    let [data, setData]= useState([]);
    let content = [];
    let [username, setUsername] = useState();
    let [id, setId] = useState();
    let [comment, setComment] = useState();
    let [role, setRole] = react.useState("")
    let [buttonLike, setButtonLike] = react.useState("");
    let[creator, setCreator] = react.useState("");
    let [buttonFollow, setButtonFollow] = react.useState("");
    let [source, setSource] = react.useState("");
    let [loading, setLoading] = react.useState(false);


    useEffect(() => {

        if(props.source){
            setSource("http://localhost:9000/isee-bucket/" + props.source);
            setLoading(true);
        }


        Axios.post('http://localhost:3003/api/comment/getAllCommentsByVideo', {
            id_video: props.id
        })
            .then((res) => {

                setData(res.data.data);
            })
            .catch((error) => {
                console.log('Erreur lors de la récupération des commentaires :', error);
            });
        Axios.post('http://localhost:3003/api/user/getUserById', {
                id: props.id_user
            }).then((res) => {
                setCreator(res.data.data.username);
            }
        )
        Axios.post("http://localhost:3003/api/like/checkLike", {
            id_video: props.id,
            id_user: id
        }).then((res) => {

            if(res.data.success === true){
                setButtonLike(<button onClick={handleDislike} className={'buttonVideo'}><img src={OnLike} alt="like" /></button>);
            }else{
                setButtonLike(<button onClick={handleLike}  className={'buttonVideo'}><img src={OffLike} alt="like" /></button>);
            }
        }, []);

        Axios.post("http://localhost:3003/api/subscribe/checkSubscribe", {
            id_user: id,
            id_channel: props.id_user
        }).then((res) => {

            if(res.data.success === true){
                setButtonFollow(<button onClick={handleUnfollow}  className={'buttonVideo'}><img src={OnFollow} alt="follow" /></button>);
            }else{
                setButtonFollow(<button onClick={handleFollow}  className={'buttonVideo'}><img src={OffFollow} alt="follow" /></button>);
            }
        });

    }, [props.source, props.id_user, id]);

    data.map((com) => {
        content.push(
            <div className={"comment"}>
                <div className={"comment_header"}>
                    <p className={"comment_username"}>{com.user} : </p>
                    <p className={"comment_date"}>{moment(com.date).format('YYYY-MM-DD')}</p>
                </div>
                <p className={"comment_content"}>{com.text}</p>
            </div>
        );
    })
    const displayComment = () => {
        if(cookies.get('token') === undefined){
            return(
                <div className={"off_comment text"}>
                    <p>Il faut être connecter pour pouvoir laisser un commentaire. Connectez-vous</p>
                </div>
            )
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
            return(
                <div className={"on_comment"}>
                    <form onSubmit={onSubmit}>
                        <input type="text" name="comment" value={comment} placeholder="Ajouter un commentaire" className={'field'} onChange={(e) => setComment(e.target.value)}/>
                        <input type="submit" value="Envoyer" className={'btn-1'}/>
                    </form>
                </div>
            )
        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        const currentDate = new Date();
        Axios.post("http://localhost:3003/api/comment/add", {
            id_user: id,
            user: username,
            id_video: props.id,
            comment: event.target.comment.value
        }).then((res) => {
            window.location.reload();
        } )
    }
    const handleLike = () => {
        Axios.post("http://localhost:3003/api/like/addLike", {
            id_video: props.id,
            id_user: id
        })
        Axios.put("http://localhost:3003/api/video/addLikes", {
            id: props.id
        })
        setButtonLike(<button onClick={handleDislike} className={'buttonVideo'}><img src={OnLike} alt="like" /></button>);
    }

    const handleDislike = () => {
        console.log("dislike");
        Axios.post("http://localhost:3003/api/like/dislike", {
            id_video: props.id,
            id_user: id
        })
        Axios.put("http://localhost:3003/api/video/removeLikes", {
            id: props.id
        })
        setButtonLike(<button onClick={handleLike} className={'buttonVideo'}><img src={OffLike} alt="like" /></button>);
    }

    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                alert('Le lien a été copié avec succès !');
            })
            .catch((error) => {
                console.error('Erreur lors de la copie du lien :', error);
            });
    };

    const handleFollow = () => {
        Axios.post("http://localhost:3003/api/subscribe/addSubscribe", {
            id_user: id,
            id_channel: props.id_user
        })
        Axios.put("http://localhost:3003/api/user/addSubscription", {
            id: props.id_user
        })
        setButtonFollow(<button onClick={handleUnfollow} className={'buttonVideo'}><img src={OnFollow} alt="follow" /></button>);
    }

    const handleUnfollow = () => {
        Axios.delete("http://localhost:3003/api/subscribe/unsubscribe", {
            id_user: id,
            id_channel: props.id_user
        })
        Axios.put("http://localhost:3003/api/user/removeSubscription", {
            id: props.id_user
        })
        setButtonFollow(<button onClick={handleFollow} className={'buttonVideo'}><img src={OffFollow} alt="follow" /></button>);
    }

    const handleUser = () => {
        window.location.replace("/user?id=" + props.id_user + "&page=0");
    }

    const handleBack = () => {
        window.location.replace("/");
    }

    return (
        <div >
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div>
                <Logo/>
            </div>
            <br/>
            <div className={'page_video'}>
                <div className={"section_video"}>
                    {loading ? <video controls autoPlay className={"video"}>
                        <source src={source} type="video/mp4"/>
                    </video> : <> </>}

                    <br/>
                    <h1 className={"title_video title_h1"}>{props.title}</h1>
                    <div className={"section_underVideo"}>
                        <div className={"group_left_underVideo"} onClick={handleUser}>
                            <div className={"smallImage_user"}>
                                <img className={"smallImage_user_chanel"} src={"http://localhost:9000/isee-bucket/" + props.image} alt={""}/>
                            </div>
                            <div className={"text_creator"}>
                                <span>{creator}</span>
                            </div>
                        </div>
                        <div className={"group_right_undervideo"}>
                            {buttonLike}
                            {buttonFollow}
                            <button onClick={handleShare} className={'buttonVideo share'}><span className="material-symbols-outlined" >share</span></button>
                        </div>
                    </div>
                    <div className={"section_description"}>
                        <p className={'text'}>{props.description}</p>
                    </div>
                    <div className={"section_addComment"}>
                        <h2 className={'title_h2'}>Commentaires : </h2>
                        {displayComment()}
                    </div>
                    <div className={"sections_allComments"}>
                        {content}
                    </div>
                </div>
                <div className={"section_video_right"}>
                    <div className={"section_liveChat"}>
                        <ChatRoom id={props.id} user={username}/>
                    </div>
                    <NavigationVertical id_user={props.id_user}/>
                </div>
            </div>

        </div>

    )
}

export default VideoYoutube;