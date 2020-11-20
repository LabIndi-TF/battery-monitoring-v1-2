/************************** Import library/fungsi ****************************/
import React, { Component } from 'react';

/************************ Deklarasi objek/variabel ***************************/
var linkConfig = '/api/config';

export var localConfigConfig = [];

/************************ Deklarasi kelas/komponen ***************************/
class ConfigFetcher_Config extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(linkConfig)
      .then(res => res.json())
      .then(function (result) {
        localConfigConfig = result;
        //console.log(localConfig);
      });
    //console.log('CONFIGFETCHER : Config fetch Success!');
  }

  render() {
    return (
      <>
        <p hidden>Config Fetcher for Config Page Loaded.</p>
      </>
    );
  }
};

export default ConfigFetcher_Config;

