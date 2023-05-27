import { useState } from "react";
import * as $ from 'jquery';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
var dania = [];
let klucz = 0;
let listaid = [];
async function DoKoszyka(id){
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
async function PobierzDania(setLoaded, category) {
  let adres = "http://localhost/conn.php";
  let wynik;
  dania=[];
  await $.ajax({
    url: adres,
    type: "POST",
    data: {
      co: "menu",
      id:category,
    },
    success: (response)=>{
      wynik=JSON.parse(response);
    }
  });
  for(let i=0; i<wynik.length; i++){
    let danie=wynik[i];
    dania.push(
      <article className="danie" key={klucz}>
        <img src={danie.SciezkaDoZdjecia} alt="zdj"></img>
        <div className="opis">
          <p className="nazwa">{danie.NazwaDania}</p>
          <p className="opiskr">{danie.OpisKrotki}</p>
          <Link to="/danie" className="detale" state={{id:danie.Id}}>Szczegóły</Link>
        </div>
        <div className="koszyk">
          <p className="cena">{danie.Cena}zł</p>
          <button onClick={()=>DoKoszyka(danie.Id)} className="dodaj">Dodaj do koszyka</button>
        </div>
      </article>);
      klucz++;
  }
  setLoaded(true);
}
function ZmienStan(setCategory, kat, setLoaded) {
  setCategory(kat);
  setLoaded(false);
}
function Menu() {
  var [category, setCategory] = useState(0);
  var [loaded, setLoaded] = useState(false);
  if(!loaded){
    PobierzDania(setLoaded, category);
    return (<p>Ładowanie...</p>);
  }else {
    return (
    <>
      <div id="kategorie">
        <p>Kategorie</p>
        <button onClick={()=>{ZmienStan(setCategory, 0, setLoaded)}} className="dodaj">Wszystko</button>
        <button onClick={()=>{ZmienStan(setCategory, 1, setLoaded)}} className="dodaj">Przystawki</button>
        <button onClick={()=>{ZmienStan(setCategory, 2, setLoaded)}} className="dodaj">Dania główne</button>
        <button onClick={()=>{ZmienStan(setCategory, 3, setLoaded)}} className="dodaj">Desery</button>
      </div>
      {dania}
    </>
    );
  }
}

export default Menu;
