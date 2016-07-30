import React, { Component } from 'react';
import {Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';

export default class Room extends Component {

  constructor(props){  
    super(props)

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);


    this.state = { 
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  render() {
    const room = this.props.roomInfo
    return (
      <div key={room.name}>
        <span onClick={this.open}>{room.name}</span>
      
        <span><label className="switch">
         {room.availability ? <input type="checkbox" onChange={() => this.props.toggleState(room)} defaultChecked /> : <input type="checkbox" onChange={() => this.props.toggleState(room)}  /> }
          <div className="slider round"></div>
        </label></span>
        {room.availability ? 'Open' : 'Closed'}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.mode}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4> {room.name} </h4>
            <p> Capacity: {room.capacity} </p>
            <p> Conference Table: {room.conferenceTable ? "Yes" : "No"} </p>
            <p> Air-play: {room.airPlay ? "Yes" : "No"} </p>
            <p> Hammock: {room.hammock ? "Yes" : "No"} </p>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`${this.props.roomInfo.name}/display`} ><Button>Display</Button></Link>
          </Modal.Footer>
        </Modal>
      </div>

    )
  }
}