async function get(){ //test pobierania danych z bazy
    url="../backend/get.php";
    let test = await fetch(url, {method: "GET",}).then(response => response.json());
    console.log(test);
}
async function post(){
    let formdata = new FormData(document.getElementById("dane"));
    //tu będzie wstępny test dodawania danych do bazy
}
