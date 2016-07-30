import React, { Component } from 'react';
import Room from './room';

var roomsList = [{name: 'Dagobah', capacity: 10, conferenceTable: true, airPlay: true, hammock: false, availability: true}, {name: 'Lovelace', capacity: 6, conferenceTable: true, airPlay: false, hammock: true, availability: false}]

export default class RoomsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rooms: []
    }
  }
  changeRoomState(room) {
    //function to change state in parent of the room selected
    console.log('updating availability for: ', room)
  }
  renderRooms() {
    return this.state.rooms.map(room => <Room toggleState={this.changeRoomState.bind(this)} roomInfo={room} />)
  }

  componentWillMount() {
    //ping server for latest room info then open socket to listen for someone else changing the state
    this.setState({ rooms: this.state.rooms.concat(roomsList) })
  }

  render() {
    return (
      <div> 
        <h2>Rooms</h2> 
        <p>Today, right now</p>
        {this.renderRooms.call(this)}
      </div>
    )
  }
}