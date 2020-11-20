# Changelog
All notable changes to this project will be documented in this file.<br/>
**FORMAT TANGGAL : YYYY-MM-DD <br/>**

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.2] - 2020-11-20

### Added
- Panel I/O untuk 8 buah DI dan 8 buah AI yang diletakkan di Group Tag 1A milik Device 1. Diatur untuk menuliskan data ke Hardware AC monitoring. Penulisan data ke level 0 dilakukan jika data diubah saja, tidak setiap saat.
- Fasilitas untuk melakukan konfigurasi label, scaling, dan aksesibilitas dari tombol DI serta slider AI.
- Variabel konfigurasi dan data buffer milik DI dan AI generik dengan kapasitas 256 buah data. Pada versi ini, digunakan 8 item pertama untuk masing-masing input.
- Link Router baru, yaitu http://localhost:5000/api/request_io yang berfungsi untuk tempat buffer permintaan perubahan I/O dari webserver

### Changed
- Konfigurasi default sekarang disediakan dalam lebih dari 1 file. Harapannya, dengan copy-paste konfigurasi, use case dapat diganti dengan cepat.
- Tombol-tombol panel DI difungsikan 7 buah, slider panel AI belum difungsikan. Kedua jenis tersebut sudah di-generate untuk sisi Javascript.
- Bentuk variabel konfigurasi yang dimuat pada halaman Konfigurasi diubah dengan ditambahkannya konfigurasi I/O untuk setiap grouptag. Variabel ini dimuat sekaligus ketika halaman Home dimuat.
- Server Node (node_server.js) kini hanya memuat data kiriman dari arduino ke buffer jika ditandai dengan kode fungsi ```0x11```. Hal ini diterapkan untuk  mencegah terjadinya pembacaan yang tidak konsisten.

## [1.1] - 2020-11-02

### Added
- Generator buffer Dummy berupa integer random antara 800 - 1200, dan sebuah timestamp dengan format ```hh:mm:ss```. Mewakili struktur buffer baru yang dikirim dari node server dan diterima React Webserver.
- Halaman http://localhost:5000/api/request sebagai buffer komunikasi arah bawah (Webserver ke node server). Diisi bila terdapat perubahan yang dilakukan dari halaman Konfigurasi Admin.
- Fungsi untuk mengirim (HTTP POST) konfigurasi baru ke node server, dan menerima (HTTP GET) data buffer saat ini serta konfigurasi aktif saat ini.
- Tampilan pada halaman Home sekarang sudah memuat dua komponen : tabel berisi nama dan nilai saat ini, dan sebuah chart yang merekam perubahan nilai tersebut.
- Konektivitas dengan Arduino yang melakukan generate data dummy yang bentuknya sama dengan data Dummy.
- Fungsi scaling untuk data-data yang dimuat di chart, dan mapping berdasarkan indeks (0-255) dan device nya. Dari 5 device yang direncanakan, baru 2 yang dapat dijalankan di versi ini: Dummy dan Arduino.

### Changed
- Komponen-komponen HTML yang ada dalam halaman Konfigurasi Admin sekarang berubah menjadi Controlled Element (perubahan nilainya dipantau framework React), dan masing-masing komponen tadi adalah unik.
- Tulisan-tulisan nama Device dan Group Tag pada tampilan pada menu Home sekarang mengikuti konfigurasi apa yang aktif saat ini.
- Struktur file dan folder sudah dirapikan sedemikian rupa sehingga mengikuti kaidah (sementara) berikut:
    - folder ./src/components memuat komponen terkecil yang dapat dimuat dalam suatu page, atau elemen UI di dalam page.
    - folder ./src/config memuat konfigurasi default yang dimuat saat aplikasi pertama kali dijalankan
    - folder ./src/layouts memuat Primary Layout, yaitu layout utama aplikasi. Berisi 4 buah router (menu yang dapat diakses pengguna), dan wilayah kosong yang memuat konten menu terpilih.
    - folder ./src/pages  memuat halaman-halaman yang dimuat di dalam PrimaryLayout.
    - folder ./src/ui memuat elemen-elemen UI yang mungkin dimuat di dalam halaman tadi (bisa saja dalam satu halaman ada dua elemen UI yang berbeda peruntukkannya. Saat ini, masing-masing halaman memuat satu elemen UI)
    - App.js sekarang memuat Router, dan di dalam Router terdapat Header.js (di dalam ./src/ui), dan PrimaryLayout.js
- Websocket yang dikembangkan dari versi sebelumnya (0.4-0.5) sekarang sudah difungsikan lagi, dengan sedikit perubahan jalur, dan bentuk buffer baru.

## [1.0] - 2020-10-09

### Added
- Bentuk program yang siap menerima User Requirement baru

### Changed
- Struktur aplikasi WebServer berubah total, dikarenakan User Requirement yang berubah. Sekarang, aplikasi single page tidak memerlukan login user, dan fungsi ini dipindahkan ke halaman khusus konfigurasi.
- Struktur file berubah, di mana rencananya konten yang dimuat di router adalah yang ada di dalam ./src/pages
- Fungsi Fetcher untuk WebSocket dikembangkan dari versi sebelumnya, tetapi belum difungsikan.

## [0.5 - Unreleased]

### Changed
- Struktur file diubah sedikit. Sekarang MainWindow adalah komponen induk, berada di ./src/components, dan dimuat oleh halaman ExistBatmon.
- Perubahan struktur file membuat struktur Router (penggantian halaman berdasarkan link) juga berubah. Perubahan dapat disorot pada file :
  - ./src/ui/Header.js (komponen menu bar di bawah judul)
  - ./src/layouts/PrimaryLayout.js (layout utama yang dimuat jika user berhasil login)
  - ./src/Pages/ExistBatmon.js (sekarang komponen MainWindow ada di dalam halaman ini)

### Reminder
- Cek urutan variabel di halaman ReadCSV. Saat ini, timestamp ditempatkan pada kolom terakhir di dalam variabel dataset lokal milik halaman tersebut.
- Pikirkan cara untuk melakukan penskalaan pada variabel selain dummy. Fungsi ScaleDummy() mudah diimplementasikan karena datanya ada dalam satu chart, dan hanya chart itu saja. Dataset lain terpencar dalam tiga device yang berbeda, sehingga fungsi scaling nya perlu dibuat adaptif terhadap pilihan chart aktif.

## [0.4] - 2020-09-22

### Added
- Fitur Scaling pada bagian Eng. Unit Setup sekarang sudah difungsikan, tapi saat ini hanya untuk data dummy saja
- Kemampuan untuk menerima data lebih dari satu baterai. Versi ini dicobakan untuk data dari 2 device ADC yang terhubung dengan AI Signal Injector.
- Melengkapi komentar-komentar pada program (masih dalam proses, belum selesai)

### Changed
- Nama device disesuaikan dengan kasus nyata, tetapi dengan sinyal uji dari Signal Injector : Battery (4 tegangan + 1 arus), Motor_Stepper (2 tegangan), dan Controller (2 tegangan). Device Dummy masih ada.
- Jumlah data yang ditampilkan untuk Device pada chart disesuaikan

### Removed
- Data statis pada device selain device pertama dibuang (karena sudah ditambahkan data dari Signal Injector)

## [0.3] - 2020-09-15

### Added
- Folder ./backend/standalones/csvLogs yang memuat contoh-contoh file CSV yang bisa dibaca
- Program mandiri node_csv sebagai pembelajaran pembacaan CSV di node.js
- Halaman baru : Read CSV (sudah dengan isinya) dan Eng. Unit Setup (belum diisi)
- Melengkapi komentar-komentar pada program (masih dalam proses, belum selesai)

### Changed
- Referensi-referensi komponen DOM HTML diganti cara aksesnya menjadi ala React. <br /> 
    Contohnya ```document.getElementById``` menjadi ```this.<Sebuah nama Ref>.current```.
- Komponen Selector sekarang melewatkan prop berupa id device terpilih ke dalam ChartComp, dan interaksi update ChartComp didasarkan pada prop ini.

## [0.2] - 2020-09-09

### Added
- Halaman login, dan layout dasar dengan konsep React-Router
- User pertama "root" sebagai admin aplikasi
- Folder ./backend/standalones yang memuat snippet-snippet program yang berdiri sendiri. Berlaku juga sebagai folder sandboxing
- Folder  ./src/css yang memuat css global untuk seluruh komponen/layout
- Penggunaan (React-)Bootstrap untuk elemen-elemen UI

### Changed
- Data dummy menjadi data serial (Arduino di COM4)
- Komponen chart sekarang berhenti melakukan polling data dari server jika halaman yang memuatnya tidak aktif (di unmount)
- File aplikasi utama (App.js) sekarang tidak memuat MainWindow (komponen berisi chart), tetapi Router - yaitu modul yang menampilkan konten tergantung url aktif, yang dapat diubah dengan klik menu di bawah judul.

## [0.1] - 2020-09-04

### Added
- Fitur pembaca data serial (generator angka random di comment)
- [Sebuah server dummy](http://localhost:5000) yang hanya menampung GET data dari serial
- Folder ./backend untuk memuat aplikasi yang harus berjalan di balik layar (server)

### Changed
- Data dummy menjadi data serial (Arduino di COM4)
- Perlu 2 terminal untuk menjalankan dua file yang berbeda (node untuk server, npm start untuk client)

## [0.0] - 2020-09-02

### Added
- Upload awal

### Changed
- Perubahan basis program dari tampilan web statis (HTML-JS-PHP) ke React-app

### Removed
- Halaman login pada web statis