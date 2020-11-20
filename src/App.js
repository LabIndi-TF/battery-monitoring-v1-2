/************************** Import library/fungsi ****************************/
//library React dan modul-modul React yang diperlukan
import React, { Component } from 'react';

//terkait routing, dan sebuah component untuk menampung semua konten yang
//hanya bisa muncul bila user ter-autentikasi (sudah login)
import { BrowserRouter } from 'react-router-dom'

//CSS untuk app
import './App.css';

// Layouts
import PrimaryLayout from './layouts/PrimaryLayout'

// inisialisasi variabel default
import ConfigFetcher from './components/ConfigFetcher'

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
class App extends Component {
  /*
  constructor(){
    super();
  }
 */
  render() {
    return (
      <>
        <ConfigFetcher />
        <BrowserRouter>
        <PrimaryLayout />
        </BrowserRouter>
      </>
    );
    /*
    return (
      <div className="App">
        <MainWindow />        
      </div>
    );
    */
  }
}

export default App;
