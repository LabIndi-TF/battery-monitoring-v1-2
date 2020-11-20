/************************** Import library/fungsi ****************************/
import React, { Component } from 'react';

// variabel default jika GET gagal
import {ConfigDefault} from './ConfigDefault'

/************************ Deklarasi objek/variabel ***************************/
var linkConfig = '/api/config';

export var localConfigHome = [];

/************************ Deklarasi kelas/komponen ***************************/
class ConfigFetcherHome extends Component {
  componentDidMount(){
    this.fetchConfig();
  }

  fetchConfig() {
    fetch(linkConfig)
      .then(res => res.json())
      .then(function (result) {
        localConfigHome = result === []? ConfigDefault : result;
        //console.log(localConfig);
      });
    //console.log('CONFIGFETCHER : Config fetch for home page Success!');
  }

  render() {
    return (
      <>
        <p hidden>Config Fetcher for Home Page Loaded.</p>
      </>
    );
  }
};

export default ConfigFetcherHome;

