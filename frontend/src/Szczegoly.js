import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
let dania=[];
function PobierzDania(){
    dania=[];
    for(var i=0;i<7;i++){
        if(i%2==0){
            dania.push(
                <tr className="par" key={i}>
                    <td>Nazwa dania</td>
                    <td>Typ dania</td>
                    <td>Cena</td>
                </tr>
            )
        }else{
            dania.push(
                <tr className="npar" key={i}>
                    <td>Nazwa dania</td>
                    <td>Typ dania</td>
                    <td>Cena</td>
                </tr>
            )
        }
    }
}
function Szczegoly() {
        //pobierz id zeby cos robic
    PobierzDania();
    return <div className="szczegoly">
        <p className="naglowek"><b>Panel pracownika</b></p>
        <table>
            <thead>
                <tr className="nagl">
                    <th>Nazwa dania</th>
                    <th>Typ dania</th>
                    <th>Cena</th>
                </tr>
            </thead>
            <tbody>
                {dania}
            </tbody>
        </table>
        <Link to="/pracownik" className="statusbtn return">Powróć do głównego panelu</Link>
    </div>;
}

export default Szczegoly;
