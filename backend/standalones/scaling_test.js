/************************** Import library/fungsi ****************************/
//library untuk (format) timestamp
//import moment from 'moment';
const moment =  require('moment');

/************************ Deklarasi objek/variabel ***************************/
var dummyBuff = [[0],[0],[0],[0],[0]];
var timestampDummyBuff = [[0],[0],[0],[0],[0]];
var currentDummyBuff = [[0],[0],[0],[0],[0]];
// Jumlah data, atau jumlah kolom
const seriesCount = 5;
const dataLimit = 20;

/************************ Deklarasi fungsi/event ***************************/
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function RandomGen(Buff,Timestamp){
    let currentBuff = [
            getRndInteger(8,12),
            getRndInteger(8,12),
            getRndInteger(8,12),
            getRndInteger(8,12),
            getRndInteger(1,4),
        ];

    for(var i=0;i<seriesCount;i++){
        if((Buff[i].length)>dataLimit){
            Buff[i].shift();
            Buff[i][dataLimit] = currentBuff[i];
            Timestamp[i].shift();
            Timestamp[i][dataLimit] = String(moment().format('hh:mm:ss'));
        }
        else{
            Buff[i][Buff[i].length] = currentBuff[i];
            Timestamp[i][Timestamp[i].length] = String(moment().format('hh:mm:ss'));
        }
    }
    return [Buff,Timestamp];
}
/*
setInterval(() => {
    RandomGen(dummyBuff,timestampDummyBuff);
    console.log(dummyBuff[0]);
},1000);
*/
var a = 1;
var b = a;
b = 2;
console.log(a);