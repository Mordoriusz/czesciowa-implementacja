
<?php //skrypt połączenia z bazą i testy pobierania i wysylania danych
    header("Access-Control-Allow-Origin: *");
    $conndata = new mysqli("localhost", "root", "", "smakosz");
    if(!$conndata){
        die(mysqli_connect_error());
    }
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $dana = $_POST['text'];
        $query = "insert into test (dana) values ('$dana')";
        $res = mysqli_query($conndata, $query);
        echo "Przeszlo?";
    }
    else if($_SERVER["REQUEST_METHOD"] == "GET"){
        $query = "select * from kategoriedan";
        //$res = mysqli_query($conndata, $query);
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
    mysqli_close($conndata);
?>