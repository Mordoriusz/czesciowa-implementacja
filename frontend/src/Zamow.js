import * as $ from 'jquery';
import Cookies from 'js-cookie';
async function WyslijFormularz(){
    let url="http://localhost/conn.php";
    let formdata = new FormData(document.getElementById("formzam"));
    if(Cookies.get("koszyk")!=undefined){
        await $.ajax({
            url: url, 
            type: "POST",
            data: {
                co: "zamow",
                Imie: formdata.get("Imie"),
                Nazwisko: formdata.get("Nazwisko"),
                Ulica: formdata.get("Ulica"),
                NrDomu: formdata.get("NrDomu"),
                NrMieszkania: formdata.get("NrMieszkania"),
                Miasto: formdata.get("Miasto"),
                NrTelefonu: formdata.get("NrTelefonu"),
                CzasDostarczeniaZamowienia: formdata.get("CzasDostarczeniaZamowienia"),
                Koszyk: Cookies.get("koszyk")
            },
            success:function(wynik){
                alert(wynik);
            },
            error: function(message){
            } 
        });
    }
    Cookies.remove("koszyk");
    window.location.href("http://localhost:3000/")
}
function Zamow() {
    return <div>
        <p className="naglowek"><b>Finalizacja zamówienia</b></p>
        <form className="form" id="formzam" name="orderform">
            <p><label htmlFor="Imie">Imię</label><br/>
            <input type="text" name="Imie" placeholder="Wpisz imię..." required></input></p>
            <p><label htmlFor="Nazwisko">Nazwisko</label><br/>
            <input type="text" name="Nazwisko" placeholder="Wpisz nazwisko..." required></input></p>
            <p><label htmlFor="Ulica">Ulica</label><br/>
            <input type="text" name="Ulica" placeholder="Wpisz ulicę..." required></input></p>
            <p><label htmlFor="NrDomu">Numer domu</label><br/>
            <input type="number" name="NrDomu" placeholder="Wpisz numer domu..." min={1} required></input></p>
            <p><label htmlFor="NrMieszkania">Nr mieszkania (opcjonalnie)</label><br/>
            <input type="number" name="NrMieszkania" min={1}></input></p>
            <p><label htmlFor="Miasto">Miejscowość</label><br/>
            <input type="text" name="Miasto" placeholder="Wpisz miejscowość..." required></input></p>
            <p><label htmlFor="NrTelefonu">Numer telefonu</label><br/>
            <input type="text" name="NrTelefonu" placeholder="Wpisz numer telefonu..." required></input></p>
            <p><label htmlFor="CzasDostarczeniaZamowienia">Data i czas dostawy</label><br/>
            <input type="datetime-local" name="CzasDostarczeniaZamowienia" placeholder="Wpisz ..." required min={new Date()}></input></p>
            <input type="button" name="submit" onClick={()=>WyslijFormularz()} value="Złóż zamówienie" className="dodaj"></input>
        </form>
    </div>;
}

export default Zamow;
