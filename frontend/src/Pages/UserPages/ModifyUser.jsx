import react, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import Axios from "axios";
import React from "react";
import axios from "axios";

const ModifyUser = () => {

    const cookies = new Cookies();
    let [id, setId] = react.useState("")
    const [firstname, setFirstname] = react.useState("")
    const [lastname, setLastname] = react.useState("")
    const [email, setEmail] = react.useState("")
    const [password, setPassword] = react.useState("")
    const [username, setUsername] = react.useState("")
    const [age, setAge] = react.useState("")
    const [role, setRole] = react.useState("")
    const [imageUrl, setImageUrl] = useState(null);

    const token = cookies.get('token');
    const id_user = cookies.get('id_user');




    useEffect(( ) => {

        const getData = async () => {
            await Axios.post("http://localhost:3003/api/user/getCookie", {
                token
            }).then((res) => {
                setId(res.data.data.id);
                id = res.data.data.id;

            })
            await Axios.post("http://localhost:3003/api/user/getUserById", {
                id
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

    const handleUploadCloudImage = async () => {
        try {
            const formData = new FormData();
            formData.append("file", imageUrl);
            await axios.post("http://localhost:3003/api/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleFileChangeImage = (event) => {
        setImageUrl(event.target.files[0]);
    };

    const handleModify = async (event) => {
        event.preventDefault();
        await handleUploadCloudImage();
        try {
             await Axios.put("http://localhost:3003/api/user/updateUser", {
                 firstname: firstname,
                 lastname: lastname,
                 email: email,
                 password: password,
                 username: username,
                 age: age,
                 id: id_user,
                 picture: imageUrl.name,
                 role: role
             }).then((res) => {
                 console.log(res)
             })
            window.location.replace("/");
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

                <label>Upload la miniature :</label><br/>
                <input type="file" name="videoPicture" onChange={handleFileChangeImage}/><br/>
                <br/>
                <input type="submit" name="submit"/><br/>
            </form>
        </div>
    )
}

export default ModifyUser