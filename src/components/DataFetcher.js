/************************** Import library/fungsi ****************************/
import React, { Component } from 'react';

// variabel default jika GET gagal

/************************ Deklarasi objek/variabel ***************************/
var linkBuffer = 'api/buffer';

export var localBufferInit = {};

/************************ Deklarasi kelas/komponen ***************************/
class DataFetcher extends Component {
  componentDidMount(){
    this.mountFetchBuffer();
    setTimeout(()=>{this.mountFetchBuffer();},1000);
  }

  mountFetchBuffer = () => {
    fetch(linkBuffer)
    .then(res => res.json())
    .then(function(result){
      localBufferInit = result;
    });
    console.log('DATAFETCHER : Initial Buffer fetch success!', localBufferInit);
  }

  render() {
    return (
      <>
        <p hidden>Data Fetcher Loaded.</p>
      </>
    );
  }
};

export default DataFetcher;

