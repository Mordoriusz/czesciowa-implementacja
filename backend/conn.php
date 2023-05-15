
<?php //skrypt połączenia z bazą
    $conndata = new mysqli("localhost", "root", "", "smakosz");
    if(!$conndata){
        die(mysqli_connect_error());
    }
?>