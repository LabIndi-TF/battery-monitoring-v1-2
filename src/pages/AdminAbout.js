/************************** Import library/fungsi ****************************/
import React from 'react'

// modul-modul SemanticUI
import {Container} from 'semantic-ui-react'

// Komponen yang dimuat di page

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
const AdminAbout = () => (
    <div>
        <h1 className="centeredH1">About</h1>
        <Container text>
        Selamat datang di halaman About. Mungkin nanti di sini isinya 
        adalah profil tim project (baru dua orang doang sih).
        </Container>
    </div>
);
  
  export default AdminAbout;