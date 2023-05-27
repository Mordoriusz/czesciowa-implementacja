import { useLocation } from "react-router-dom";
import { useState } from "react";
import * as $ from 'jquery';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
let danie = null;
let listaid = [];

async function DodajDoKoszyka(id){
  if(Cookies.get("koszyk")!=undefined){
    listaid = JSON.parse(Cookies.get("koszyk"));
  }
  else{
    let adres = "http://localhost/conn.php";
    let wynik;
    await $.ajax({
      url: adres,
      type: "POST",
      data: {
        co: "menu",
        id:0,
      },
      success: (response)=>{
        wynik=JSON.parse(response);
        for(let i=0; i<wynik.length; i++){
          if(listaid.length!=wynik.length){
            listaid.push({id:wynik[i].Id, nazwa:wynik[i].NazwaDania, ile:0, cenazasztuke:Math.round(wynik[i].Cena*100)/100});
          }
        }
      }
    }); 

  }     
  for(let i = 0; i < listaid.length; i++){
    if(id==listaid[i].id){
      listaid[i].ile++;
      alert("Dodałeś do koszyka: "+listaid[i].nazwa);
    }
  }
  Cookies.set("koszyk", JSON.stringify(listaid));
}
async function PobierzJednoDanie(setLoaded, id) {
  let adres = "http://localhost/conn.php";
  let wynik;
  let wyniksklad;
  let sklad = "";
  await $.ajax({
    url: adres,
    type: "POST",
    data: {
      co: "danie",
      id:id,
    },
    success: (response)=>{
      wynik=JSON.parse(response);
    }
  });
  await $.ajax({
    url: adres,
    type: "POST",
    data: {
      co: "sklad",
      id:id,
    },
    success: (response)=>{
      wyniksklad=JSON.parse(response);
      for(let i=0; i< wyniksklad.length; i++){
        sklad+=(wyniksklad[i].Skladnik+" "+wyniksklad[i].WagaSkladnikaGramy+"g");
        if(i<wyniksklad.length-1){
          sklad+=", ";
        }
      }
    }
  });
    let jedzenie=wynik[0];
    danie=(
      <article className="daniefull">
        <div className="top">
          <img src={jedzenie.SciezkaDoZdjecia} alt="zdj"></img>
          <div className="topright">
            <p className="nazwa">{jedzenie.NazwaDania}</p>
            <p className="opisfull">{jedzenie.Opis}</p>
            <p className="sklad">{sklad}</p>
            </div>
        </div>
        <div className="bottom">
          <div className="bottomleft">
            <p className="cena">{jedzenie.Cena}zł</p>
            <button className="dodaj" onClick={()=>DodajDoKoszyka(jedzenie.Id)}>Dodaj do koszyka</button>
          </div>
          <Link to="/menu" className="dodaj">Powrót do menu</Link>
        </div>
      </article>);
  
  setLoaded(true);
}
function Danie() {
  const idnr = useLocation().state.id;
  var [loaded, setLoaded] = useState(false);
  if(!loaded){
    PobierzJednoDanie(setLoaded, idnr);
    return (<p>Ładowanie...</p>);
  }else {
    return danie;
  }
}

export default Danie;
