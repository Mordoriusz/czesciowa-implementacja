import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
var dania = [];
async function PobierzDania(setLoaded) {
  let idnr = useLocation().state.id;
  dania=[];
  for(let i = 0; i< 5; i++){
    dania.push(
    <article className="danie" key={i}>
      <img src="schabowy.webp" alt="zdj"></img>
      <div className="opis">
        <p className="nazwa">Nazwa dania</p>
        <p className="opiskr">Krótki opis</p>
        <Link to="/danie" className="detale" state={{id:idnr}}>Szczegóły</Link>
      </div>
      <div className="koszyk">
        <p className="cena">0.00zł</p>
        <button className="dodaj">Dodaj do koszyka</button>
      </div>
    </article>);
  }
  //setLoaded(true);
}
function Menu() {
  
  var [loaded, setLoaded] = useState(false);
  if(!loaded){
    PobierzDania(setLoaded);
  }
  return (
    <>
      <div id="kategorie">
        <p>Kategorie</p>
        <Link to="/menu" className="kat" state={{id:0}}>Wszystko</Link>
        <Link to="/menu" className="kat" state={{id:1}}>Przystawki</Link>
        <Link to="/menu" className="kat" state={{id:2}}>Dania główne</Link>
        <Link to="/menu" className="kat" state={{id:3}}>Desery</Link>      
      </div>
      {dania}
    </>
    );
}

export default Menu;
