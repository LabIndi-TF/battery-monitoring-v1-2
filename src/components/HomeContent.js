/************************** Import library/fungsi ****************************/
import React, { Component,Fragment } from 'react';

// modul untuk HTTP POST ke node_server
import axios from 'axios'

// modul-modul SemanticUI
import { Accordion } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'

// komponen yang dimuat
import TableChartSection from './TableChartSection'

// variabel global
import { localConfigHome } from './ConfigFetcherHome'

/************************ Deklarasi objek/variabel ***************************/
var linkBuffer = 'api/buffer';
export var localBuffer = {
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
};
//asdf
export var localDiBuffer = {
  data: [
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false
  ],
  timestamp: "00:00:00"
};

export var localAiBuffer = {
  data: [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50
  ],
  timestamp: "00:00:00"
};

/************************ Deklarasi kelas/komponen ***************************/
class HomeContent extends Component {
  constructor() {
    super();
    this.state = {
      TAG_LIST: localConfigHome,
      BUFFER: localBuffer,
      ACTIVE_INDEX: [
        [false,false,false,false,false,false,false,false,],
        [false,false,false,false,false,false,false,false,],
        [false,false,false,false,false,false,false,false,],
        [false,false,false,false,false,false,false,false,],
      ],
      IO_LIST: {
        DI: localDiBuffer,
        AI: localAiBuffer
      },
    };

    this.REF_DEVICE_1_GROUPTAG_1_DI_1_STATE = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_DI_2_STATE = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_DI_3_STATE = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_DI_4_STATE = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_DI_5_STATE = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_DI_6_STATE = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_DI_7_STATE = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_DI_8_STATE = React.createRef();

    this.REF_DEVICE_1_GROUPTAG_1_AI_1_INPUT = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_AI_2_INPUT = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_AI_3_INPUT = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_AI_4_INPUT = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_AI_5_INPUT = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_AI_6_INPUT = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_AI_7_INPUT = React.createRef();
    this.REF_DEVICE_1_GROUPTAG_1_AI_8_INPUT = React.createRef();

    this.handleDiClick = this.handleDiClick.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSliderSubmit = this.handleSliderSubmit.bind(this);

    this.handleSection1TitleClick = this.handleSection1TitleClick.bind(this);
    this.handleSection2TitleClick = this.handleSection2TitleClick.bind(this);
    this.handleSection3TitleClick = this.handleSection3TitleClick.bind(this);
    this.handleSection4TitleClick = this.handleSection4TitleClick.bind(this);

  } // JS : end of constructor()
  REF_DI_LIST=[]; REF_AI_LIST=[];
  FetchBufferTimer = 0;

  componentDidMount() {
    //this.mountFetchBuffer(200);
    this.fetchBuffer();
    //console.log(localBuffer);

    this.REF_DI_LIST = [
      this.REF_DEVICE_1_GROUPTAG_1_DI_1_STATE,
      this.REF_DEVICE_1_GROUPTAG_1_DI_2_STATE,
      this.REF_DEVICE_1_GROUPTAG_1_DI_3_STATE,
      this.REF_DEVICE_1_GROUPTAG_1_DI_4_STATE,
      this.REF_DEVICE_1_GROUPTAG_1_DI_5_STATE,
      this.REF_DEVICE_1_GROUPTAG_1_DI_6_STATE,
      this.REF_DEVICE_1_GROUPTAG_1_DI_7_STATE,
      this.REF_DEVICE_1_GROUPTAG_1_DI_8_STATE,
    ];

    this.REF_AI_LIST = [
      this.REF_DEVICE_1_GROUPTAG_1_AI_1_INPUT,
      this.REF_DEVICE_1_GROUPTAG_1_AI_2_INPUT,
      this.REF_DEVICE_1_GROUPTAG_1_AI_3_INPUT,
      this.REF_DEVICE_1_GROUPTAG_1_AI_4_INPUT,
      this.REF_DEVICE_1_GROUPTAG_1_AI_5_INPUT,
      this.REF_DEVICE_1_GROUPTAG_1_AI_6_INPUT,
      this.REF_DEVICE_1_GROUPTAG_1_AI_7_INPUT,
      this.REF_DEVICE_1_GROUPTAG_1_AI_8_INPUT,
    ];
  }

  componentDidUpdate() {
    //console.log("update!");    
    for(var theDiIndex=0; theDiIndex<this.REF_DI_LIST.length; theDiIndex++){
      this.REF_DI_LIST[theDiIndex].current.innerText = this.state.IO_LIST.DI.data[theDiIndex] ? "ON" : "OFF";
    }

    for(var theAiIndex=0; theAiIndex<this.REF_AI_LIST.length; theAiIndex++){
      this.REF_AI_LIST[theAiIndex].current.value = this.state.IO_LIST.AI.data[theAiIndex];
    }
    
  }

  componentWillUnmount() {
    //clearInterval(this.FetchBufferTimer);
  }

  fetchBuffer() {
    fetch(linkBuffer)
      .then(res => res.json())
      .then((result) => {
        localBuffer = result;
        //console.log('DATAFETCHER : Buffer fetch success!', localBuffer);
      });
    this.setState({
      BUFFER: localBuffer
    }, () => {

      //console.log('DATAFETCHER : Buffer Refresh success!', localBuffer);
    });
  }

  mountFetchBuffer = (SAMPLE_PERIOD) => {
    this.FetchBufferTimer = setInterval(() => {
      this.fetchBuffer();
    }, SAMPLE_PERIOD);
  }

  handleSection1TitleClick = (e, itemProps) => {
    const {index} = itemProps;
    const activeIndex = this.state.ACTIVE_INDEX;

    activeIndex[0][index] = !activeIndex[0][index];
    //console.log(activeIndex);

    this.setState({
      ACTIVE_INDEX: activeIndex,
    });
  }

  handleSection2TitleClick = (e, itemProps) => {
    const {index} = itemProps;
    const activeIndex = this.state.ACTIVE_INDEX;

    activeIndex[1][index] = !activeIndex[1][index];
    //console.log(activeIndex);

    this.setState({
      ACTIVE_INDEX: activeIndex,
    });
  }

  handleSection3TitleClick = (e, itemProps) => {
    const {index} = itemProps;
    const activeIndex = this.state.ACTIVE_INDEX;

    activeIndex[2][index] = !activeIndex[2][index];
    //console.log(activeIndex);

    this.setState({
      ACTIVE_INDEX: activeIndex,
    });
  }

  handleSection4TitleClick = (e, itemProps) => {
    const {index} = itemProps;
    const activeIndex = this.state.ACTIVE_INDEX;

    activeIndex[3][index] = !activeIndex[3][index];
    //console.log(activeIndex);

    this.setState({
      ACTIVE_INDEX: activeIndex,
    });
  }

  handleDiClick = (e) => {
    //console.log(e.target.attributes.index_di.value);
    const prevIO_LIST = this.state.IO_LIST
    const newLocalDiBuffer = this.state.IO_LIST.DI.data;
    newLocalDiBuffer[e.target.attributes.index_di.value] = !newLocalDiBuffer[e.target.attributes.index_di.value];
    //console.log(newLocaldiBuffer);
    
    this.setState({
      IO_LIST:{
        DI: {
          data: newLocalDiBuffer,
          timestamp: prevIO_LIST.DI.timestamp
        },
        AI: {
          data: prevIO_LIST.AI.data,
          timestamp: prevIO_LIST.AI.timestamp
        }
      }
    },() => {
      const {IO_LIST} = this.state;

      const newPost = {
        IO_LIST: IO_LIST,
      };

      axios.post('http://localhost:5000/api/request_io', newPost)
        .then(() => console.log('New Request!'))
        .catch(err => {
          console.error(err);
        });
    });
  }

  handleSliderChange = (e) => {
    //console.log(e.target.value);
    this.REF_AI_LIST[e.target.attributes.index_ai.value].current.value = e.target.value;
  }

  handleSliderSubmit = (e) => {
    //console.log(e.target.attributes.index_ai.value);
    const prevIO_LIST = this.state.IO_LIST;
    const newLocalAiBuffer = this.state.IO_LIST.AI.data;

    newLocalAiBuffer[e.target.attributes.index_ai.value] = parseInt(this.REF_AI_LIST[e.target.attributes.index_ai.value].current.value);
    //console.log(newLocalAiBuffer);

    this.setState({
      IO_LIST:{
        DI: {
          data: prevIO_LIST.DI.data,
          timestamp: prevIO_LIST.DI.timestamp
        },
        AI: {
          data: newLocalAiBuffer,
          timestamp: prevIO_LIST.AI.timestamp
        }
      }
    },() => {
      const {IO_LIST} = this.state;

      const newPost = {
        IO_LIST: IO_LIST,
      };

      axios.post('http://localhost:5000/api/request_io', newPost)
        .then(() => console.log('New Request!'))
        .catch(err => {
          console.error(err);
        });
    });
  }
  // asdf
  render() { 

    var section1AIO = (
      <Fragment>
        <Grid columns='equal'>
          {/******************** digital input *******************/}
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <h3>Digital Input</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[0].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[0].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[0].DI_ENABLE
                ? <button index_di={0} onClick={this.handleDiClick}>DI-1</button>
                : <button disabled index_di={0} onClick={this.handleDiClick}>DI-1</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_1_STATE}>ON/OFF</p>
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[1].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[1].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[1].DI_ENABLE
                ? <button index_di={1} onClick={this.handleDiClick}>DI-2</button>
                : <button disabled index_di={1} onClick={this.handleDiClick}>DI-2</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_2_STATE}>ON/OFF</p>
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_ENABLE
                ? <button index_di={2} onClick={this.handleDiClick}>DI-3</button>
                : <button disabled index_di={2} onClick={this.handleDiClick}>DI-3</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_3_STATE}>ON/OFF</p>
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[3].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[3].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_ENABLE
                ? <button index_di={3} onClick={this.handleDiClick}>DI-4</button>
                : <button disabled index_di={3} onClick={this.handleDiClick}>DI-4</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_4_STATE}>ON/OFF</p>
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[4].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[4].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_ENABLE
                ? <button index_di={4} onClick={this.handleDiClick}>DI-5</button>
                : <button disabled index_di={4} onClick={this.handleDiClick}>DI-5</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_5_STATE}>ON/OFF</p>
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[5].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[5].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_ENABLE
                ? <button index_di={5} onClick={this.handleDiClick}>DI-6</button>
                : <button disabled index_di={5} onClick={this.handleDiClick}>DI-6</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_6_STATE}>ON/OFF</p>
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[6].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[6].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_ENABLE
                ? <button index_di={6} onClick={this.handleDiClick}>DI-7</button>
                : <button disabled index_di={6} onClick={this.handleDiClick}>DI-7</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_7_STATE}>ON/OFF</p>
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[7].DI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[7].DI_ENABLE ? "Enable" : "Disable"}</p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.DI[2].DI_ENABLE
                ? <button index_di={7} onClick={this.handleDiClick}>DI-8</button>
                : <button disabled index_di={7} onClick={this.handleDiClick}>DI-8</button>
              }
              <p ref={this.REF_DEVICE_1_GROUPTAG_1_DI_8_STATE}>ON/OFF</p>
            </Grid.Column>
          </Grid.Row>
          {/******************** analog input *******************/}
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <h3 className="centeredText">Analog Input</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[0].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[0].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={0} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_1_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[0].AI_ENABLE
                ? <button index_ai={0} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={0} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[1].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[1].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={1} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_2_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[1].AI_ENABLE
                ? <button index_ai={1} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={1} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[2].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[2].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={2} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_3_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[2].AI_ENABLE
                ? <button index_ai={2} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={2} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[3].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[3].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={3} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_4_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[3].AI_ENABLE
                ? <button index_ai={3} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={3} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[4].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[4].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={4} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_5_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[4].AI_ENABLE
                ? <button index_ai={4} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={4} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[5].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[5].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={5} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_6_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[5].AI_ENABLE
                ? <button index_ai={5} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={5} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[6].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[6].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={6} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_7_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[6].AI_ENABLE
                ? <button index_ai={6} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={6} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
            <Grid.Column>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[7].AI_LABEL}</p>
              <p>{this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[7].AI_ENABLE ? "Enable" : "Disable"}</p>
              <h5>100%</h5>
              <div>
                <input index_ai={7} onMouseUp={this.handleSliderChange} className="rotateTheSlider" type="range" min="0" max="100" step="1"/>
              </div>
              <h5>0%</h5>
              <p><input ref={this.REF_DEVICE_1_GROUPTAG_1_AI_8_INPUT} size="5"/></p>
              {
                this.state.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[7].AI_ENABLE
                ? <button index_ai={7} onClick={this.handleSliderSubmit}>Submit</button>
                : <button disabled index_ai={7} onClick={this.handleSliderSubmit}>Submit</button>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );

    var section1AContent = (
      this.state.ACTIVE_INDEX[0][0] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={1}/>
    );

    var section1BContent = (
      this.state.ACTIVE_INDEX[0][1] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={2}/>
    );

    var section1CContent = (
      this.state.ACTIVE_INDEX[0][2] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={3}/>
    );

    var section1DContent = (
      this.state.ACTIVE_INDEX[0][3] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={4}/>
    );

    var section1EContent = (
      this.state.ACTIVE_INDEX[0][4] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={5}/>
    );

    var section1FContent = (
      this.state.ACTIVE_INDEX[0][5] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={6}/>
    );

    var section1GContent = (
      this.state.ACTIVE_INDEX[0][6] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={7}/>
    );

    var section1HContent = (
      this.state.ACTIVE_INDEX[0][7] && <TableChartSection NO_DEVICE={1} NO_GROUPTAG={8}/>
    );

    var section2AContent = (
      this.state.ACTIVE_INDEX[1][0] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={1}/>
    );

    var section2BContent = (
      this.state.ACTIVE_INDEX[1][1] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={2}/>
    );

    var section2CContent = (
      this.state.ACTIVE_INDEX[1][2] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={3}/>
    );

    var section2DContent = (
      this.state.ACTIVE_INDEX[1][3] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={4}/>
    );

    var section2EContent = (
      this.state.ACTIVE_INDEX[1][4] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={5}/>
    );

    var section2FContent = (
      this.state.ACTIVE_INDEX[1][5] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={6}/>
    );

    var section2GContent = (
      this.state.ACTIVE_INDEX[1][6] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={7}/>
    );

    var section2HContent = (
      this.state.ACTIVE_INDEX[1][7] && <TableChartSection NO_DEVICE={2} NO_GROUPTAG={8}/>
    );

    var section3AContent = (
      this.state.ACTIVE_INDEX[2][0] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={1}/>
    );

    var section3BContent = (
      this.state.ACTIVE_INDEX[2][1] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={2}/>
    );

    var section3CContent = (
      this.state.ACTIVE_INDEX[2][2] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={3}/>
    );

    var section3DContent = (
      this.state.ACTIVE_INDEX[2][3] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={4}/>
    );

    var section3EContent = (
      this.state.ACTIVE_INDEX[2][4] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={5}/>
    );

    var section3FContent = (
      this.state.ACTIVE_INDEX[2][5] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={6}/>
    );

    var section3GContent = (
      this.state.ACTIVE_INDEX[2][6] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={7}/>
    );

    var section3HContent = (
      this.state.ACTIVE_INDEX[2][7] && <TableChartSection NO_DEVICE={3} NO_GROUPTAG={8}/>
    );

    var section4AContent = (
      this.state.ACTIVE_INDEX[3][0] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={1}/>
    );

    var section4BContent = (
      this.state.ACTIVE_INDEX[3][1] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={2}/>
    );

    var section4CContent = (
      this.state.ACTIVE_INDEX[3][2] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={3}/>
    );

    var section4DContent = (
      this.state.ACTIVE_INDEX[3][3] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={4}/>
    );

    var section4EContent = (
      this.state.ACTIVE_INDEX[3][4] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={5}/>
    );

    var section4FContent = (
      this.state.ACTIVE_INDEX[3][5] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={6}/>
    );

    var section4GContent = (
      this.state.ACTIVE_INDEX[3][6] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={7}/>
    );

    var section4HContent = (
      this.state.ACTIVE_INDEX[3][7] && <TableChartSection NO_DEVICE={4} NO_GROUPTAG={8}/>
    );

    // JS : Panel-panel Accordion

    var section1Panels = [
      this.state.TAG_LIST[0].GROUPTAG_LIST[0].GROUPTAG_VISIBLE && { key: 'panel-1a', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[0].GROUPTAG_NAME + ' (Group Tag 1A)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][0] && section1AContent}{section1AIO}</div> } },
      this.state.TAG_LIST[0].GROUPTAG_LIST[1].GROUPTAG_VISIBLE && { key: 'panel-1b', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[1].GROUPTAG_NAME + ' (Group Tag 1B)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][1] && section1BContent}</div> } },
      this.state.TAG_LIST[0].GROUPTAG_LIST[2].GROUPTAG_VISIBLE && { key: 'panel-1c', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[2].GROUPTAG_NAME + ' (Group Tag 1C)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][2] && section1CContent}</div> } },
      this.state.TAG_LIST[0].GROUPTAG_LIST[3].GROUPTAG_VISIBLE && { key: 'panel-1d', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[3].GROUPTAG_NAME + ' (Group Tag 1D)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][3] && section1DContent}</div> } },
      this.state.TAG_LIST[0].GROUPTAG_LIST[4].GROUPTAG_VISIBLE && { key: 'panel-1e', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[4].GROUPTAG_NAME + ' (Group Tag 1E)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][4] && section1EContent}</div> } },
      this.state.TAG_LIST[0].GROUPTAG_LIST[5].GROUPTAG_VISIBLE && { key: 'panel-1f', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[5].GROUPTAG_NAME + ' (Group Tag 1F)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][5] && section1FContent}</div> } },
      this.state.TAG_LIST[0].GROUPTAG_LIST[6].GROUPTAG_VISIBLE && { key: 'panel-1g', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[6].GROUPTAG_NAME + ' (Group Tag 1G)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][6] && section1GContent}</div> } },
      this.state.TAG_LIST[0].GROUPTAG_LIST[7].GROUPTAG_VISIBLE && { key: 'panel-1h', title: (this.state.TAG_LIST[0].GROUPTAG_LIST[7].GROUPTAG_NAME + ' (Group Tag 1H)'), content: { content: <div>{this.state.ACTIVE_INDEX[0][7] && section1HContent}</div> } },
    ];

    var section2Panels = [
      this.state.TAG_LIST[1].GROUPTAG_LIST[0].GROUPTAG_VISIBLE && { key: 'panel-2a', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[0].GROUPTAG_NAME + ' (Group Tag 2A)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][0] && section2AContent}</div> } },
      this.state.TAG_LIST[1].GROUPTAG_LIST[1].GROUPTAG_VISIBLE && { key: 'panel-2b', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[1].GROUPTAG_NAME + ' (Group Tag 2B)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][1] && section2BContent}</div> } },
      this.state.TAG_LIST[1].GROUPTAG_LIST[2].GROUPTAG_VISIBLE && { key: 'panel-2c', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[2].GROUPTAG_NAME + ' (Group Tag 2C)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][2] && section2CContent}</div> } },
      this.state.TAG_LIST[1].GROUPTAG_LIST[3].GROUPTAG_VISIBLE && { key: 'panel-2d', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[3].GROUPTAG_NAME + ' (Group Tag 2D)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][3] && section2DContent}</div> } },
      this.state.TAG_LIST[1].GROUPTAG_LIST[4].GROUPTAG_VISIBLE && { key: 'panel-2e', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[4].GROUPTAG_NAME + ' (Group Tag 2E)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][4] && section2EContent}</div> } },
      this.state.TAG_LIST[1].GROUPTAG_LIST[5].GROUPTAG_VISIBLE && { key: 'panel-2f', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[5].GROUPTAG_NAME + ' (Group Tag 2F)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][5] && section2FContent}</div> } },
      this.state.TAG_LIST[1].GROUPTAG_LIST[6].GROUPTAG_VISIBLE && { key: 'panel-2g', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[6].GROUPTAG_NAME + ' (Group Tag 2G)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][6] && section2GContent}</div> } },
      this.state.TAG_LIST[1].GROUPTAG_LIST[7].GROUPTAG_VISIBLE && { key: 'panel-2h', title: (this.state.TAG_LIST[1].GROUPTAG_LIST[7].GROUPTAG_NAME + ' (Group Tag 2H)'), content: { content: <div>{this.state.ACTIVE_INDEX[1][7] && section2HContent}</div> } },
    ];

    var section3Panels = [
      this.state.TAG_LIST[2].GROUPTAG_LIST[0].GROUPTAG_VISIBLE && { key: 'panel-3a', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[0].GROUPTAG_NAME + ' (Group Tag 3A)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][0] && section3AContent}</div> } },
      this.state.TAG_LIST[2].GROUPTAG_LIST[1].GROUPTAG_VISIBLE && { key: 'panel-3b', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[1].GROUPTAG_NAME + ' (Group Tag 3B)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][1] && section3BContent}</div> } },
      this.state.TAG_LIST[2].GROUPTAG_LIST[2].GROUPTAG_VISIBLE && { key: 'panel-3c', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[2].GROUPTAG_NAME + ' (Group Tag 3C)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][2] && section3CContent}</div> } },
      this.state.TAG_LIST[2].GROUPTAG_LIST[3].GROUPTAG_VISIBLE && { key: 'panel-3d', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[3].GROUPTAG_NAME + ' (Group Tag 3D)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][3] && section3DContent}</div> } },
      this.state.TAG_LIST[2].GROUPTAG_LIST[4].GROUPTAG_VISIBLE && { key: 'panel-3e', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[4].GROUPTAG_NAME + ' (Group Tag 3E)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][4] && section3EContent}</div> } },
      this.state.TAG_LIST[2].GROUPTAG_LIST[5].GROUPTAG_VISIBLE && { key: 'panel-3f', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[5].GROUPTAG_NAME + ' (Group Tag 3F)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][5] && section3FContent}</div> } },
      this.state.TAG_LIST[2].GROUPTAG_LIST[6].GROUPTAG_VISIBLE && { key: 'panel-3g', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[6].GROUPTAG_NAME + ' (Group Tag 3G)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][6] && section3GContent}</div> } },
      this.state.TAG_LIST[2].GROUPTAG_LIST[7].GROUPTAG_VISIBLE && { key: 'panel-3h', title: (this.state.TAG_LIST[2].GROUPTAG_LIST[7].GROUPTAG_NAME + ' (Group Tag 3H)'), content: { content: <div>{this.state.ACTIVE_INDEX[2][7] && section3HContent}</div> } },
    ];

    var section4Panels = [
      this.state.TAG_LIST[3].GROUPTAG_LIST[0].GROUPTAG_VISIBLE && { key: 'panel-4a', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[0].GROUPTAG_NAME + ' (Group Tag 4A)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][0] && section4AContent}</div> } },
      this.state.TAG_LIST[3].GROUPTAG_LIST[1].GROUPTAG_VISIBLE && { key: 'panel-4b', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[1].GROUPTAG_NAME + ' (Group Tag 4B)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][1] && section4BContent}</div> } },
      this.state.TAG_LIST[3].GROUPTAG_LIST[2].GROUPTAG_VISIBLE && { key: 'panel-4c', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[2].GROUPTAG_NAME + ' (Group Tag 4C)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][2] && section4CContent}</div> } },
      this.state.TAG_LIST[3].GROUPTAG_LIST[3].GROUPTAG_VISIBLE && { key: 'panel-4d', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[3].GROUPTAG_NAME + ' (Group Tag 4D)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][3] && section4DContent}</div> } },
      this.state.TAG_LIST[3].GROUPTAG_LIST[4].GROUPTAG_VISIBLE && { key: 'panel-4e', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[4].GROUPTAG_NAME + ' (Group Tag 4E)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][4] && section4EContent}</div> } },
      this.state.TAG_LIST[3].GROUPTAG_LIST[5].GROUPTAG_VISIBLE && { key: 'panel-4f', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[5].GROUPTAG_NAME + ' (Group Tag 4F)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][5] && section4FContent}</div> } },
      this.state.TAG_LIST[3].GROUPTAG_LIST[6].GROUPTAG_VISIBLE && { key: 'panel-4g', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[6].GROUPTAG_NAME + ' (Group Tag 4G)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][6] && section4GContent}</div> } },
      this.state.TAG_LIST[3].GROUPTAG_LIST[7].GROUPTAG_VISIBLE && { key: 'panel-4h', title: (this.state.TAG_LIST[3].GROUPTAG_LIST[7].GROUPTAG_NAME + ' (Group Tag 4H)'), content: { content: <div>{this.state.ACTIVE_INDEX[3][7] && section4HContent}</div> } },
    ];

    var section1Content = (
      <div>
        {/*Welcome to section 1*/}
        <Accordion.Accordion panels={section1Panels} onTitleClick={this.handleSection1TitleClick} exclusive={false} />
      </div>
    );

    var section2Content = (
      <div>
        {/*Welcome to section 2*/}
        <Accordion.Accordion panels={section2Panels} onTitleClick={this.handleSection2TitleClick} exclusive={false} />
      </div>
    );

    var section3Content = (
      <div>
        {/*Welcome to section 3*/}
        <Accordion.Accordion panels={section3Panels} onTitleClick={this.handleSection3TitleClick} exclusive={false} />
      </div>
    );

    var section4Content = (
      <div>
        {/*Welcome to section 4*/}
        <Accordion.Accordion panels={section4Panels} onTitleClick={this.handleSection4TitleClick} exclusive={false} />
      </div>
    );

    var rootPanels = [
      this.state.TAG_LIST[0].DEVICE_VISIBLE && { key: 'panel-1', title: (this.state.TAG_LIST[0].DEVICE_NAME + ' (Device 1)'), content: { content: section1Content } },
      this.state.TAG_LIST[1].DEVICE_VISIBLE && { key: 'panel-2', title: (this.state.TAG_LIST[1].DEVICE_NAME + ' (Device 2)'), content: { content: section2Content } },
      this.state.TAG_LIST[2].DEVICE_VISIBLE && { key: 'panel-3', title: (this.state.TAG_LIST[2].DEVICE_NAME + ' (Device 3)'), content: { content: section3Content } },
      this.state.TAG_LIST[3].DEVICE_VISIBLE && { key: 'panel-4', title: (this.state.TAG_LIST[3].DEVICE_NAME + ' (Device 4)'), content: { content: section4Content } },
    ];

    return (
      <div>
        <h1 className="centeredH1">Device List</h1>
        <Grid columns={2}>
          <Grid.Row>
            {/* Nilai default : defaultActiveIndex={0}
                Untuk membuat Accordion mampu membuka lebih dari 1 item sekaligus,
                buat exclusive={false} (defaultnya ={true}).
                Jika exclusive={false}, defaultActiveIndex harus array. 
                Untuk membuat gaada yg terbuka pada kondisi default, kosongkan arraynya. */}
            <Accordion fluid styled defaultActiveIndex={[]} panels={rootPanels} exclusive={false} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};

export default HomeContent;