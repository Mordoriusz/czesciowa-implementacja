import './App.css';
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
import Pracownik from './Pracownik';
import Status from './Status';
import Dostawca from './Dostawca';
import Szczegoly from './Szczegoly';
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
            <Route path='/pracownik' element={<Pracownik />} />
            <Route path='/status' element={<Status />} />
            <Route path='/dostawca' element={<Dostawca />} />
            <Route path='/szczegoly' element={<Szczegoly />} />
          </Routes>
        </main>
        <Footer />
      </>);
  //);
}

export default App;
