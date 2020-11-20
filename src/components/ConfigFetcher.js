/************************** Import library/fungsi ****************************/
import React, { Component } from 'react';

/************************ Deklarasi objek/variabel ***************************/
var linkConfig = '/api/config';

export var localConfig_config = [];

/************************ Deklarasi kelas/komponen ***************************/
class ConfigFetcher extends Component {
  componentDidMount(){
    this.fetchData();
  }

  fetchData() {
    fetch(linkConfig)
      .then(res => res.json())
      .then(function (result) {
        localConfig_config = result;
        //console.log(localConfig);
      });
    //console.log('CONFIGFETCHER : Config fetch Success!');
  }

  render() {
    return (
      <>
        <p hidden>Config Fetcher Loaded.</p>
      </>
    );
  }
};

export default ConfigFetcher;

