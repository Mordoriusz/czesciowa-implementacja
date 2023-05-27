import { Link } from "react-router-dom";
import { useState } from "react";
import * as $ from 'jquery';
let zam=[];

function Zmien(setLoaded, setIfAll, all, czywszystkie){
    setIfAll(czywszystkie);
    setLoaded(false);
}
async function PobierzZamowienia(setLoaded, all){
    let adres = "http://localhost/conn.php";
    let wynik;
    if(all){
        await $.ajax({
            url: adres,
            type: "POST",
            data: {
                co: "zamowienia",
                all: 1
            },
            success: (response)=>{
                wynik=JSON.parse(response);
            }
        }); 
    }
    else{
        await $.ajax({
            url: adres,
            type: "POST",
            data: {
                co: "zamowienia",
                all: 0
            },
            success: (response)=>{
                wynik=JSON.parse(response);
            }
        }); 
    }
    zam=[];
    for(var i=0;i<wynik.length;i++){
        let dostawca;
        let status;
        let wpis = wynik[i];
        if(wpis.NrMieszkania == null || wpis.NrMieszkania == undefined || wpis.NrMieszkania == 0){
            wpis.NrMieszkania="";
        }else{
            wpis.NrMieszkania= " m. "+wpis.NrMieszkania;
        }
        if(wpis.IdDostawcy==null || wpis.IdDostawcy == undefined){
            dostawca = <><Link to="/dostawca" className="statusbtn" state={{id:wpis.Id}}>Przypisz dostawcę</Link></>;
        }
        else{
            dostawca = wpis.ImieDostawcy + " " + wpis.NazwiskoDostawcy;
        }
        if(wpis.Zrealizowane==0){
            status = <><p>{wpis.NazwaStatusu}</p><Link to="/Status" className="statusbtn" state={{id:wpis.Id}}>Zmień status zamówienia</Link></>
        }
        else {
            status = wpis.NazwaStatusu;
        }
        if(i%2==0){
            zam.push(
                <tr className="par" id={wynik[i].Id} key={i}>
                    <td>{wpis.Id}</td>
                    <td>{wpis.Imie} {wpis.Nazwisko}</td>
                    <td>{wpis.CzasZlozeniaZamowienia}</td>
                    <td>{wpis.CzasDostarczeniaZamowienia}</td>
                    <td>{wpis.Ulica} {wpis.NrDomu}{wpis.NrMieszkania} {wpis.Miasto}</td>
                    <td>{status}</td>
                    <td>{dostawca}</td>
                    <td><Link to='/szczegoly' className="statusbtn" state={{id:wpis.Id}}>Zawartość zamówienia</Link></td>
                    <td>{wpis.Cena} zł</td>
                </tr>
            )
        }else{
            zam.push(
                <tr className="npar" id={wynik[i].Id} key={i}>
                    <td>{wpis.Id}</td>
                    <td>{wpis.Imie} {wpis.Nazwisko}</td>
                    <td>{wpis.CzasZlozeniaZamowienia}</td>
                    <td>{wpis.CzasDostarczeniaZamowienia}</td>
                    <td>{wpis.Ulica} {wpis.NrDomu}{wpis.NrMieszkania} {wpis.Miasto}</td>
                    <td>{status}</td>
                    <td>{dostawca}</td>
                    <td><Link to='/szczegoly' className="statusbtn" state={{id:wpis.Id}}>Zawartość zamówienia</Link></td>
                    <td>{wpis.Cena} zł</td>
                </tr>
            )
        }
    }
    setLoaded(true);
}
function Pracownik() {
    var [loaded, setLoaded] = useState(false);
    var [all, setIfAll] = useState(false);
    if(!loaded){
        PobierzZamowienia(setLoaded, all);
        return (<p>Ładowanie...</p>);
    }
    return (
    <div className="pracownik">
        <p className="naglowek"><b>Panel pracownika</b></p>
        <input type="button" onClick={()=>Zmien(setLoaded,setIfAll,all, true)} className="statusbtn" name="wszystkie" value="Wszystkie zamówienia"></input><br />
        <input type="button" onClick={()=>Zmien(setLoaded,setIfAll,all, false)} className="statusbtn" name="niezrealizowane" value="Niezrealizowane zamówienia" ></input>
        <table>
            <thead>
                <tr className="nagl">
                    <th>Id zamówienia</th>
                    <th>Imię i nazwisko</th>
                    <th>Data złożenia</th>
                    <th>Data dostarczenia</th>
                    <th>Dane kontaktowe</th>
                    <th>Status</th>
                    <th>Dostawca</th>
                    <th>Zawartość</th>
                    <th>Cena zamówienia</th>
                </tr>
            </thead>
            <tbody>
                {zam}
            </tbody>
        </table>
    </div>
    );
}

export default Pracownik;
