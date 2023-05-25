import './App.css';
import * as $ from 'jquery';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';
import Menu from './Menu';
import ONas from './ONas';
import Kontakt from './Kontakt';
import Koszyk from './Koszyk';
import Login from './Login';
import Danie from './Danie';
import { Routes, Route, Navigate } from 'react-router-dom';
import Zamow from './Zamow';
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
    return (
      <>
        <Navbar />
        <main>
          <Routes>
            <Route exact path='/Navbar' element={<Navbar />} />
            <Route exact path='/' element={<Navigate to="/main" />} />
            <Route path='/main' element={<Main />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/onas' element={<ONas />} />
            <Route path='/kontakt' element={<Kontakt />} />
            <Route path='/koszyk' element={<Koszyk />} />
            <Route path='/login' element={<Login />} />
            <Route path='/danie' element={<Danie />} />
            <Route path='/zamow' element={<Zamow />} />
          </Routes>
        </main>
        <Footer />
      </>);
  //);
}

export default App;
