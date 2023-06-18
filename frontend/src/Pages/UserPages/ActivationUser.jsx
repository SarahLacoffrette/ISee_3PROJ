import Axios from "axios";

const ActivationUser = () => {

    const queryParameters = new URLSearchParams(window.location.search);
    const token =  queryParameters.get("token");



    Axios.put("http://localhost:3003/api/email/validateEmail", {
        token: token
    }).then((res) => {
        console.log(res)
    })


    return (
        <div>
            <h1>ActivationUser</h1>
            <p>Votre compte est activé</p>
        </div>
    )
}

export default ActivationUser