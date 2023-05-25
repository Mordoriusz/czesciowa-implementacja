import { Link } from "react-router-dom";
let dost =[];
let limit = 0;
let ile = 5;
let i = 0;
function PobierzDostawcow(){
    for(i; i<ile;i++){
        if(i<=limit){
            dost.push(<option value={i} disabled>Status {i}</option>);
        }
        else{
            dost.push(<option value={i}>Status {i}</option>);
        }
    }
}
function Status() {
    //pobierz id zeby cos robic
    PobierzDostawcow();
    return <div className="status">
        <p className="naglowek"><b>Zmień status zamówienia</b></p>
        <p className="podnaglowek">Zamówienie nr Id</p>
        <select name="dostawca" size={ile}>
            {dost}
        </select><br/>
        <Link to="/pracownik" className="statusbtn">Wróć do menu</Link>
    </div>;
}

export default Status;
