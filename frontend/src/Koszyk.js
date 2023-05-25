import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
var dania = [];
var cena = 0;
async function PobierzKoszyk(setLoaded) {
  dania=[];
  for(let i = 0; i< 3; i++){
    dania.push(
      <article className="daniekoszyk" key={i}>
        <img src="schabowy.webp" alt="zdj"></img>
        <p className="nazwa">Nazwa dania</p>
        <div className="ile">
          <div className="iletop">
            <input type="number" class="ilosc" defaultValue={1} min={1} max={99}></input>
            <p className="cena">0.00zł</p>
          </div>
          <div className="ilebottom">
            <button className="dodaj">Zmień ilość</button>
            <button className="dodaj">Usuń z koszyka</button>
          </div>
        </div>
      </article>
    );
  }
  //setLoaded(true);
}
function Koszyk() {
  var [loaded, setLoaded] = useState(false);
  if(!loaded){
    PobierzKoszyk(setLoaded);
  }
    return <div className="koszykpodstrona">
      {dania}
      <div className="podsumowanie">
        <p className="naglowek">Całkowita cena zamówienia</p>
        <p className="cenafull">{cena}zł</p>
        <NavLink to="/zamow" className="detale">Sfinalizuj zamówienie</NavLink>
      </div>
    </div>;

}

export default Koszyk;
