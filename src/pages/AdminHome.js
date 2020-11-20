/************************** Import library/fungsi ****************************/
import React from 'react'

// modul-modul SemanticUI

// komponen yang dimuat di dalam page
import HomeMenu from '../ui/HomeMenu'
import ConfigFetcherHome from '../components/ConfigFetcherHome'
import DataFetcher from '../components/DataFetcher'

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
const AdminHome = () => (
  <div>
    {/*<h1 className="centeredH1">Menu Home</h1>*/}
    <ConfigFetcherHome />
    <DataFetcher />
    <HomeMenu />
  </div>
);

export default AdminHome;