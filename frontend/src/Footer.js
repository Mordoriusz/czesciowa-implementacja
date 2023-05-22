import { NavLink } from "react-router-dom";
function Footer(){
        return (
        <footer>
            <NavLink to="https://facebook.com" className="socialmedia">
                <img src="fb.png" alt="Logo Facebook" class="smlogo"></img>
            </NavLink>
            <NavLink to="https://twitter.com" className="socialmedia">
                <img src="tw.png" alt="Logo Twitter" class="smlogo"></img>
            </NavLink>
            <NavLink to="https://instagram.com" className="socialmedia">
                <img src="insta.png" alt="Logo Instagram" class="smlogo"></img>
            </NavLink>
            <p>© Kacper Bartosiak 2023</p>
            <NavLink to="./login">
                Logowanie dla pracowników
            </NavLink>
        </footer>
        )
}
export default Footer;