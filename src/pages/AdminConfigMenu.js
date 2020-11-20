/************************** Import library/fungsi ****************************/
import React from 'react'

// modul-modul SemanticUI

// Komponen yang dimuat di page
import ConfigMenu from '../ui/ConfigMenu'
import ConfigFetcherConfig from '../components/ConfigFetcherConfig'

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
const AdminConfigMenu = () => (
    <div>
        {/*<h1 className="centeredH1">Menu Konfigurasi Device</h1>*/}
        <ConfigFetcherConfig />
        <ConfigMenu />
    </div>
);
  
  export default AdminConfigMenu;