/************************** Import library/fungsi ****************************/
import React, { Component } from 'react';

// komponen pemuat Config
import ConfigFetcher from './ConfigFetcher'

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
class ChartLoader extends Component {
  render() {
    return (
      <ConfigFetcher/>
    );
  }
};

export default ChartLoader;

