import { NavLink } from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie';
import * as $ from 'jquery';
var dania = [];
var cena = 0;
let listaid = [];
function ZmienIlosc(setLoaded, id, ile){
  listaid = JSON.parse(Cookies.get("koszyk"));
  if(ile<0){
    alert("Nie możesz zmienić ilości na ujemną!");
  }
  else{
    for(var i=0; i<listaid.length; i++){
      if(i+1 == id){
        listaid[i].ile = ile;
      }
    }
    Cookies.set("koszyk", JSON.stringify(listaid));
    setLoaded(false);
  }
}
async function PobierzKoszyk(setLoaded) {
  cena = 0;
  if(Cookies.get("koszyk")!=undefined){
    listaid = JSON.parse(Cookies.get("koszyk"));
    let adres = "http://localhost/conn.php";
    let wynik;
    dania=[];
    await $.ajax({
      url: adres,
      type: "POST",
      data: {
        co: "menu",
        id:0,
      },
      success: (response)=>{
        wynik=JSON.parse(response);
      }
    });
    dania=[];
    for(let i = 0; i< listaid.length; i++){
      if(listaid[i].ile>0){
        let danie = listaid[i];
        cena += danie.ile*wynik[i].Cena;
        dania.push(
          <article className="daniekoszyk" key={i}>
            <img src={wynik[i].SciezkaDoZdjecia} alt="zdj"></img>
            <p className="nazwa">{danie.nazwa}</p>
            <div className="ile">
              <div className="iletop">
                <input type="number" id={danie.id} className="ilosc" defaultValue={danie.ile} min={1} max={99}></input>
                <p className="cena">{danie.ile*danie.cenazasztuke}zł</p>
              </div>
              <div className="ilebottom">
                <button className="dodaj" onClick={()=>ZmienIlosc(setLoaded, danie.id, document.getElementById(danie.id).value)}>Zmień ilość</button>
                <button className="dodaj" onClick={()=>ZmienIlosc(setLoaded, danie.id, 0)}>Usuń z koszyka</button>
              </div>
            </div>
          </article>
        );
      }
    }
  }
  cena = Math.round(cena*100)/100;
  setLoaded(true);
}
function Koszyk() {
  var [loaded, setLoaded] = useState(false);
  if(!loaded){
    PobierzKoszyk(setLoaded);
  }
  if(dania.length > 0){
    return <div className="koszykpodstrona">
      {dania}
      <div className="podsumowanie">
        <p className="naglowek">Całkowita cena zamówienia</p>
        <p className="cenafull">{cena}zł</p>
        <NavLink to="/zamow" className="detale">Sfinalizuj zamówienie</NavLink>
      </div>
    </div>;
  }else{
    return <div className="koszykpodstrona">
      <div className="podsumowanie">
        <p className="naglowek">Brak dań w koszyku!</p>
        <NavLink to="/menu" className="detale">Wróć do menu</NavLink>
      </div>
    </div>;
  }

}

export default Koszyk;
