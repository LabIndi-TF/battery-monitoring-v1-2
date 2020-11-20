/************************** Import library/fungsi ****************************/
//library "File System" untuk mengakses file lokal
const fs = require('fs');
const saveFolder = './csvLogs/';

//library untuk (format) timestamp
var moment  = require('moment');

//library untuk melakukan filter file csv saja dalam direktori
var path = require('path');
var EXTENSION = '.csv';

/************************ Deklarasi objek/variabel ***************************/
var Buff_Unit_A1 = [
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3],
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3],
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3],
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3]
];
var timestampBuff_Unit_A1 = [
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3],
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3],
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3],
    [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,2,3]
];

var localDataset = [
    {
        id:1, name: 'Unit_A1', 
        voltage1: Buff_Unit_A1[0],
        voltage2: Buff_Unit_A1[1],
        voltage3: Buff_Unit_A1[2],
        voltage4: Buff_Unit_A1[3],
        timestamp: timestampBuff_Unit_A1[0]
    },
    {
        id:2, name: 'Unit_A2',
        voltage1: [10, 12, 11],
        voltage2: [11, 11, 9],
        voltage3: [11, 10, 11],
        voltage4: [9, 11, 11],
        timestamp: ['11.00','11.01','11.02'] 
    },
    {
        id:3, name: 'Unit_B1', 
        voltage1: [10, 10, 10],
        voltage2: [11, 11, 11],
        voltage3: [12, 12, 12],
        voltage4: [9, 11, 11],
        timestamp: ['11.00','11.01','11.02']
    },
];

/************************ Deklarasi fungsi/event ***************************/

function extractAsCSV(dataset,id) {
    var header = ['Timestamp, Voltage1, Voltage2, Voltage3, Voltage4'];
    var rows = [];
    
    for(var i=0;i<dataset[id].timestamp.length;i++){
        let row = `${dataset[id].timestamp[i]}, ${dataset[id].voltage1[i]}, ${dataset[id].voltage2[i]}, ${dataset[id].voltage3[i]}, ${dataset[id].voltage4[i]}`;
        rows = rows+"\n"+row;
        //console.log(rows);
    }
    //console.log(rows);
  
    return header.concat(rows);
  }

function writeToCSVFile(dataset,id) {
    let deviceId = id-1;
    var filename = saveFolder + String(moment().format('YYYY-MM-DD_hh-mm-ss')) + '_'+ dataset[deviceId].name + '.csv';

    
    fs.writeFile(filename, extractAsCSV(dataset,id), err => {
      if (err) {
        console.log('Error writing to csv file', err);
      } else {
        console.log(`saved as ${filename}`);
      }
    });
    
  }

function readLatestCSV(dataset,id) {
  let filterBuf = [];

  // 1. Ambil semua nama file dalam folder
  fs.readdirSync(saveFolder).forEach(file => {
    filterBuf.push(file);
    //console.log(file);
  });  

  //2. Ambil yang unit tertentu saja

  filterBuf = filterBuf.filter();
  console.log(filterBuf);
  
  /*
  var targetFiles = files.filter(function(file) {
    return path.extname(file).toLowerCase() === EXTENSION;
  });
  return targetFiles;
  */
}

/****************************** Main Loop ***********************************/
/*
var namafile = String(moment().format('YYYY-MM-DD_hh-mm-ss'));
console.log(namafile);
*/

/*
  var panjang = localDataset[0].timestamp.length;
  console.log(panjang);
*/

//writeToCSVFile(localDataset,1);
readLatestCSV(localDataset,1);