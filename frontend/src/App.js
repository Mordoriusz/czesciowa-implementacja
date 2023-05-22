import './App.css';
import * as $ from 'jquery';
import { useState } from 'react';
let wpisy = [];
async function get(setLoaded){
 //test pobierania danych z bazy
  let url="http://localhost/conn.php";
  let p = document.getElementById("get");
  let res = [];
  await $.ajax({
    url: url, 
    type: "GET",
    success:function(wynik){
      wynik = JSON.parse(wynik);
      for(let i=0; i<wynik.length; i++){
        wpisy.push(<>{wynik[i].NazwaKategorii}<br /></>)
      }
      console.log(wpisy);
    }
  });
  setLoaded(true);
}
async function post(){ //test dodawania danych do bazy
  let url="http://localhost/conn.php";
  let formdata = new FormData(document.getElementById("form"));
  console.log(formdata.get("text"));
  await $.ajax({
    url: url, 
    type: "POST",
    enctype: 'multipart/form-data',
    data: formdata,
    contentType: false, 
    processData: false,
    success:function(wynik){
      console.log("dodano? "+wynik);
    },
    error: function(message){
      console.log("nie pyklo: "+ message);
    }
    
  });
}

function App() {
  var [loaded, setLoaded] = useState(false);
  if(!loaded) get(setLoaded);
  if(loaded) return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>{get(setLoaded);}}>Get</button>
        <p id="get">
          {wpisy}
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form action="POST" id="form" name="form">
          <input type='text' id="text" name="text"></input>
        </form>
        <button onClick={post}>Post</button>
        <p id="post">Miejsce na dane</p>
      </header>
    </div>
  );
}

export default App;
