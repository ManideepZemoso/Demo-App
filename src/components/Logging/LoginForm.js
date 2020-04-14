import React from "react";
import Input from '@material-ui/core/Input';
import GetData from './ValidCredentials.json';




export default class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            username: '',
            password: '',
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        let isSuccesfulLogin=false;
        for(let i=0;i<GetData.length;i++){
            if(this.state.username === GetData[i].username && this.state.password === GetData[i].password){
                //alert("login successful");
                isSuccesfulLogin=true;
            }
            console.log(this.state.username === GetData[i].username);
        }
        if(isSuccesfulLogin){
            window.sessionStorage.setItem('isAuthenticated','true');
            this.props.history.push("/");
        }
        else{
            alert("Your username and password did not match in our system");
        }
    }
    render() {
        return (
            <div className="loginformStyle">
                <div>
                    <h1 style={{alignment:'center' ,top:'200px',width:'200px' } }>Login Form</h1>
                </div>
                <form style={{alignContent:'space-between'}}>{/*style={{textAlign:'center',display:'grid',top:'200px',left:'900px',right:'200px' ,border: '1px solid #f1f1f1',width:'200px',height:'300px',alignContent: 'space-between',}}*/}
                    <Input placeholder="Username"
                           value={this.state.username}
                           onChange={e => this.setState({username: e.target.value})}
                           style={{padding:'12px 20px'}}
                           inputProps={{ 'aria-label': 'description','type':'text',  'width': '100%','padding': '12px 20px','margin': '8px 0','display': 'inline-block','border': '1px solid #ccc'}} />
                    <br />
                    <Input placeholder="Password"
                           value={this.state.password}
                           onChange={e => this.setState({password: e.target.value})}
                           style={{padding:'12px 20px'}}
                           inputProps={{ 'aria-label': 'description','type':'password','align':'center','width': '100%','margin': '8px 0','display': 'inline-block','border': '1px solid #ccc'}} />
                    <br />
                    <br />
                    <button style={{backgroundColor:'#3f51b5',width:'200px',color:'white',height:'40px',paddingBottom:'20px', paddingtop:'30px',fontSize:'20px'}} onClick={e => this.onSubmit(e)}>
                        LogIn
                    </button>

                </form>

            </div>

        );
    }
}
