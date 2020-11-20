import React, { Component } from 'react';
import RandomGen, {dummyBuff,timestampDummyBuff} from './RandomGen'

var linkBuffer = '/api/buffer'

var Buff_Unit_A1 = [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0]
];
var timestampBuff_Unit_A1 = [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0]
];

export var localDataset = [
    {
        id:1, name: 'Battery', 
        voltage1: Buff_Unit_A1[0],
        voltage2: Buff_Unit_A1[1],
        voltage3: Buff_Unit_A1[2],
        voltage4: Buff_Unit_A1[3],
        arus: Buff_Unit_A1[4],
        timestamp: timestampBuff_Unit_A1[0]
    },
    {
        id:2, name: 'Motor_Stepper',
        voltage1: Buff_Unit_A1[5],
        voltage2: Buff_Unit_A1[6],
        voltage3: [],
        voltage4: [],
        arus: [],
        timestamp: timestampBuff_Unit_A1[0]
    },
    {
        id:3, name: 'Controller', 
        voltage1: Buff_Unit_A1[7],
        voltage2: Buff_Unit_A1[8],
        voltage3: [],
        voltage4: [],
        arus: [],
        timestamp: timestampBuff_Unit_A1[0]
    },
];

export var scaledLocalDataset = [
    {
        id:1, name: 'Battery', 
        voltage1: Buff_Unit_A1[0],
        voltage2: Buff_Unit_A1[1],
        voltage3: Buff_Unit_A1[2],
        voltage4: Buff_Unit_A1[3],
        arus: Buff_Unit_A1[4],
        timestamp: timestampBuff_Unit_A1[0]
    },
    {
        id:2, name: 'Motor_Stepper',
        voltage1: Buff_Unit_A1[5],
        voltage2: Buff_Unit_A1[6],
        voltage3: [],
        voltage4: [],
        arus: [],
        timestamp: timestampBuff_Unit_A1[0]
    },
    {
        id:3, name: 'Controller', 
        voltage1: Buff_Unit_A1[7],
        voltage2: Buff_Unit_A1[8],
        voltage3: [],
        voltage4: [],
        arus: [],
        timestamp: timestampBuff_Unit_A1[0]
    },
];

class WebSocketFetcher extends Component{
    constructor(){
        super();
        this.state = {
            devices: []
        }
    }

    RandomGenTimer=0;

    componentDidMount(){
        fetch(linkBuffer)
        .then(res => res.json())
        .then(devices => this.setState({devices}, () => {
            //console.log('Initial data fetch success!',devices);
            console.log('Initial data fetch success!');
        }));
        document.getElementById("WebSocketFetcherStatus").innerHTML = "WebSocketFetcherStatus = init fetch success!";
        this.fetchData();

        this.mountRandomGen();
    }

    componentDidUpdate(){
        clearInterval(this.RandomGenTimer);
        this.mountRandomGen();
    }

    componentWillUnmount(){
        clearInterval(this.WebSocketFetcherTimer);
        clearInterval(this.RandomGenTimer);
    }

    mountRandomGen = () => {
        this.RandomGenTimer = setInterval(function(){
            RandomGen(dummyBuff,timestampDummyBuff);
            //console.log(dummyBuff[0].length);
            //console.log('Chart Updated!');
        },1000);
    }

    fetchData(){
        this.WebSocketFetcherTimer = setInterval(function(){
            fetch(linkBuffer)
            .then(res => res.json())
            .then(function(result){
                localDataset = result;
                //console.log('Refresh data fetch success!',localDataset);
            });
            //console.log('Refresh data fetch success!',localDataset);
            console.log('Refresh data fetch success!');
            document.getElementById("WebSocketFetcherStatus").innerHTML = "WebSocketFetcherStatus = refresh fetch success!";
        },1000);
    }

    render(){
        return(
            <div>
                <p hidden id="WebSocketFetcherStatus">WebSocketFetcherStatus = idle</p>
            </div>
        );
    }
}

export default WebSocketFetcher;