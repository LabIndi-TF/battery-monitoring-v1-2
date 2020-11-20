/************************** Import library/fungsi ****************************/
//library React dan modul-modul React yang diperlukan
import React, { Component } from 'react'
import Chart from "chart.js";

//modul-modul css Chart
import classes from "./ChartComp.module.css";
// asdf
/************************ Deklarasi objek/variabel ***************************/
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.animation.duration = 0;

let theChart;

export var chartBuffer = {
  name:{},
  visible:[true,true,true,true,true,true,true,true,],
  data: [
    [0],[0],[0],[0],[0],[0],[0],[0],
  ],
  timestamp:[
    "00:00:00"
  ],
  config:{}
};

/************************ Deklarasi kelas/komponen ***************************/

class ChartSection extends Component {
  constructor(props) {
    super(props)
    this.state={
      name:{
        GROUPTAG_NAME: "",
        TAG_NAME:["","","","","","","","",],
      },
      visible:[true,true,true,true,true,true,true,true,],
      data: [
        [0],[0],[0],[0],[0],[0],[0],[0],
      ],
      timestamp:[
        "00:00:00"
      ],
      config:{}
    }
    this.chartRef = React.createRef();
  }

  static getDerivedStateFromProps(props,state){
    if (props.bufferList.timestamp !== state.timestamp){
      return {
        name: props.bufferList.name,
        visible: props.bufferList.visible,
        data: props.bufferList.data,
        timestamp: props.bufferList.timestamp,
        config: props.bufferList.config,
      };
    }
    return null;
  }
  
  seriesCount = 8;
  dataLimit = 19;

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.storeBuffer(this.state,chartBuffer);
    //console.log(this.state.config);
    this.buildChart();
  }

  storeBuffer(theBufferList,theChartBuffer){
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

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    
    const theDataset = [
      {label: this.state.name.TAG_NAME[0], data: chartBuffer.data[0], fill: false, borderColor: "#00FF00"},
      {label: this.state.name.TAG_NAME[1], data: chartBuffer.data[1], fill: false, borderColor: "#FF0000"},
      {label: this.state.name.TAG_NAME[2], data: chartBuffer.data[2], fill: false, borderColor: "#0000FF"},
      {label: this.state.name.TAG_NAME[3], data: chartBuffer.data[3], fill: false, borderColor: "#FFFF00"},
      {label: this.state.name.TAG_NAME[4], data: chartBuffer.data[4], fill: false, borderColor: "#00FFFF"},
      {label: this.state.name.TAG_NAME[5], data: chartBuffer.data[5], fill: false, borderColor: "#FF00FF"},
      {label: this.state.name.TAG_NAME[6], data: chartBuffer.data[6], fill: false, borderColor: "#000000"},
      {label: this.state.name.TAG_NAME[7], data: chartBuffer.data[7], fill: false, borderColor: "#333355"}
    ];

    const theTimestamp = chartBuffer.timestamp;

    theChart = new Chart(myChartRef, {
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
          text: this.state.name.GROUPTAG_NAME,
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
              labelString: this.state.config.X_AXIS_LABEL + " (" + this.state.config.X_AXIS_UNIT + ")",
            }
          }],
          yAxes: [{
            ticks: {
              //nilai minimal sumbu y
              suggestedMin: 0,
              //nilai maksimal sumbu y
              suggestedMax: 15
            },
            scaleLabel:{
              display: true,
              labelString: this.state.config.Y_AXIS_LABEL + " (" + this.state.config.Y_AXIS_TYPE + ")",
            }
          }]
        },
        // untuk mematikan interaksi (mouseover,click), kosongkan array
        events: []
      }
    });
    theChart.update();
  }

  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default ChartSection;