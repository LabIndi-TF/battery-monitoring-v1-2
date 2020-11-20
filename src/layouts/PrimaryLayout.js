/************************** Import library/fungsi ****************************/
import React from 'react'

//terkait routing,
import { Switch, Route } from 'react-router-dom'

//Header yang ada di semua layout di dalam Halaman Admin
import Header from '../ui/Header'

//Page-page di dalam layout (lama)
import AdminHome from '../pages/AdminHome'
import AdminProjectInfo from '../pages/AdminProjectInfo'
import AdminConfigMenu from '../pages/AdminConfigMenu'
import AdminAbout from '../pages/AdminAbout'

// modul-modul SemanticUI
import { Container } from 'semantic-ui-react'
import { Header as SemanticHeader } from 'semantic-ui-react'

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
const PrimaryLayout = ({ match,history }) => (
  //<div className="primary-layout">
    <div>
    <main>
      <SemanticHeader as='h3' block>
        <Header />
      </SemanticHeader>
      <Container className="primaryContainer">
        <Switch>
          <Route path="/" exact component={AdminHome} />
          <Route path="/project_info" component={AdminProjectInfo} />
          <Route path="/config" component={AdminConfigMenu} />
          <Route path="/about" component={AdminAbout} />
        </Switch>
       </Container>
    </main>
  </div>
)

export default PrimaryLayout