/************************** Import library/fungsi ****************************/
//library serialport
var serialport = require('serialport');

//library untuk server tempat buffer serta koneksi mysql
const express = require('express');

//library untuk (format) timestamp
var moment  = require('moment');

/************************ Deklarasi objek/variabel ***************************/
//Buffer data battery monitoring dari serial
var Buff_Unit_A1 = [
    [0],[0],[0],[0],[0],
    [0],[0],
    [0],[0]
];
var timestampBuff_Unit_A1 = [
    [0],[0],[0],[0],[0],
    [0],[0],
    [0],[0]
];
var currentBuff_Unit_A1 = [
    [0],[0],[0],[0],[0],
    [0],[0],
    [0],[0]
];
const dataLimit = 20;
const normalDataLimit = 100;
// Jumlah data, atau jumlah kolom
// ada 4 tegangan 1 arus (baterai) + 2 (motor) + 2 (controller)
// 5 data + 2 data + 2 data = 9
const seriesCount = 9;
var iter = 0;

//deklarasi objek serial
var portName = "COM6";
var myPort = new serialport(portName,{
    baudRate:9600
});

//deklarasi objek server
const app = express();
const port = 5000;

/************************ Deklarasi fungsi/event ***************************/
function StoreToBuffer(currentBuff,Buff,Timestamp){
    for(var i=0;i<seriesCount;i++){
        if((Buff[i].length)>dataLimit){
            Buff[i].shift();
            Buff[i][dataLimit] = currentBuff[i][0];
            Timestamp[i].shift();
            Timestamp[i][dataLimit] = String(moment().format('hh:mm:ss'));
        }
        else{
            Buff[i][Buff[i].length] = currentBuff[i][0];
            Timestamp[i][Timestamp[i].length] = String(moment().format('hh:mm:ss'));
        }
    }
    return [Buff,Timestamp];
}

//event listener untuk mengoper data dari serial ke server
function expressGETBuffer(){
    app.get('/api/buffer',(req,res) =>{
        var devices = [
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
        res.json(devices);
    });
    //console.log("2a. GET to Server");
}

//event Listener bila ada serial masuk dari Arduini
myPort.on("data", (line) => {
    //console.log("1a. Serial data Acquired");
    iter +=1;
    //ubah tipe data Buffer Javascript jadi Array
    bufferArray = [...line];

    //satukan data buffer menjadi integer
    V1_int = (bufferArray[1]<<8) | bufferArray[0];
    V2_int = (bufferArray[3]<<8) | bufferArray[2];
    V3_int = (bufferArray[5]<<8) | bufferArray[4];
    V4_int = (bufferArray[7]<<8) | bufferArray[6];
    Arus_int = (bufferArray[9]<<8) | bufferArray[8];
    VM1_int = (bufferArray[11]<<8) | bufferArray[10];
    VM2_int = (bufferArray[13]<<8) | bufferArray[12];
    VC1_int = (bufferArray[15]<<8) | bufferArray[14];
    VC2_int = (bufferArray[17]<<8) | bufferArray[16];

    //konversi integer ke float    
    V1 = V1_int/100.0; if(V1>normalDataLimit) V1=0;
    V2 = V2_int/100.0; if(V2>normalDataLimit) V2=0;
    V3 = V3_int/100.0; if(V3>normalDataLimit) V3=0;
    V4 = V4_int/100.0; if(V4>normalDataLimit) V4=0;
    
    Arus = Arus_int/100.0;

    VM1 = VM1_int/100.0; if(VM1>normalDataLimit) VM1=0;
    VM2 = VM2_int/100.0; if(VM2>normalDataLimit) VM2=0;
    VC1 = VC1_int/100.0; if(VC1>normalDataLimit) VC1=0;
    VC2 = VC2_int/100.0; if(VC2>normalDataLimit) VC2=0;
    //console.log("1b. Serial data Converted");

    //masukkan ke buffer agar dapat diakses chart dan server
    currentBuff_Unit_A1 = [[V1],[V2],[V3],[V4],[Arus],[VM1],[VM2],[VC1],[VC2]];
    StoreToBuffer(currentBuff_Unit_A1,Buff_Unit_A1,timestampBuff_Unit_A1);
    //console.log("1c. Serial data Stored to Buffer");
    
    console.log(bufferArray);
    //debug
    /*
    console.log(bufferArray);
    console.log(`iter:${iter}`);
    console.log(`Arus : ${Arus}`);
    console.log('V1 : '+ String(V1));
    console.log(`V2 : ${V2}`);
    */
});

myPort.on("close",() => {
    console.log("RECON coz close");
    myPort.resume();
});

myPort.on("error",() => {
    console.log("RECON coz error");
    myPort.resume();
});
/****************************** Main Loop ***********************************/
//untuk polling data tiap x detik
function pollData(){
    console.log(`\n-------------------- NEW LOOP #${iter} --------------------\n`);
    pollCharacter = [0x11];
    //console.log("1. Polled Serial Port");
    myPort.write(pollCharacter);
    //console.log("2. GET Procedure");
    expressGETBuffer();
}
setInterval(pollData,1000);

/******************** Finalisasi (nyalakan server) *************************/
app.listen(port, () => console.log(`Server started on port ${port}`));