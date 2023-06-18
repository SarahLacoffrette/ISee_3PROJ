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
import VideosGrid from "../../Components/Video/VideosGrid";
import Recommandation from "../../Components/Sections/Recommandation";


const UserHomePage = () => {

    const queryParameters = new URLSearchParams(window.location.search);
    const queryId = queryParameters.get("id");
    const queryPage = queryParameters.get("page");
    const cookies = new Cookies();
    const [page, setPage] = useState(0);
    let [id, setId] = react.useState("")
    let [role, setRole] = react.useState("")
    let [navBar, setNavBar] = react.useState("")

    useEffect(() => {
        const queryPage = queryParameters.get("page");
        setPage(parseInt(queryPage));
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

    return(
        <div className={"page_userHome"}>
            {navBar}
            <MenuChanel state={true} id={queryId}/>
            <div className={"border_page"} >
                <div className="section_home_userPage" style={{ display: page === 0 ? "block" : "none" }}>
                    <PreviewPage id={queryId} />
                </div>
                <div className="section_video_userPage" style={{ display: page === 1 ? "block" : "none" }}>
                    <VideosGrid/>
                </div>
                <div className="section_about_userPage" style={{ display: page === 2 ? "block" : "none" }}>
                    <h1 className={"title_h1"}>Cette page n'est pas encore disponible ...</h1>
                </div>
                <div className="section_recommendation_userPage" style={{ display: page === 3 ? "block" : "none" }}>
                    <Recommandation/>
                </div>
            </div>

        </div>
    )
}

export default UserHomePage;