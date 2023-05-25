
function Zamow() {
    return <div className="formularz">
        <p className="naglowek"><b>Finalizacja zamówienia</b></p>
        <form className="form" name="orderform">
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
            <input type="submit" name="submit" value="Złóż zamówienie" className="dodaj"></input>
        </form>
    </div>;
}

export default Zamow;
