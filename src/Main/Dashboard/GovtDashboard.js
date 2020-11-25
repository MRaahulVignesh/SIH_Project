import React, { Component } from 'react';
import Dashboard from './Dashboard.js'
import Alert from '@material-ui/lab/Alert';

class GovtDashboard extends Component{
    state = {
        welcome: false,
        name: ""
    }
    componentDidMount(){
        if(typeof this.props.location.state !== "undefined"){
            this.setState({welcome:true})
            console.log(this.props.location.state.name)
        }
    }
    render(){

        return(
            <div style={{overflowY:"hidden"}}>
                {this.state.welcome?
                    <Alert variant="filled" severity="success">
                            Welcome {this.props.location.state.name}
                    </Alert>:
                    <div></div>
                }
                <Dashboard/>
            </div>
        )
    }
}
export default GovtDashboard