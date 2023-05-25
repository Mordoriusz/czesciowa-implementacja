import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Danie() {
  const idnr = useLocation().state;
  return (
    <article className="daniefull">
      <div className="top">
        <img src="schabowy.webp" className="topleft" alt="Zdjęcie dania"></img>
        <div className="topright">
          <p className="nazwa">Nazwa dania</p>
          <p className="opisfull">Pełny opis dania</p>
          <p className="sklad">Skład dania</p>
          </div>
      </div>
      <div className="bottom">
        <div className="bottomleft">
          <p className="cena">0.00zł</p>
          <button className="dodaj">Dodaj do koszyka</button>
        </div>
        <Link to="/menu" className="dodaj" state={{id:idnr}}>Powrót do menu</Link>
      </div>
    </article>);
}

export default Danie;
