import logo from '../Asset/logo.png'

import "./Style/Style.css"
const Logo = () => {
    const handleBack = () => {
        window.location.replace("/");
    }
    return (
        <div>
            <img className={'img_logo'} src={logo} alt={"logo"} onClick={handleBack}/>
        </div>
    )
}

export default Logo