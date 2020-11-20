/************************** Import library/fungsi ****************************/
var serialport = require('serialport');

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
var port = new serialport("COM4", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

/************************ Deklarasi fungsi/event ***************************/
//daftarkan event listener, berdasarkan kondisi tertentu (jadi argumen #1)
port.on("open",onOpen);
port.on("error",onError);
port.on("data",onDataReceived);

//fungsi membuka port serial
function onOpen(error){
    if(!error){
        console.log("--- GSM MODULE --- : Port open success!");
        //read(port);
    }
};

//fungsi yg dijalankan bila ada data masuk dari device serial
function onDataReceived(data){
    //var recvTimeout = setTimeout(function(){
        console.log("Received data : "+ data);
    //},1000);
};

//fungsi yg dijalankan bila terjadi error pada device serial
function onError(error){
    console.log(error);
};

//fungsi yg dijalankan bila device serial ditutup koneksinya
function onClose(error){
    console.log("Closing connection");
    console.log(error);
};

//fungsi mengirim sms, (objek serialport, string nomor HP, string pesan)
function send(serial,toAddress,message){
    serial.write("AT+CMGF=1");
    serial.write('\r');
    serial.write("AT+CMGS=\""+ toAddress +"\"");
    //serial.write("AT+CMGS=\"+6281220587597\"");
    serial.write('\r');
    setTimeout(function(){
        serial.write(message);
        serial.write('\x1A');
    },10000);
};

//fungsi membaca sms (objek serialport)
function read(serial){
    serial.write("AT+CMGF=1");
    serial.write('\r');
    serial.write("AT+CNMI=1,2,0,0,0");
    serial.write('\r');
};

/****************************** Main Loop ***********************************/
//skenario #1 : membaca SMS dan menampilkan pesannya di console,
//              5 detik setelah progrma dijalankan
var receieveTimer = setTimeout(function(){
    read(port);
},5000);

//skenario #2 : mengirim sms setelah 5 detik program dijalankan
/*
var sendTimer = setTimeout(function(){
    send(port,"+6281220587597","anyaj");
},5000);
*/