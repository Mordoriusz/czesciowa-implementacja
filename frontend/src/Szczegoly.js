import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as $ from 'jquery';
let dania=[];
async function PobierzDania(setLoaded){
    let idnr = useLocation().state.id;
    dania=[];
    let adres = "http://localhost/conn.php";
    let wynik;
    await $.ajax({
        url: adres,
        type: "POST",
        data: {
        co: "zamowienie",
        id:idnr,
        },
        success: (response)=>{
            wynik=JSON.parse(response);
        }

    }); 
    for(let i=0; i<wynik.length; i++){
        let wpis = wynik[i];
        if(i%2==0){
            dania.push(
                <tr className="par" id={wynik[i].Id} key={i}>
                    <td>{wpis.NazwaDania}</td>
                    <td>{wpis.NazwaKategorii}</td>
                    <td>{wpis.Cena}</td>
                </tr> 
            );
        }
        else{
            dania.push(
                <tr className="npar" id={wynik[i].Id} key={i}>
                    <td>{wpis.NazwaDania}</td>
                    <td>{wpis.NazwaKategorii}</td>
                    <td>{wpis.Cena}</td>
                </tr>
            );
        }
    }   
    setLoaded(true);
}
function Szczegoly() {
    let [loaded, setLoaded] = useState(false);
    if(!loaded){
        PobierzDania(setLoaded);
        return (<p>Ładowanie...</p>);
    }
    return <div className="szczegoly">
        <p className="naglowek"><b>Szczegóły zamówienia</b></p>
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
