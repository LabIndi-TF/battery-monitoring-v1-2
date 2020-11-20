## Daftar Pustaka
Berikut adalah sumber dari konsep, trik pemrograman, atau kiat menulis yang diperlukan selama pembuatan aplikasi.

### Konsep pemrograman
0. Tutorial ReactJS (tutorial utama yang digunakan untuk mempelajari ReactJS dari nol) : <br/>
    https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3
1. Konsep React Router (berguna untuk navigasi antar halaman / layout) :<br/>
    https://css-tricks.com/react-router-4/<br/>
    Dengan contoh aplikasi siap jalan sbb :<br/>
    https://codepen.io/bradwestfall/project/editor/XWNWge/?preview_height=50&open_file=src/app.js<br/>
    dan sbb :<br/>
    https://github.com/react-bootstrap/code-sandbox-examples<br/>
2. Menghentikan sesuatu yang di-setInterval :<br/>
    https://stackoverflow.com/questions/45158702/is-it-really-necessary-to-clear-the-timers-before-unmounting-the-component<br/>
    dan cara untuk mengikat variabel Interval ke pemilik kelas (dengan ```this```):<br/>
    https://stackoverflow.com/questions/53533381/clearinterval-not-working-in-componentwillunmount

3. Memaksa pembaruan state walaupun komponen adalah komponen buatan sendiri yang statis : <br />
    https://stackoverflow.com/questions/59631152/how-to-fetch-data-automatically-every-minute-in-react

4. Arrow Function, bentuk fungsi yang mewariskan ```this``` dari scope induk nya : <br />
    https://stackoverflow.com/questions/42204558/reactjs-access-this-in-a-callback <br />
    dan <br />
    https://www.w3schools.com/js/js_es6.asp

5. Good Practice seputar fungsi ```bind``` untuk mengikat fungsi callback tertentu ke event HTML (onClick dan kawan-kawan nya) : <br />
    https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md

6. Menangani pembacaan dari properti / pemberian nilai ke properti activeIndex dari Accordion SemanticUI : <br/>
    https://github.com/Semantic-Org/Semantic-UI-React/issues/2440

7. Trik melewatkan sebuah parameter ke fungsi callback suatu event HTML (misal, memberikan parameter ke onClick. Baca jawaban dari ZenMaster): <br />
    https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method <br/>
    dan :
    https://stackoverflow.com/questions/27397266/onclick-event-binding-in-react-js/39878181#39878181

8. Beberapa use case sederhana seputar pustaka Serial milik Arduino : <br />
    https://forum.arduino.cc/index.php?topic=396450.0

9. Menambah kapasitas heap memory dalam aplikasi React. Terdiri dari bagian-bagian berikut, <br />
    * Dua jenis tempat penyimpanan di bahasa single-threaded, Call Stack dan Memory Heap<br />
      https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204
    * Meningkatkan heap di node js<br/>
      https://stackoverflow.com/questions/53230823/fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-failed-javas <br/>
      dan<br/>
      https://stackoverflow.com/questions/19917401/error-request-entity-too-large 
    * Meningkatkan heap di react <br />
      https://stackoverflow.com/questions/44046366/increase-javascript-heap-size-in-create-react-app-project

10. Seputar setState: <br/>
    https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates/48610973#48610973 

### Komponen-komponen atau modul yang digunakan
1. A very lightweight accordion component in React :<br/>
    https://reactjsexample.com/a-very-lightweight-accordion-component-in-react/
2. React-Bootstrap, salah satu alternatif framework Front-End yang pernah dipakai : <br />
    https://react-bootstrap.github.io/getting-started/introduction<br />
    dan contoh penggunaan Bootstrap sederhana :<br/>
    https://github.com/react-bootstrap/code-sandbox-examples/blob/master/README.md
3. Sebuah contoh kotak dialog File Picker (HTML tag ```<input type="file" />``` ) (Tidak jadi dipakai)<br />
    https://codepen.io/blacksmoke26/pen/ELOREB
4. Pustaka Papaparse untuk melakukan pembacaan file CSV pada lingkungan React <br />
    https://react-papaparse.js.org/
5. SemanticUI-React, salah satu alternatif framework Front-End yang pernah dipakai : <br/>
    https://react.semantic-ui.com/

### Lain-lain
1. Kiat menulis changelog :<br/>
    https://keepachangelog.com/en/0.3.0/



