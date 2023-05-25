import { Link } from "react-router-dom";
let dost =[];
let ile = 5;
function PobierzDostawcow(){
    for(var i=0; i<ile;i++){
        dost.push(<option value={i}>Dostawca {i}</option>);
    }
}
function Dostawca() {
    //pobierz id zeby cos robic
    PobierzDostawcow();
    return <div className="dostawca">
        <p className="naglowek"><b>Przypisz dostawcę</b></p>
        <p className="podnaglowek">Zamówienie nr Id</p>
        <select name="dostawca" size={ile*3}>
            {dost}
        </select><br/>
        <Link to="/pracownik" className="statusbtn">Wróć do menu</Link>
    </div>;
}

export default Dostawca;
