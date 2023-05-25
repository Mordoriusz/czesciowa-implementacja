import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
let zam=[];
function PobierzZamowienia(){
    zam=[];
    for(var i=0;i<7;i++){
        if(i%2==0){
            zam.push(
                <tr className="par" key={i}>
                    <td>Nr</td>
                    <td>Imię i nazwisko</td>
                    <td>Data złożenia</td>
                    <td>Data dostarczenia</td>
                    <td>Dane kontaktowe</td>
                    <td>Status</td>
                    <td>Dostawca</td>
                    <td><Link to='/szczegoly' className="statusbtn">Zawartość zamówienia</Link></td>
                    <td>Cena</td>
                </tr>
            )
        }else{
            zam.push(
                <tr className="npar" key={i}>
                    <td>Nr</td>
                    <td>Imię i nazwisko</td>
                    <td>Data złożenia</td>
                    <td>Data dostarczenia</td>
                    <td>Dane kontaktowe</td>
                    <td className="status">Status NZ<br/><br/>
                        <Link to='/status' className="statusbtn">Ustaw status</Link>
                    </td>
                    <td>Dostawcy brak<br/><br/>
                        <Link to='/dostawca' className="statusbtn">Przypisz dostawcę</Link>
                    </td>
                    <td><Link to='/szczegoly' className="statusbtn">Zawartość zamówienia</Link></td>
                    <td>Cena</td>
                </tr>
            )
        }
    }
}
function Pracownik() {
    PobierzZamowienia();
    return <div className="pracownik">
        <p className="naglowek"><b>Panel pracownika</b></p>
        <form name="lista" id="lista">
            <input type="radio" name="wszystkie" value={1} onClick={PobierzZamowienia}></input><label htmlFor={1}>Wszystkie zamówienia</label><br />
            <input type="radio" name="wszystkie" value={0} checked></input><label htmlFor={0}>Niezrealizowane zamówienia</label>
        </form>
        <table>
            <thead>
                <tr className="nagl">
                    <th>Nr</th>
                    <th>Imię i nazwisko</th>
                    <th>Data złożenia</th>
                    <th>Data dostarczenia</th>
                    <th>Dane kontaktowe</th>
                    <th>Status</th>
                    <th>Dostawca</th>
                    <th>Zawartość</th>
                    <th>Cena</th>
                </tr>
            </thead>
            <tbody>
                {zam}
            </tbody>
        </table>
    </div>;
}

export default Pracownik;
