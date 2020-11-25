import React, { Component } from 'react';
import Ticker from 'react-ticker'
import './Crop.css'
import { Modal, Button } from 'antd';

class Crop extends Component{
    state = {
        modalVisible: false
    }
    showDialog = (e) => {
        this.setState({modalVisible:true})
    }
    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
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
                <div id="crop">
                    <div id="crops">
                        <div id="cropItems">
                            <div className="cropItem1">
                                <p className="itemName">WHEAT</p>
                                <Button type="text" className="buy">BUY</Button>
                                <Button type ="text" className="details">DETAILS</Button>
                            </div>
                            <div className="cropItem2">
                                <p className="itemName">WHEAT</p>
                                <Button type="text" className="buy">BUY</Button>
                                <Button type ="text" className="details">DETAILS</Button>
                            </div>
                        </div>
                        <div id="cropItems">
                        <div className="cropItem1">
                                <p className="itemName">WHEAT</p>
                                <Button type="text" className="buy">BUY</Button>
                                <Button type ="text" className="details">DETAILS</Button>
                            </div>
                            <div className="cropItem2">
                                <p className="itemName">WHEAT</p>
                                <Button type="text" className="buy">BUY</Button>
                                <Button type ="text" className="details">DETAILS</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="menu" style={{display:"inline-block",backgroundColor:"lightgreen",width:"8.75vw",height:"100vh"
                                        ,verticalAlign:"top"}}>
                            <Modal
                                title="Vertically centered modal dialog"
                                centered
                                visible={this.state.modalVisible}
                                onOk={() => this.setModalVisible(false)}
                                onCancel={() => this.setModalVisible(false)}
                                >
                                <p>some contents...</p>
                                <p>some contents...</p>
                                <p>some contents...</p>
                            </Modal>
                        <Button className="antButton" type="text"  style={{display:"block",margin:"auto",marginTop:"5vh",fontSize:"3vh",fontFamily:"'Courier New', Courier, monospace"}}
                                onClick={(e)=>{this.showDialog(e)}}>Aim</Button>
                        <Button className="antButton"type="text"  style={{display:"block",margin:"auto",marginTop:"5vh",fontSize:"3vh",fontFamily:"'Courier New', Courier, monospace"}}
                                onClick={(e)=>{this.showDialog(e)}}>How?</Button>
                        <Button className="antButton" type="text"  style={{display:"block",margin:"auto",marginTop:"5vh",fontSize:"3vh",fontFamily:"'Courier New', Courier, monospace",overflow:"hidden"}}
                                onClick={(e)=>{this.showDialog(e)}}>Schemes</Button>
                </div>
            </div>
        )
    }
}

export default Crop