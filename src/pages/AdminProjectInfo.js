/************************** Import library/fungsi ****************************/
import React from 'react'

// modul-modul SemanticUI
import {Container} from 'semantic-ui-react'

/************************ Deklarasi kelas/komponen ***************************/
const AdminProjectInfo = () => (
  <div>
    <h1 className="centeredH1">Project Information</h1>
    <Container text>
      Selamat datang di halaman Project Information. Mungkin nanti di sini 
      isinya adalah detil project ini.
    </Container>
  </div>
);

export default AdminProjectInfo;