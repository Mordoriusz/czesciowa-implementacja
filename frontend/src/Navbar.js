import { NavLink } from "react-router-dom";
function Navbar(){
        return (
        <nav>
            <NavLink to="/" id="logolink" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                <img src="/logo.png" alt="Logo strony" id='logo'></img>
            </NavLink>
            <NavLink to="./menu" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                Menu
            </NavLink>
            <NavLink to="./onas" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                O nas
            </NavLink>
            <NavLink to="./kontakt" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                Kontakt
            </NavLink>
            <NavLink to="./koszyk"  id='koszyklink' className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
            <img src="/koszyk.png" alt="Koszyk" id='koszyk'></img>
            </NavLink>
        </nav>
        )
}
export default Navbar;