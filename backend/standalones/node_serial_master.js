var serialport = require('serialport');
var Readline = require('@serialport/parser-readline');
var portName = "COM4";

var myPort = new serialport(portName,{
    baudRate:9600
});

const parser = new Readline();
//myPort.pipe(parser);

//event Listener bila ada serial masuk dari Arduini
myPort.on("data", (line) => {
    //ubah tipe data Buffer Javascript jadi Array
    bufferArray = [...line];
    //satukan data buffer menjadi integer
    Arus_int = (bufferArray[1]<<8) | bufferArray[0];
    V1_int = (bufferArray[3]<<8) | bufferArray[2];
    V2_int = (bufferArray[5]<<8) | bufferArray[4];
    //konversi integer ke float
    Arus = Arus_int/100.0;
    V1 = V1_int/100.0;
    V2 = V2_int/100.0;
    console.log(bufferArray);
    console.log(`Arus : ${Arus}`);
    console.log('V1 : '+ String(V1));
    console.log(`V2 : ${V2}`);
});


//untuk polling data tiap x detik
function pollData(){
    pollCharacter = [0x11];
    myPort.write(pollCharacter);
}
setInterval(pollData,2000);