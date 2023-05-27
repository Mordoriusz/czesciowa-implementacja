import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as $ from 'jquery';
let dost = [];
let ile;
let idnr;
async function PrzypiszDostawce(){
    let val = document.getElementById("dostawcaselect").value;
    let adres = "http://localhost/conn.php";
    await $.ajax({
        url: adres,
        type: "POST",
        data: {
            co: "zmiendostawce",
            id:idnr,
            dostawca: val
        },
        success: (response)=>{
            alert(response);
        }
    }); 
    window.location.href = "http://localhost:3000/pracownik";

}
async function PobierzDostawcow(setLoaded) {
    dost=[];
    let adres = "http://localhost/conn.php";
    let wynik;
    await $.ajax({
        url: adres,
        type: "POST",
        data: {
            co: "dostawcy",
        },
        success: (response)=>{
            wynik=JSON.parse(response);
        }
    });
    ile = wynik.length;
    for(var i=0; i<ile;i++){
        let dostawca = wynik[i];
        if(dostawca.CzyDostepny=="0"){
            dost.push(<option key={i} value={dostawca.Id} disabled>{dostawca.Imie} {dostawca.Nazwisko}</option>);
        }else{
            dost.push(<option key={i} value={dostawca.Id}>{dostawca.Imie} {dostawca.Nazwisko}</option>);
        }
    }
    setLoaded(true);
}
function Dostawca() {
    idnr = useLocation().state.id;
    let [loaded, setLoaded] = useState(false);
    if(!loaded){
        PobierzDostawcow(setLoaded);
        return (<p>Ładowanie...</p>);
    }
    return <div className="dostawca">
        <p className="naglowek"><b>Przypisz dostawcę</b></p>
        <p className="podnaglowek">Zamówienie nr {idnr}</p>
        <select id="dostawcaselect" name="dostawca" size={ile}>
            {dost}
        </select><br/>
        <button className="statusbtn" onClick={()=>PrzypiszDostawce(setLoaded)}>Zatwierdź wybór dostawcy</button>
        <Link to="/pracownik" className="statusbtn">Wróć do menu</Link>
    </div>;
}

export default Dostawca;
