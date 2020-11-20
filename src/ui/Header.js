/************************** Import library/fungsi ****************************/
import React from 'react'

//terkait routing
import { NavLink } from 'react-router-dom'

//modul-modul SemanticUI
import { Menu } from 'semantic-ui-react'

/************************ Deklarasi kelas/komponen ***************************/
const Header = () => (
  <div>
    <h1 className="left-title">Battery Monitoring Lab Indi</h1>
    {/* kenapa div? supaya ButtonGroup nya ke center, nama text-center
        asalnya dari bootstrap-min-js    
      */}
    <div> 
      <Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/config" activeClassName="active">Konfigurasi Admin</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/project_info" activeClassName="active">Informasi Proyek</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/about" activeClassName="active">About Us</NavLink>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  </div>
)

export default Header