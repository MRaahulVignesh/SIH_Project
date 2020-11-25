import React, { Component } from 'react';
import './Intro.css'
import { Modal, Button } from 'antd';
import "antd/dist/antd.css";
import Ticker from 'react-ticker'
import farmerIntro from './farmerintro.png'
import businessintro from './businessintro.png'
import Carousel from 'react-material-ui-carousel'
import Item from './Item.js'
import flowChart from './flowchart.jpg'

class Intro extends Component{
    state = {
        modal1Visible: false,
        modal2Visible: false,
        modal3Visible: false
    }
    login = (e) => {
        this.props.history.push(`/login`)
    }
    register = (e) => {
        this.props.history.push(`/register`)
    }
    showAim = (e) => {
        this.setState({modal1Visible:true})
    }
    showFlow = (e) => {
        this.setState({modal2Visible:true})
    }
    showScheme = (e) => {
        this.setState({modal3Visible:true})
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    setModal3Visible(modal3Visible) {
        this.setState({ modal3Visible });
    }
    render(){
        var items = [
            {
                name: "Welcome",
                description: "We are here to provide you with the Best Agri products at Best Rates",
                imgSrc: "./businessintro.png"
            },
            {
                name: "Click on the menu to know more",
                imgSrc: "./farmerintro.png"
            }
        ]
        return(
            <div id="intro">
                <Ticker direction="toRight" height="25">
                    {({ index }) => (
                        <>
                            <h3 style={{marginLeft:"7px"}}>{index+1}:300 more entries recently </h3>
                        </>
                    )}
                </Ticker>
                <div id="menu" style={{display:"inline-block",backgroundColor:"black",width:"9vw",height:"100vh"
                                        ,verticalAlign:"top"}}>
                            <Modal
                                title="AIM"
                                centered
                                visible={this.state.modal1Visible}
                                onOk={() => this.setModal1Visible(false)}
                                onCancel={() => this.setModal1Visible(false)}
                                >
                                    <ul>
                                {/* <Button target="_blank" rel="noopener noreferrer" href="https://github.com/rarsahki/SIH_FRONTEND">SCHEME 1</Button> */}
                                        <li>Elimination of middle men, emliowering farmers</li>
                                        <li>Pre-selling of crops and installment based payments for better financial support to the farmers</li>
                                        <li>Direct bank tranfer</li>
                                        <li>Leveraging immutability, openness, decentralization and security of blockchain</li>
                                        <li>Yield and crop quality prediction using ML</li>
                                        <li>A one-stop solution with farmer, company and government dashboards</li>
                                        <li>Government’s dashboard to keep a check on hoarding and manage PSF</li>
                                    </ul>
                            </Modal>
                            <Modal
                                title="FLOW CHART"
                                centered
                                visible={this.state.modal2Visible}
                                onOk={() => this.setModal2Visible(false)}
                                onCancel={() => this.setModal2Visible(false)}
                                >
                                    <img src={flowChart} style={{margin:"auto",width:"40vw",height:"50vh",objectFit:"contain"}}></img>
                            </Modal>
                            <Modal
                                style={{overflow:"auto"}}
                                title="SCHEMES"
                                centered
                                visible={this.state.modal3Visible}
                                onOk={() => this.setModal3Visible(false)}
                                onCancel={() => this.setModal3Visible(false)}
                                >
                                    <ul>E-NAM
                                        <li>National Agriculture Market (eNAM) is a pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.</li>
                                        <Button type="text" target="_blank" rel="noopener noreferrer" href="https://www.enam.gov.in/web/">Know More</Button>
                                    </ul>
                                    <ul>National Mission For Sustainable Agriculture (NMSA)
                                        <li>National Mission for Sustainable Agriculture (NMSA) has been formulated for enhancing agricultural productivity especially in rainfed areas focusing on integrated farming, water use efficiency, soil health management and synergizing resource conservation.</li>
                                        <Button type="text" target="_blank" rel="noopener noreferrer" href="https://nmsa.dac.gov.in/">Know More</Button>
                                    </ul>
                                    <ul>Pradhan Mantri Krishi Sinchai Yojana (PMKSY)
                                        <li>To this effect Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) has been formulated with the vision of extending the coverage of irrigation 'Har Khet ko pani' and improving water use efficiency 'More crop per drop' in a focused manner with end to end solution on source creation, distribution, management, field application and extension activities.</li>
                                        <Button type="text" target="_blank" rel="noopener noreferrer" href="https://pmksy.gov.in/">Know More</Button>
                                    </ul>
                            </Modal>
                        <Button className="antButton" type="text"  style={{color:"white",display:"block",margin:"auto",marginTop:"5vh",fontSize:"2vw",fontFamily:"newFont"}}
                                onClick={(e)=>{this.showAim(e)}}>Aim</Button>
                        <Button className="antButton"type="text"  style={{color:"white",display:"block",margin:"auto",marginTop:"5vh",fontSize:"2vw",fontFamily:"newFont"}}
                                onClick={(e)=>{this.showFlow(e)}}>How?</Button>
                        <Button className="antButton" type="text"  style={{color:"white",display:"block",margin:"auto",marginTop:"5vh",fontSize:"2vw",fontFamily:"newFont"}}
                                onClick={(e)=>{this.showScheme(e)}}>Schemes</Button>
                </div>
                <div style={{display:"inline-block",width:"75vw",height:"100vh",padding:"8.5%"}}>
                    <div style={{width:"75vw",height:"50vh"}}>
                        <Carousel style={{margin:"auto",width:"75vw",height:"50vh"}} navButtonsAlwaysVisible="true">
                            {
                                items.map( (item, i) => <Item key={i} item={item} /> )
                            }
                        </Carousel>
                    </div>
                    <div style={{marginTop:"5vh",width:"75vw"}}>
                        <Button type="text" style={{float:"left"}} onClick={(e) => {this.login(e)}}>LOGIN</Button>
                        <Button type="text" style={{float:"right"}} onClick={(e) => {this.register(e)}}>REGISTER</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Intro;