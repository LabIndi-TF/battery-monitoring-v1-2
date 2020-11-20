# battery-monitoring-v1_2
Program Battery Monitoring (Node.js - Express - React). Kasus aplikasi versi ini: hardware level 0 AC Monitoring<br />
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup Software
1. Clone (atau download zip)
2. Buka folder bernama depan arduino-, lalu upload kode tersebut ke Arduino. Cek COM port\* nya, dan sesuaikan pada langkah Setup untuk program sisi node.
3. Dengan terminal Powershell #1 yang terdapat di dalam VSCode, pada direktori root (yang ada README.md nya - seharusnya tidak perlu diubah bila folder ini yang dibuka di VSCode), ketik ```npm install```
4. Dengan terminal Powershell #2 (split atau new terminal), pergi ke direktori backend dengan ```cd backend```, lalu ```node node_server.js```
5. Kembali ke root pada terminal #1 dengan ```cd ../```, lalu ```npm start```
6. Cek di browser, http://localhost:3000 untuk UI React, http://localhost:5000/buffer untuk buffer data nya.<br />
    Sementara ini, program dibuat untuk single user. Login dengan username "root" dan password "password".

## Setup Hardware (Battery Monitoring)
1. Pastikan Arduino dengan Battery Monitoring pada kondisi yang sama dengan (\*), dengan baudRate 9600. Jika bukan di COM4, ganti bagian ini di file node_server.js:
    ```
    //deklarasi objek serial
    var portName = "COM3";
    var myPort = new serialport(portName,{
        baudRate:9600
    });
    ```
2. Sejauh ini cuma itu sih

## Setup Hardware (AC Monitoring)
1. Pastikan Arduino dengan AC Monitoring pada kondisi default ada di COM3, dengan baudRate 115200. 

## Menu yang Tersedia
1. Home <br /> Sebagai halaman yang memuat tampilan grafik keempat device, yang masing-masing memuat 8 group tag.
2. Konfigurasi Admin <br /> Sebagai halaman yang digunakan untuk mengubah konfigurasi tag-tag. Perlu login untuk mengakses halaman ini
3. Informasi Proyek <br /> Calon halaman untuk menempatkan detil seputar proyek
4. About Us <br /> Calon halaman "Tentang Kami"

## Link Router yang Digunakan
1. [Battery Monitoring](http://localhost:3000), sebagai aplikasi UI utama.
2. [Server Dummy](http://localhost:5000/api/buffer), sebagai tempat sementara data yang dikirim dari level 0
3. [Request Buffer](http://localhost:5000/api/request), sebagai tempat sementara untuk menampung permintaan perubahan konfigurasi dari Webserver.
4. [Request IO](http://localhost:5000/api/request_io), sebagai tempat sementara untuk menampung permintaan perubahan I/O dari Webserver.

## Changelog
Lihat CHANGELOG.md.

## Useful Sources: 
Silakan cek file DAFPUS.md untuk mengetahui sumber di balik trik-trik pemrograman yang telah dipelajari.