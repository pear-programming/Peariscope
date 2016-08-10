import React, { Component } from 'react';

export default class RoomWindow extends Component {

  constructor(props) {
    super(props)   

  }




  render() {
    
    const room = this.props.room


    return (
      <div className="window" >
        <h1>{room.roomName}</h1>
        <img src={room.image} />
        <h3>{ room.isAvailable ? "Open" : "Closed" }</h3>
        <p>Capacity: {room.capacity ? room.capacity : null }</p>
        <p>Projector: { room.projector ? "Yes" : "No" }</p>
        <p>Whiteboard: {room.whiteBoard ? "Yes": "No" }</p>
        <p>TV: {room.tv ? "Yes": "No" }</p>
        <p>AirPlay: {room.airPlay ? "Yes": "No" }</p>  
        <p>Hammock: {room.hammock ? "Yes": "No" }</p>
      </div>
     ) 
  }

}
        