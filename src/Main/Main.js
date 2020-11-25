import React, { Component } from 'react';
import './Main.css'
import Ticker from 'react-ticker'
import { Button } from 'antd';

class Main extends Component{
    redirect = (e) => {
        this.props.history.push(`/crop`);
    }
    render(){
        return(
            <div id="main">
                <Ticker direction="toRight" height="30">
                    {({ index }) => (
                        <div style={{fontFamily:"'Times New Roman', Times, serif"}}>
                            <h2>This is the Headline of element #{index}!</h2>
                            <img src="www.my-image-source.com/" alt=""/>
                        </div>
                    )}
                </Ticker>
                <div id="image">
                        <Button type="primary" shape="circle" size="medium"
                            style={{position:"absolute",bottom:"10.5vh",left:"46vw"}}>HOME</Button>
                        <Button type="primary" shape="circle" size="medium"
                            style={{position:"absolute",top:"19.5vh",left:"46vw"}}
                            onClick={(e)=>{this.redirect(e)}}>CROPS</Button>
                        <Button type="primary" shape="circle" size="medium"
                            style={{position:"absolute",top:"25.5vh",left:"36vw"}}>BENEFITS</Button>
                        <Button type="primary" shape="circle" size="medium"
                            style={{position:"absolute",top:"25.5vh",right:"38vw"}}>REGISTER CROP</Button>
                </div>
            </div>
        )
    }
}

export default Main;