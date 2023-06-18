import react, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import Axios from "axios";
import React from "react";

const ModifyUserByAdmin = (props) => {

    const cookies = new Cookies();
    let [id, setId] = react.useState("")
    const [firstname, setFirstname] = react.useState("")
    const [lastname, setLastname] = react.useState("")
    const [email, setEmail] = react.useState("")
    const [password, setPassword] = react.useState("")
    const [username, setUsername] = react.useState("")
    const [age, setAge] = react.useState("")
    const [role, setRole] = react.useState("")

    const token = cookies.get('token');


    useEffect(( ) => {

        const getData = async () => {
            await Axios.post("http://localhost:3003/api/user/getCookie", {
                token
            }).then((res) => {

                setId(res.data.data.id);
                id = res.data.data.id;

            })
            await Axios.post("http://localhost:3003/api/user/getUserById", {
               id:  props.id
            }).then((res) => {

                setFirstname(res.data.data.firstname);
                setLastname(res.data.data.lastname);
                setEmail(res.data.data.email);
                setPassword(res.data.data.password);
                setUsername(res.data.data.username);
                setAge(res.data.data.age);
                setRole(res.data.data.role);
            })
        }
        getData();
    }, []);

    const handleModify = async (event) => {
        event.preventDefault();
        try {
             await Axios.put("http://localhost:3003/api/user/updateUser", {
                 firstname: firstname,
                 lastname: lastname,
                 email: email,
                 password: password,
                 username: username,
                 age: age,
                 id: props.id,
                 role: role
             }).then((res) => {
                 console.log(res)
             })
            window.location.replace("/user");
         } catch (error) {
             console.log(error)
         }
    }

    return (
        <div>
            <h1>Modify User</h1>
            <form onSubmit={handleModify}>
                <label>Prénom :</label><br/>
                <input type="text" name="email"
                       value={firstname}
                       onChange={(e) => setFirstname(e.target.value)}
                /><br/>

                <label>Nom :</label><br/>
                <input type="text" name="email"
                       value={lastname}
                       onChange={(e) => setLastname(e.target.value)}
                /><br/>

                <label>email :</label><br/>
                <input type="text" name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                /><br/>

                <label>Mot de passe :</label><br/>
                <input type="text" name="email"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                /><br/>

                <label>Pseudo :</label><br/>
                <input type="text" name="email"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                /><br/>

                <label>Age :</label><br/>
                <input type="number" name="email"
                       value={age}
                       onChange={(e) => setAge(e.target.value)}
                /><br/>
                <label>Rôle :</label><br/>
                <select name="role" id="role-select" value={role}
                        onChange={(e) => setRole(e.target.value)}>
                    <option value="0">User</option>
                    <option value="1">Createur</option>
                    <option value="2">Administrateur</option>
                    <option value="3">Banni</option>
                </select>
                <br/>
                <input type="submit" name="submit"/><br/>
            </form>
        </div>
    )
}

export default ModifyUserByAdmin