import './Style/Style.css'
import Divider from '../Divider/Divider'
import Logo from "../Elements/Logo";

const MenuVertical = () => {

    const handleHome = () => {
        window.location.replace("/");
    }

    const handleLogin = () => {
        window.location.replace("/login");
    }

    const handleRegister = () => {
        window.location.replace("/register");
    }

    const handleHelp = () => {
        window.location.replace("/faq");
    }

        // POP UP MODAL



    return (
        <div className="verticalMenu">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className={"section_logo_verticalMenu"}>
                <Logo/>
            </div>
            <ul className={"ul_verticalMenu section_top_verticalMenu"}>
                <li className={"li_verticalMenu"} onClick={handleHome}><span className="material-symbols-outlined">home</span>Home</li>
                <li className={"li_verticalMenu"} onClick={handleRegister}><span className="material-symbols-outlined">stylus_note</span>Inscription</li>
                <li className={"li_verticalMenu"} onClick={handleLogin}><span className="material-symbols-outlined">account_circle</span>Connexion</li>
            </ul>
            <Divider/>
            <ul className={"ul_verticalMenu section_middle_verticalMenu"}>
            </ul>
            <Divider/>
            <ul className={"ul_verticalMenu section_bottom_verticalMenu"}>
                <li className={"li_verticalMenu"} onClick={handleHelp}><span className="material-symbols-outlined">help</span>FAQ</li>
                <li className={"li_verticalMenu"}><span className="material-symbols-outlined">support</span>Support</li>
            </ul>


            {/* POP UP */}


        </div>
    )

}

export default MenuVertical;