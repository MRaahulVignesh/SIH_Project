import React, { Component } from 'react';
import {Paper,Button} from '@material-ui/core';
import farmerIntro from './farmerintro.png'
class Item extends Component{
    render(){
        return (
            <Paper style={{height:"50vh",width:"75vw",padding:"3%",textAlign:"center",
                            backgroundImage:"linear-gradient(#82C97D,#86B39C)"}}>
                <h2>{this.props.item.name}</h2>
                <img style={{height:"30vh",width:"15vw"}}src={require("./farmerintro.png")}></img>
                <p>{this.props.item.description}</p>
            </Paper>
        )
    }
}

export default Item