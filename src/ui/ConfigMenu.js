/************************** Import library/fungsi ****************************/
// library React dan modul-modul React yang diperlukan
import React,{Component} from 'react'

// modul-modul SemanticUI
import { Form, Input } from 'semantic-ui-react'

// komponen yang dimuat di page
import ConfigContent from '../components/ConfigContent'

/************************ Deklarasi objek/variabel ***************************/

/************************ Deklarasi kelas/komponen ***************************/
class ConfigMenu extends Component{
    constructor(){
        super();
        this.state={
            login:{
                username:'',
                password:''
            },
            isLoggedIn:false
        }
    }

    changeHandler = (e, { name, value }) => this.setState({ [name]: value })

    submitHandler = (e) => {
        const { username,password } = this.state;
        this.setState({
            isLoggedIn: (username==="root" && password==="password") ? true : false
        });
        !(username==="root" && password==="password") ? alert("Username atau Password salah!") : console.log("Login Sukses!");
        //console.log(this.state);
    }

    render(){
        return(
            <>
                <Form>
                    <Form.Group widths='equal'>
                    <Form.Field>
                        <Input fluid 
                        inline='true'
                        placeholder='Username' 
                        name='username' 
                        onChange={this.changeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input fluid 
                        inline='true'
                        placeholder='Password' 
                        type='password' 
                        name='password' 
                        onChange={this.changeHandler}
                        />
                    </Form.Field>
                    <Form.Button fluid content='Submit' onClick={this.submitHandler}/>
                    </Form.Group>
                </Form>
                <>
                    {this.state.isLoggedIn && <ConfigContent/>}
                </>
            </>
        );
    }
};

export default ConfigMenu;