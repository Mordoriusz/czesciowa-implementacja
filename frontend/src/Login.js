import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Redirect(setIsSubmit){


}
function Login() {
  let [isSubmit, setIsSubmit] = useState(false);
    return <div>
      <p className="naglowek"><b>Logowanie</b></p>
      <form className="form" onSubmit={Redirect(setIsSubmit)} name="loginform">
        <p><label htmlFor="Login">Login</label><br/>
        <input type="text" name="Login" placeholder="Wpisz login..." required></input></p>
        <p><label htmlFor="Haslo">Hasło</label><br/>
        <input type="password" name="Haslo" placeholder="Wpisz hasło..." required></input></p>
        <input type="submit" name="submit" className="dodaj" value="Zaloguj się"></input>
        <Link to='/pracownik' className="dodaj">bypass</Link>
      </form>
    </div>;
  
}
export default Login;
