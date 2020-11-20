/************************** Import library/fungsi ****************************/
//library React dan modul-modul React yang diperlukan
import React, { Component, Fragment } from 'react'
import Chart from "chart.js";
//adf
// modul-modul SemanticUI
import { Grid } from 'semantic-ui-react'

//modul-modul css Chart
import classes from "./ChartComp.module.css";

// variabel global
import { localConfigHome } from './ConfigFetcherHome'

/************************ Deklarasi objek/variabel ***************************/
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.animation.duration = 0;

/************************ Deklarasi kelas/komponen ***************************/

class TableChartSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      NO_DEVICE: 0,
      NO_GROUPTAG: 0,
      TAG_LIST: localConfigHome,
      BUFFER: this.localBuffer,
    }
    this.chartRef = React.createRef();
  }

  chartBuffer = {
    data: [
      [0],[0],[0],[0],[0],[0],[0],[0],
    ],
    timestamp:[
      "00:00:00"
    ],
  };
  
  propBuffer = {
    data:[0,0,0,0,0,0,0,0,],
    timestamp:"00:00:00",
  }

  scaledBuffer = {
    data: [
      [0],[0],[0],[0],[0],[0],[0],[0],
    ],
    timestamp:[
      "00:00:00"
    ],
  };

  percentagedBuffer = {
    data: [
      [0],[0],[0],[0],[0],[0],[0],[0],
    ],
    timestamp:[
      "00:00:00"
    ],
  };
  
  linkBuffer = 'api/buffer';
  localBuffer = {
    arduino:{
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      timestamp: "00:00:00"
    },
    dummy:{
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      timestamp: "00:00:00"
    }
  };
  
  FetchBufferTimer = 0;
  FetchBufferInterval = 0;

  theChart = 0;

  seriesCount = 8;
  dataLimit = 19;

  static getDerivedStateFromProps(props,state){
    if (props.NO_DEVICE !== state.NO_DEVICE){
      return {
        NO_DEVICE: props.NO_DEVICE-1,
        NO_GROUPTAG: props.NO_GROUPTAG-1,
      };
    }
    return null;
  }

  componentDidMount() {
    this.fetchPropBuffer(this.propBuffer);
    this.storeBuffer(this.propBuffer,this.chartBuffer);

    this.FetchBufferInterval =
      (
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.X_AXIS_SPAN 
        * 1000
      )/
      this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.X_AXIS_SAMPLEPERSPAN;
    //console.log(this.FetchBufferInterval);

    this.mountFetchBuffer(this.FetchBufferInterval);
    this.buildChart();
    //console.log(this.localBuffer);
  }

  /*
  componentDidUpdate() {
    this.fetchPropBuffer();
    console.log(this.propBuffer);
    this.storeBuffer(this.propBuffer,this.chartBuffer);
    //console.log(this.state.config);
    this.buildChart();
    //console.log("update!");
  }
  */

  componentWillUnmount() {
    clearInterval(this.FetchBufferTimer);
  }

  fetchBuffer() {
    fetch(this.linkBuffer)
      .then(res => res.json())
      .then((result) => {
        this.localBuffer = result;
        //console.log('DATAFETCHER : Buffer fetch success!', this.localBuffer);
      });
    this.setState({
      BUFFER: this.localBuffer
    }, () => {

      //console.log('DATAFETCHER : Buffer Refresh success!', this.localBuffer);
    });
  }

  mountFetchBuffer = (SAMPLE_PERIOD) => {
    this.FetchBufferTimer = setInterval(() => {
      this.fetchBuffer();
      this.fetchPropBuffer();
      this.storeBuffer(this.propBuffer,this.chartBuffer);
      this.buildChart();
      //console.log(this.localBuffer);
    }, SAMPLE_PERIOD);
  }

  fetchPropBuffer = () => {
    /*
    this.propBuffer={
      data:[
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_INDEX],
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_INDEX],
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_INDEX],
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_INDEX],
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_INDEX],
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_INDEX],
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_INDEX],
        this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_INDEX],
      ],
      timestamp: this.state.BUFFER.dummy.timestamp,
    };
    */

    let theMappedData = [0,0,0,0,0,0,0,0];

    for(var mappingIter=0; mappingIter<8; mappingIter++){
      switch (this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[mappingIter].TAG_DATASOURCE){
        default:
        case 'dummy':
          theMappedData[mappingIter] = this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[mappingIter].TAG_VISIBLE && this.state.BUFFER.dummy.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[mappingIter].TAG_INDEX];
        break;
        case 'arduino':
          theMappedData[mappingIter] = this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[mappingIter].TAG_VISIBLE && this.state.BUFFER.arduino.data[this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[mappingIter].TAG_INDEX];
        break;
      }
    }

   this.propBuffer={
    data:theMappedData,
    timestamp: this.state.BUFFER.dummy.timestamp,
  };
  }

  storeBuffer = (theBufferList,theChartBuffer) => {
    if((theChartBuffer.data[0].length)>this.dataLimit){
      for(var i=0;i<this.seriesCount;i++){
        theChartBuffer.data[i].shift();
        theChartBuffer.data[i][this.dataLimit] = theBufferList.data[i];
      }
      theChartBuffer.timestamp.shift();
      theChartBuffer.timestamp[this.dataLimit] = theBufferList.timestamp;
    }
    else{
      for(i=0;i<this.seriesCount;i++){
        theChartBuffer.data[i][theChartBuffer.data[i].length] = theBufferList.data[i];
      }
      theChartBuffer.timestamp[theChartBuffer.timestamp.length] = theBufferList.timestamp;
    }
    return theChartBuffer;
  }
  
  scaleBuffer = (theChartBuffer) => {
    return {
      data: [
        theChartBuffer.data[0].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MINEU)
          ).toFixed(2)
        ),
        theChartBuffer.data[1].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MINEU)
          ).toFixed(2)
        ),
        theChartBuffer.data[2].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MINEU)
          ).toFixed(2)
        ),
        theChartBuffer.data[3].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MINEU)
          ).toFixed(2)
        ),
        theChartBuffer.data[4].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MINEU)
          ).toFixed(2)
        ),
        theChartBuffer.data[5].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MINEU)
          ).toFixed(2)
        ),
        theChartBuffer.data[6].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MINEU)
          ).toFixed(2)
        ),
        theChartBuffer.data[7].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MINVAL)
            )*
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MAXEU)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MINEU)
            )+
            parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MINEU)
          ).toFixed(2)
        ),
      ],
      timestamp:[
        theChartBuffer.timestamp
      ],
    };
  }

  percentageBuffer = (theChartBuffer) => {
    return {
      data: [
        theChartBuffer.data[0].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
        theChartBuffer.data[1].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
        theChartBuffer.data[2].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
        theChartBuffer.data[3].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
        theChartBuffer.data[4].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
        theChartBuffer.data[5].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
        theChartBuffer.data[6].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
        theChartBuffer.data[7].map(
          (value)=>(
            (
              parseFloat(value)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MINVAL)
            )/
            (
              parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MAXVAL)-parseFloat(this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_MINVAL)
            )*100
          ).toFixed(2)
        ),
      ],
      timestamp:[
        theChartBuffer.timestamp
      ],
    };
  }
  
  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    
    this.scaledBuffer = this.scaleBuffer(this.chartBuffer);

    switch (this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.Y_AXIS_TYPE){
      default:
      case 'EU':
        this.percentagedBuffer = this.scaleBuffer(this.chartBuffer);
      break;
      case 'percent':
        this.percentagedBuffer = this.percentageBuffer(this.chartBuffer);
      break;
    }
    const theDataset = [
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_NAME,
        data: this.percentagedBuffer.data[0],
        fill: false,
        borderColor: "#00FF00"
      },
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_NAME,
        data: this.percentagedBuffer.data[1],
        fill: false,
        borderColor: "#FF0000"
      },
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_NAME,
        data: this.percentagedBuffer.data[2],
        fill: false,
        borderColor: "#0000FF"
      },
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_NAME,
        data: this.percentagedBuffer.data[3],
        fill: false,
        borderColor: "#FFFF00"
      },
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_NAME,
        data: this.percentagedBuffer.data[4],
        fill: false,
        borderColor: "#00FFFF"
      },
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_NAME,
        data: this.percentagedBuffer.data[5],
        fill: false,
        borderColor: "#FF00FF"
      },
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_NAME,
        data: this.percentagedBuffer.data[6],
        fill: false,
        borderColor: "#000000"
      },
      {
        label: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_NAME,
        data: this.percentagedBuffer.data[7],
        fill: false,
        borderColor: "#333355"
      },
    ];

    const theTimestamp = this.chartBuffer.timestamp;

    this.theChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: theTimestamp,
        datasets: theDataset
      },
      options: {
        // judul chart
        title: {
          display: true,
          text: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_NAME,
        },
        //Customize chart options
        // 2 item ini untuk membuat grafik bagus di mobile
        responsive: true,
        maintainAspectRatio: false,
        // atur angka sumbu di sini
        scales: {
          xAxes:[{
            // objek atau 'key' scaleLabel untuk label sumbu
            scaleLabel:{
              display: true,
              labelString: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.X_AXIS_LABEL + " (" + this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.X_AXIS_UNIT + ")",
            }
          }],
          yAxes: [{
            ticks: {
              //nilai minimal sumbu y
              suggestedMin: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.Y_AXIS_MINVAL,
              //nilai maksimal sumbu y
              suggestedMax: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.Y_AXIS_MAXVAL,
            },
            scaleLabel:{
              display: true,
              labelString: this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.Y_AXIS_LABEL + " (" + this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].GROUPTAG_PLOTCONFIG.Y_AXIS_TYPE + ")",
            }
          }]
        },
        // untuk mematikan interaksi (mouseover,click), kosongkan array
        events: []
      }
    });
    this.theChart.update();
  }

  render() {
    var content_row_1 = (
      <tr>
        <td>1</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[0][this.scaledBuffer.data[0].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_EU}</td>
      </tr>
    );
    var content_row_2 = (
      <tr>
        <td>2</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[1][this.scaledBuffer.data[1].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_EU}</td>
      </tr>
    );
    var content_row_3 = (
      <tr>
        <td>3</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[2][this.scaledBuffer.data[2].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_EU}</td>
      </tr>
    );
    var content_row_4 = (
      <tr>
        <td>4</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[3][this.scaledBuffer.data[3].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_EU}</td>
      </tr>
    );
    var content_row_5 = (
      <tr>
        <td>5</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[4][this.scaledBuffer.data[4].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_EU}</td>
      </tr>
    );
    var content_row_6 = (
      <tr>
        <td>6</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[5][this.scaledBuffer.data[5].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_EU}</td>
      </tr>
    );
    var content_row_7 = (
      <tr>
        <td>7</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[6][this.scaledBuffer.data[6].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_EU}</td>
      </tr>
    );
    var content_row_8 = (
      <tr>
        <td>8</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_NAME}</td>
        <td>{this.scaledBuffer.data[7][this.scaledBuffer.data[7].length-1]}</td>
        <td>{this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_EU}</td>
      </tr>
    );

    var section_content = (
      <Grid columns={2}>
        <Grid.Row>
        <Grid.Column width={4}>
        <div>
          <table>
            <thead>
              <tr>
                <td>No</td>
                <td>Nama Tag</td>
                <td>Nilai</td>
              </tr>
            </thead>
            <tbody>
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[0].TAG_VISIBLE && content_row_1}
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[1].TAG_VISIBLE && content_row_2}
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[2].TAG_VISIBLE && content_row_3}
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[3].TAG_VISIBLE && content_row_4}
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[4].TAG_VISIBLE && content_row_5}
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[5].TAG_VISIBLE && content_row_6}
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[6].TAG_VISIBLE && content_row_7}
              {this.state.TAG_LIST[this.state.NO_DEVICE].GROUPTAG_LIST[this.state.NO_GROUPTAG].TAG_LIST[7].TAG_VISIBLE && content_row_8}
            </tbody>
          </table>
        </div>
        </Grid.Column>
        <Grid.Column width={5}>
          <div className={classes.graphContainer}>
            <canvas id="myChart" ref={this.chartRef} />
          </div>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    );

    return (
      <Fragment>
        {section_content}
      </Fragment>
    );
  }
}

export default TableChartSection;