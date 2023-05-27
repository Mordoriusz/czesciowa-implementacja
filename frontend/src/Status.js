import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as $ from 'jquery';
let dost =[];
let ile;
let idnr;
async function ZmienStatus(setLoaded){
    let val = document.getElementById("statusselect").value;
    let adres = "http://localhost/conn.php";
    await $.ajax({
        url: adres,
        type: "POST",
        data: {
            co: "zmienstatus",
            id:idnr,
            status: val
        },
        success: (response)=>{
            alert(response);
        }
    }); 
    window.location.href = "http://localhost:3000/pracownik";
}
async function PobierzStatusy(setLoaded) {
    dost=[];
    let adres = "http://localhost/conn.php";
    let wynik;
    let obecny;
    await $.ajax({
        url: adres,
        type: "POST",
        data: {
            co: "statusy",
            id:idnr,
        },
        success: (response)=>{
            wynik=JSON.parse(response);
        }
    }); 

    await $.ajax({
        url: adres,
        type: "POST",
        data: {
        co: "status",
        id:idnr,
        },
        success: (response)=>{
            obecny=(JSON.parse(response))[0].StatusZamowienia;
        }
    });
    ile=wynik.length;
    for(let i=1; i<=ile;i++){
        let status = wynik[i-1].NazwaStatusu;
        if(i<obecny){
            dost.push(<option key={i} value={i} disabled>{status}</option>);
        }
        else if(i==obecny){
            dost.push(<option key={i} value={i} selected>{status}</option>);
        }else{
            dost.push(<option key={i} value={i}>{status}</option>);
        }
    }
    setLoaded(true);
}
function Status() {
    idnr = useLocation().state.id;
    //pobierz id zeby cos robic
    let [loaded, setLoaded] = useState(false);
    if(!loaded){
        PobierzStatusy(setLoaded);
        return (<p>Ładowanie...</p>);
    }
    return <div className="status">
        <p className="naglowek"><b>Zmień status zamówienia</b></p>
        <p className="podnaglowek">Zamówienie nr {idnr}</p>
        <select id="statusselect" name="dostawca" size={ile}>
            {dost}
        </select><br/>
        <button className="statusbtn" onClick={()=>ZmienStatus(setLoaded)}>Zatwierdź zmianę statusu</button>
        <Link to="/pracownik" className="statusbtn">Wróć do menu</Link>
    </div>;
}

export default Status;
