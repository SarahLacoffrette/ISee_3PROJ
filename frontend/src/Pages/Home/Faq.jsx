import React, {useEffect} from "react";
import MenuVerticalSimple from "../../Components/Navigation/MenuVerticalSimple";
import Axios from "axios";
import MenuVerticalAdmin from "../../Components/Navigation/MenuVerticalAdmin";
import MenuVerticalUser from "../../Components/Navigation/MenuVertical";
import Cookies from "universal-cookie";

const Faq = () => {

    const cookies = new Cookies();
    let [id, setId] = React.useState("")
    let [role, setRole] = React.useState("")
    let [navBar, setNavBar] = React.useState("")

    useEffect(() => {
        if(cookies.get('token') === undefined){
            setNavBar(<MenuVerticalSimple/>)
        }else{
            const token = cookies.get('token');
            cookies.set('token', token, { path: '/' });
            console.log(cookies.get('token'));
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
    return (
        <div>
            {navBar}
            <div className={'border_page'}>
                <h1 className={'title_h1'}>FAQ</h1><br/><br/>
                <h3 className={'title_h2'}>Comment puis-je créer un compte sur le site vidéo ?</h3>
                <p className={'text'}>Pour créer un compte sur notre site vidéo, cliquez sur le bouton "S'inscrire" situé en haut à droite de la page d'accueil. Remplissez le formulaire d'inscription avec vos informations personnelles et choisissez un nom d'utilisateur et un mot de passe. Une fois le formulaire soumis, vous serez enregistré en tant qu'utilisateur du site vidéo.</p>
                <br/><br/>
                <h3 className={'title_h2'}>Comment puis-je télécharger une vidéo sur le site ?</h3>
                <p className={'text'}> Pour télécharger une vidéo sur notre site, connectez-vous à votre compte, puis accédez à la section "Télécharger une vidéo". Cliquez sur le bouton "Choisir un fichier" pour sélectionner la vidéo que vous souhaitez télécharger depuis votre ordinateur. Une fois le fichier sélectionné, cliquez sur le bouton "Télécharger" pour démarrer le téléchargement de la vidéo.</p>
                <br/><br/>
                <h3 className={'title_h2'}>Comment puis-je rechercher des vidéos spécifiques sur le site ?</h3>
                <p className={'text'}>Utilisez la barre de recherche située en haut de la page d'accueil pour rechercher des vidéos spécifiques. Entrez des mots-clés ou des termes de recherche pertinents, puis appuyez sur la touche "Entrée" ou cliquez sur l'icône de recherche. Les résultats de la recherche afficheront les vidéos correspondantes à vos critères de recherche.</p>
                <br/><br/>
                <h3 className={'title_h2'}>Comment puis-je modifier les paramètres de confidentialité de mes vidéos ?</h3>
                <p className={'text'}>Connectez-vous à votre compte, puis accédez à la section "Mes vidéos". Sélectionnez la vidéo dont vous souhaitez modifier les paramètres de confidentialité, puis cliquez sur le bouton "Modifier". Dans la fenêtre de modification, vous pourrez définir les paramètres de confidentialité de la vidéo, tels que public, privé ou restreint à un certain groupe d'utilisateurs.</p>
                <br/><br/>
                <h3 className={'title_h2'}>Comment puis-je contacter l'assistance technique du site vidéo ?</h3>
                <p className={'text'}>Si vous avez des problèmes techniques ou des questions concernant notre site vidéo, vous pouvez nous contacter en utilisant le formulaire de contact disponible sur notre page "Contactez-nous". Remplissez le formulaire avec vos informations de contact et décrivez votre problème ou votre question en détail. Nous vous répondrons dans les plus brefs délais.</p>
            </div>
        </div>
    )
}

export default Faq;