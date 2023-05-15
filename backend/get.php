<?php //test pobierania z bazy
    include './conn.php';
    $query = "select * from kategoriedan";
    $res = mysqli_query($conndata, $query);
    $number = mysqli_num_rows($res);
    $odp = "";
    for($i = 0; $i < $number; $i++){
        $row = mysqli_fetch_row($res);
        $odp .= ($row[1]."\n");
    }
    $json = json_encode($odp);
    echo $json;
?>