import Axios from 'axios'
import Cookies from 'universal-cookie';
import {useEffect} from "react";
import MenuVerticalSimple from "../../Components/Navigation/MenuVerticalSimple";
const react = require('react')

const Login = () => {

    const [email, setEmail] = react.useState("")
    const [password, setPassword] = react.useState("")

    const cookies = new Cookies();
    useEffect(() => {
        if(cookies.get('token') !== undefined){
            window.location.replace("/")
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3003/api/user/login", {email: email, password: password})
            .then((res) => {

            const cookies = new Cookies();
            cookies.set('token', res.data.token, { path: '/' });
            cookies.set('id_user', res.data.id_user, { path: '/' });
            window.location.replace("/");
        })
        .catch((err) => {
            alert("Email ou mot de passe incorrect");
        })
    }

    return(
        <div>
            <MenuVerticalSimple/>
            <div className={"border_page section_center_lr"}>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label className={"title_h2"}>email :</label><br/>
                        <input type="text" name="email" className={"small_field"}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        /><br/><br/>
                        <label className={"title_h2"}>Mot de passe :</label><br/>
                        <input type="password" name="email"  className={"small_field"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <br/><br/><br/>
                        <input className={'btn-1 btn-center'} type="submit" name="submit"/><br/>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login