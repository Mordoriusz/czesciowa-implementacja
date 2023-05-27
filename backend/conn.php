
<?php //skrypt połączenia z bazą i testy pobierania i wysylania danych
    header("Access-Control-Allow-Origin: *");
    $conndata = new mysqli("localhost", "root", "", "smakosz");
    function PobierzZBazy($conndata, $query){
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        $odp = array();
        for($i = 0; $i < $number; $i++){
            $row = mysqli_fetch_assoc($res);
            $path = './Zdjecia/'.$row['SciezkaDoZdjecia'];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            $row['SciezkaDoZdjecia']=$base64;
            array_push($odp, $row);
        }
        $json = json_encode($odp, JSON_UNESCAPED_UNICODE);
        echo $json;
    }
    function PobierzDania($kat, $conndata){
        $query ="";
        if($kat==0){
            $query = "select * from dania";
        }else{
            $query = "select * from dania where IdKategorii = '$kat'";
        }
        PobierzZBazy($conndata, $query);
    }
    function PobierzJednoDanie($id, $conndata){
        $query="select * from dania where Id='$id'";
        PobierzZBazy($conndata, $query);
    }
    function PobierzSklad($id, $conndata){
        $query="select * from skladniki where IdDania='$id'";
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        $odp = array();
        for($i = 0; $i < $number; $i++){
            $row = mysqli_fetch_assoc($res);
            array_push($odp, $row);
        }
        $json = json_encode($odp, JSON_UNESCAPED_UNICODE);
        echo $json;
    }
    function ZlozZamowienie($Imie, $Nazwisko, $Ulica, $NrDomu, $NrMieszkania, $Miasto, $NrTelefonu, $CzasDostarczeniaZamowienia, $Koszyk, $conndata){
        $kosz = json_decode($Koszyk);
        $cena = 0;
        for($i=0; $i<sizeof($kosz); $i++){
            $cena += (($kosz[$i]->{'ile'})*($kosz[$i]->{'cenazasztuke'}));
        }
        $query="INSERT INTO `zamowienia` (`Id`, `Imie`, `Nazwisko`, `Ulica`, `NrDomu`, `NrMieszkania`, `Miasto`, `NrTelefonu`, `CzasZlozeniaZamowienia`, `CzasDostarczeniaZamowienia`, `Cena`, `StatusZamowienia`, `IdDostawcy`) VALUES (NULL, '$Imie', '$Nazwisko', '$Ulica', '$NrDomu', '$NrMieszkania', '$Miasto', '$NrTelefonu', CURDATE(), '$CzasDostarczeniaZamowienia', '$cena', '1', NULL);";
        mysqli_query($conndata, $query);
        $query="SELECT * FROM `zamowienia` ORDER BY `Id` DESC LIMIT 1;";
        $result=mysqli_query($conndata, $query);
        $row = mysqli_fetch_assoc($result);
        $id = $row['Id'];
        for($i=0; $i<sizeof($kosz);$i++){
            for($j=0; $j<$kosz[$i]->{'ile'};$j++){
                $danieid=$kosz[$i]->{'id'};
                $query="INSERT INTO `zamowieniadania` (`Id`, `IdZamowienia`, `IdDania`) VALUES (NULL, '$id', '$danieid');";
                mysqli_query($conndata, $query);
            }
        }
        echo "Złożono zamówienie!";
    }
    function Zaloguj($login, $haslo, $conndata){
        $query = "SELECT PASSWORD('$haslo') AS 'haslohash'";
        $res = mysqli_query($conndata, $query);
        $haslohash ="";
        for($i = 0; $i < 1; $i++){
            $row = mysqli_fetch_assoc($res);
            $haslohash=$row['haslohash'];
        }
        $query = "SELECT * FROM pracownicy WHERE Login='$login'";
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        if($number==0){
            echo "Nie ma takiego użytkownika";
        }
        else {
            $row = mysqli_fetch_assoc($res);
            if($haslohash==$row['Haslo']){
                echo $login;
            }
            else echo "Niewłaściwe hasło";
        }
    }
    function PobierzZamowienia($all, $conndata){
        $query="";
        if($all==0){
            $query="select zamowienia.Id, zamowienia.Imie, zamowienia.Nazwisko, Ulica, NrDomu, NrMieszkania, Miasto, NrTelefonu, CzasZlozeniaZamowienia, CzasDostarczeniaZamowienia, Cena, StatusZamowienia, NazwaStatusu, Zrealizowane, IdDostawcy, dostawcy.Imie as ImieDostawcy, dostawcy.Nazwisko as NazwiskoDostawcy from zamowienia left join dostawcy on zamowienia.IdDostawcy=dostawcy.Id inner join statusyzamowien on zamowienia.StatusZamowienia=statusyzamowien.Id where Zrealizowane='0';";
        }
        if($all==1){
            $query="select zamowienia.Id, zamowienia.Imie, zamowienia.Nazwisko, Ulica, NrDomu, NrMieszkania, Miasto, NrTelefonu, CzasZlozeniaZamowienia, CzasDostarczeniaZamowienia, Cena, StatusZamowienia, NazwaStatusu, Zrealizowane, IdDostawcy, dostawcy.Imie as ImieDostawcy, dostawcy.Nazwisko as NazwiskoDostawcy from zamowienia left join dostawcy on zamowienia.IdDostawcy=dostawcy.Id inner join statusyzamowien on zamowienia.StatusZamowienia=statusyzamowien.Id;";
        }
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        $odp = array();
        for($i = 0; $i < $number; $i++){
            $row = mysqli_fetch_assoc($res);
            array_push($odp, $row);
        }
        $json = json_encode($odp, JSON_UNESCAPED_UNICODE);
        echo $json;
    }
    function PobierzJednoZamowienie($id, $conndata){
        $query = "select dania.NazwaDania, dania.Cena, kategoriedan.NazwaKategorii from zamowieniadania inner join dania on zamowieniadania.IdDania = dania.Id inner join kategoriedan on dania.IdKategorii = kategoriedan.Id where zamowieniadania.IdZamowienia = '$id';";
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        $odp = array();
        for($i = 0; $i < $number; $i++){
            $row = mysqli_fetch_assoc($res);
            array_push($odp, $row);
        }
        $json = json_encode($odp, JSON_UNESCAPED_UNICODE);
        echo $json;
    }
    function PobierzStatusy($conndata){
        $query = "select * from statusyzamowien";
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        $odp = array();
        for($i = 0; $i < $number; $i++){
            $row = mysqli_fetch_assoc($res);
            array_push($odp, $row);
        }
        $json = json_encode($odp, JSON_UNESCAPED_UNICODE);
        echo $json;
    } 
    function PobierzStatusZamowienia($conndata, $id){
        $query = "select StatusZamowienia from zamowienia where id='$id'";
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        $odp = array();
        for($i = 0; $i < $number; $i++){
            $row = mysqli_fetch_assoc($res);
            array_push($odp, $row);
        }
        $json = json_encode($odp, JSON_UNESCAPED_UNICODE);
        echo $json;
    } 
    
    function PobierzDostawcow($conndata){
        $query = "select * from dostawcy";
        $res = mysqli_query($conndata, $query);
        $number = mysqli_num_rows($res);
        $odp = array();
        for($i = 0; $i < $number; $i++){
            $row = mysqli_fetch_assoc($res);
            array_push($odp, $row);
        }
        $json = json_encode($odp, JSON_UNESCAPED_UNICODE);
        echo $json;
    } 
    function ZmienStatusZamowienia($conndata, $id, $status){
        $query = "UPDATE zamowienia SET StatusZamowienia = '$status' WHERE Id = $id;";
        mysqli_query($conndata, $query);
        echo "Status zamówienia zmieniony";
    }
    function ZmienDostawce($conndata, $id, $dostawca){
        $query = "UPDATE zamowienia SET IdDostawcy = '$dostawca' WHERE Id = $id;";
        mysqli_query($conndata, $query);
        $query = "UPDATE dostawcy SET CzyDostepny = '0' WHERE Id = $dostawca;";
        mysqli_query($conndata, $query);
        echo "Dostawca przypisany";
    }
    if(!$conndata){
        die(mysqli_connect_error());
    }
        if($_POST["co"]=="menu"){
            PobierzDania($_POST["id"],$conndata);
        } 
        else if($_POST["co"]=="danie"){
            PobierzJednoDanie($_POST["id"], $conndata);
        }
        else if($_POST["co"]=="sklad"){
            PobierzSklad($_POST["id"], $conndata);
        }
        else if($_POST["co"]=="zamow"){
            ZlozZamowienie(
                $_POST["Imie"], 
                $_POST["Nazwisko"], 
                $_POST["Ulica"], 
                $_POST["NrDomu"], 
                $_POST["NrMieszkania"], 
                $_POST["Miasto"], 
                $_POST["NrTelefonu"], 
                $_POST["CzasDostarczeniaZamowienia"], 
                $_POST["Koszyk"], 
                $conndata);
        }
        else if($_POST["co"]=="login"){
            Zaloguj($_POST["login"], $_POST["haslo"], $conndata);
        }
        else if($_POST["co"]=="zamowienia"){
            PobierzZamowienia($_POST["all"], $conndata);
        }
        else if($_POST["co"]=="zamowienie"){
            PobierzJednoZamowienie($_POST["id"], $conndata); //
        }
        else if($_POST["co"]=="statusy"){
            PobierzStatusy($conndata);
        }
        else if($_POST["co"]=="status"){
            PobierzStatusZamowienia($conndata, $_POST["id"]);
        }
        else if($_POST["co"]=="zmienstatus"){
            ZmienStatusZamowienia($conndata, $_POST["id"], $_POST["status"]);
        }
        else if($_POST["co"]=="dostawcy"){
            PobierzDostawcow($conndata);
        }
        else if($_POST["co"]=="zmiendostawce"){
            ZmienDostawce($conndata, $_POST["id"], $_POST["dostawca"]);
        }

    mysqli_close($conndata);
?>