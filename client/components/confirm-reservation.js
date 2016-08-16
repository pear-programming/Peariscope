import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js'
import Calendar from './calendar';
import Room from './room'; 
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


export default class ConfirmReservation extends React.Component {

	constructor(props){ 
    super(props)
    
    this.state = {
      
    }
  }

  render() {

    // console.log("showing props in confirm-reservation.js:", this.props);

    return (
      <Modal show={this.props.showConfirm} onHide={() => this.props.closeConfirm(false)}>
        <Modal.Header closeButton>
        <div className="verifyTitleContainer">
          <Modal.Title><span className="roomTitle">Confirm Reservation</span></Modal.Title>
        </div>
        </Modal.Header>
        <Modal.Body className="clearfix">
         
          
          <div className="roomAvailability">
            <h3>Here are your booking details.  Click confirm to secure your reservation</h3> 
          </div>
          <div className="roomDetails">
            <p> Room: {this.props.reservation.roomName} </p>
            <p> Date: {this.props.MONTHS[new Date(this.props.reservation.startTime).getMonth()] + ' ' + new Date(this.props.reservation.startTime).getDate().toString()} </p>
            <p> StartTime: {formatTime(this.props.reservation.startTime)} </p>
            <p> EndTime: {formatTime(this.props.reservation.endTime)} </p>  
          </div>
          
          <div>
            <button onClick={() => this.props.closeConfirm(true)}>Confirm</button>
            <button onClick={() => this.props.closeConfirm(false)}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

