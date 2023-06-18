import Axios from 'axios'
import react, {useEffect, useState} from 'react';
import emailjs from '@emailjs/browser';
import Cookies from "universal-cookie";
import MenuVerticalSimple from "../../Components/Navigation/MenuVerticalSimple";

const Register = () => {
    const [firstname, setFirstname] = react.useState("")
    const [lastname, setLastname] = react.useState("")
    const [email, setEmail] = react.useState("")
    const [password, setPassword] = react.useState("")
    const [password2, setPassword2] = react.useState("")
    const [username, setUsername] = react.useState("")
    const [age, setAge] = react.useState("")
    const [gender, setGender] = react.useState("")
    let token;
    let id_user;
    let success;

    const cookies = new Cookies();
    useEffect(() => {
        if(cookies.get('token') !== undefined){
            window.location.replace("/")
        }
    }, []);

        const handleSubmit = async (event) => {
            event.preventDefault();
            if (password !== password2) {
                console.log("passwords don't match")
            } else {
                try {
                    await Axios.post("http://localhost:3003/api/user/searchUserAllReadyExist", {
                        email: email
                    }).then((res) => {
                        success = res.data.success;
                    })
                    if(!success){
                        await Axios.post("http://localhost:3003/api/user", {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            password: password,
                            username: username,
                            age: age,
                            gender: gender
                        }).then((res) => {
                            console.log(res)
                        })
                        await Axios.post("http://localhost:3003/api/user/getUserId", {
                            email : email
                        }).then((res) => {
                            id_user = res.data.id_user;
                        })
                        await Axios.post("http://localhost:3003/api/email/createRequest", {
                            id_user : id_user
                        }).then((res) => {
                            token = res.data.token;
                        })
                        await Axios.post('http://localhost:3003/api/email/send-email', {email, token});
                        alert('Email de confirmation envoyé !');
                        window.location.href = "/login";
                    } else {
                        alert('Email déjà utilisé !');
                    }
                } catch (error) {
                    console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
                    alert('Erreur lors de l\'envoi de l\'e-mail');
                }
            }
        }
    return(
        <div>
            <MenuVerticalSimple/>
            <div className={"border_page section_center_lr"}>
                <div className={"section_register"}>
                    <form onSubmit={handleSubmit}>
                        <div >
                            <label className={"title_h2"}>Prénom :</label><br/>
                            <input className={"small_field"} type="text" name="email"
                                   value={firstname}
                                   onChange={(e) => setFirstname(e.target.value)}
                            /><br/>

                            <label className={"title_h2"}>Nom :</label><br/>
                            <input className={"small_field"} type="text" name="email"
                                   value={lastname}
                                   onChange={(e) => setLastname(e.target.value)}
                            /><br/>

                            <label className={"title_h2"}>email :</label><br/>
                            <input className={"small_field"} type="text" name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            /><br/>

                            <label className={"title_h2"}>Mot de passe :</label><br/>
                            <input className={"small_field"} type="password" name="email"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            /><br/>

                        </div>
                        <div className={"section_register"}>
                            <label className={"title_h2"}>Confirmer le mot de passe :</label><br/>
                            <input className={"small_field"} type="password" name="email"
                                   value={password2}
                                   onChange={(e) => setPassword2(e.target.value)}
                            /><br/>

                            <label className={"title_h2"}>Pseudo :</label><br/>
                            <input className={"small_field"} type="text" name="email"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                            /><br/>

                            <label className={"title_h2"}>Age :</label><br/>
                            <input className={"small_field"} type="number" name="email"
                                   value={age}
                                   onChange={(e) => setAge(e.target.value)}
                            /><br/>

                            <label className={"title_h2"}>Genre :</label><br/>
                            <select className={"small_field"} name="genders" id="gender-select" value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                <option value="">--Choisir un genre--</option>
                                <option value="men">Homme</option>
                                <option value="women">Femme</option>
                                <option value="notDefined">Non défini</option>
                            </select>
                            <br/><br/>
                        </div>


                        <input className={"btn-1"} type="submit" name="submit"/><br/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register