import * as $ from 'jquery';
async function Zaloguj(){
  let passy = new FormData(document.getElementById("formlogin"));
  let url="http://localhost/conn.php";
  await $.ajax({
    url: url, 
    type: "POST",
    data: {
        co: "login",
        login: passy.get("Login"),
        haslo: passy.get("Haslo")
    },
    success:function(wynik){
      wynik = wynik.substring(2);
        if(wynik=="Nie ma takiego użytkownika"||wynik=="Niewłaściwe hasło"){
          alert(wynik);
        }
        else{
          alert("Zalogowano jako "+wynik);
          window.location.href="http://localhost:3000/pracownik"
        }
    },
    error: function(message){
    } 
});
}
function Login() {
    return <div>
      <p className="naglowek"><b>Logowanie</b></p>
      <form className="form" id="formlogin" name="loginform">
        <p><label htmlFor="Login">Login</label><br/>
        <input type="text" name="Login"  placeholder="Wpisz login..." required></input></p>
        <p><label htmlFor="Haslo">Hasło</label><br/>
        <input type="password" name="Haslo" placeholder="Wpisz hasło..." required></input></p>
        <input type="button" name="submit" onClick={()=>Zaloguj()} className="dodaj" value="Zaloguj się"></input>
      </form>
    </div>;
  
}
export default Login;
