/************************** Import library/fungsi ****************************/
// library React dan modul-modul React yang diperlukan
import React, { Component } from 'react'

// modul-modul SemanticUI
import { Button } from 'semantic-ui-react'

// komponen yang dimuat di page
import HomeContent from '../components/HomeContent'

// variabel global
import { localConfigHome } from '../components/ConfigFetcherHome'

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
class HomeMenu extends Component {
  constructor() {
    super();
    this.state = {
      isConfirmed: false,
      isDefault: "Default"
    }
  }

  componentDidMount(){
    this.setState({
      isDefault: localConfigHome.length === 0 ? "Default" : "Custom"
    });
  }

  componentDidUpdate(){
    console.log("updated!");
  }

  submitHandler = (e) => {
    this.setState({
      isConfirmed: true
    });
    //console.log(this.state);
  }

  render() {
    return (
      <>
        {!this.state.isConfirmed && 
          <>
            <h3>Konfigurasi Aktif : {this.state.isDefault}</h3>
            <Button color='blue' onClick={this.submitHandler}> OK </Button>
          </>
        }
        <>
          {this.state.isConfirmed && <HomeContent />}
        </>
      </>
    );
  }
};

export default HomeMenu;