import { NavLink } from "react-router-dom";
function Footer(){
        return (
        <footer>
            <div id="smtag">
            <NavLink to="https://facebook.com" className="socialmedia">
                <img src="fb.png" alt="Logo Facebook" className="smlogo"></img>
            </NavLink>
            <NavLink to="https://twitter.com" className="socialmedia">
                <img src="tw.png" alt="Logo Twitter" className="smlogo"></img>
            </NavLink>
            <NavLink to="https://instagram.com" className="socialmedia">
                <img src="insta.png" alt="Logo Instagram" className="smlogo"></img>
            </NavLink>
            </div>
            <p className="copyright">© Kacper Bartosiak 2023</p>
            <NavLink to="./login" className="pracownicy">
                Logowanie dla pracowników
            </NavLink>
        </footer>
        )
}
export default Footer;