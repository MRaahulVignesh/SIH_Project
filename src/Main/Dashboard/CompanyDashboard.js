import React, { Component } from 'react';
import Dashboard2 from './Dashboard2.js'
import Alert from '@material-ui/lab/Alert';
class CompanyDashboard extends Component{
    state = {
        welcome: false,
        name: ""
    }
    componentDidMount(){
        if(typeof this.props.location.state !== "undefined"){
            this.setState({welcome:true})
            this.setState({name:this.props.location.state.name})
        }
    }
    render(){
        return(
            <div style={{overflowY:"hidden"}}>
                {this.state.welcome?
                    <Alert variant="filled" severity="success">
                            Welcome {this.state.name}
                    </Alert>:
                    <div></div>
                }
                <Dashboard2/>
            </div>
        )
    }
}
export default CompanyDashboard