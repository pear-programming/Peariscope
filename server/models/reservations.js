var db = require('../db.js');
var Room = require('./rooms.js');

var Reservation = module.exports
//reservations

Reservation.findByRoomId = function(Id) {
  return db.collection('reservations').find({id: id})
  .then((reservations) => {
  return reservations
  })
}


Reservation.deleteIt = function() {
  return db.collection('reservations').remove({roomName: "Turing"})
}

Reservation.create = function(reservationData) { 

  if(typeof reservationData.startTime === 'string') {
    reservationData.startTime = new Date(Date.parse(reservationData.startTime));
    reservationData.endTime = new Date(Date.parse(reservationData.endTime));
    reservationData.roomId = db.ObjectId(reservationData.roomId);
  }

  return db.collection('reservations').insert(reservationData)//reservations
  .then((data) => {
    console.log("successfully inserted reservation!:", data._id)
    return data._id;
  })
}


Reservation.delete = function(reservationId){
  if( Object.keys(reservationId).length === 0 ){
    return null;
  }
  else if (typeof reservationId._id === "string"){
    reservationId._id = db.ObjectId(reservationId._id)
      return db.collection('reservations').remove(reservationId)//reservations
      .then((data) => {
        console.log("successfully canceled reservation!:", data)
        return data;
    }) .catch(err => console.log('error in reservation: ', err))

  }
  else {
  return db.collection('reservations').remove(db.ObjectId(reservationId))//reservations
    .then((data) => {
      console.log("successfully canceled reservation from string!:", data)
      return "success";
  }) .catch(err => console.log('error in reservation: ', err))
}
}



Reservation.findAllReservations = function() {
  return db.collection('reservations').find({})
  .then(reservationsData => {
    return reservationsData;
  })
}

Reservation.findByName = function(name) {
  return db.collection('rooms').find({roomName: name})
  .then(room => {
    if(room[0]){
      console.log('room[0]._id: ', room[0]._id)
      return room[0]._id
    } else {
      throw new Error('room name does not exist')
    }
  })
  .then(id => {
    return db.collection('reservations').find({roomId: id})
  })
  .then(roomReservationData => {
    if(roomReservationData[0]) {
      return roomReservationData;
    } else {
      return 'no reservations currently exist for this room'
    }
    console.log('roomReservationData: ', roomReservationData)
  })
  .catch(err => console.log('error in findByName: ',err))
}

Reservation.findByUserId = function(userId) {
  return db.collection('reservations').find({userId: userId})
}

Reservation.updateReservation = function(resId, newInfo) {


  if(typeof newInfo.startTime === 'string') {
    newInfo.startTime = new Date(Date.parse(newInfo.startTime));
    newInfo.endTime = new Date(Date.parse(newInfo.endTime));
    newInfo.roomId = db.ObjectId(newInfo.roomId);
  }

  return db.collection('reservations').remove({_id: db.ObjectId(resId)})
  .then(x => {

    var withoutId = Object.assign(newInfo)
    delete withoutId._id;

    return db.collection('reservations').insert(withoutId)
    .then(data => {

      return data;
    })
    .catch(err => console.log("error:", err))
  })

}

Reservation.makeSlots = function(reservationData) {

  var timeSlots = [];
  var start = new Date(2016, 6, 31, 19, 0)
  var end = new Date(2016, 10, 31, 19, 0)

  var thirtyMin = 1800000
  var startTime = Object.assign(start);
  var endTime = new Date(startTime.getTime() + thirtyMin);

  while(startTime.getTime() < end.getTime()) {

    timeSlots.push({startTime: startTime, endTime: endTime, reservations: [], isAvailable: true})
    startTime = Object.assign(endTime);
    endTime = new Date(endTime.getTime() + thirtyMin)
  }

  return Room.findRooms()
    .then((rooms) => {

      console.log("showing number of rooms:", rooms.length);

    reservationData.forEach((reservation) => {

      timeSlots.forEach((timeSlot) => {

        if(reservation.startTime.getTime() == timeSlot.startTime.getTime() ||
          (reservation.startTime.getTime() < timeSlot.startTime.getTime() &&
            reservation.endTime.getTime() >= timeSlot.endTime.getTime())) {
          timeSlot.reservations.push(reservation)
        }
        if(timeSlot.reservations.length >= 2) {
          timeSlot.isAvailable = false;
        }
      })
    })

    return timeSlots;

  })
}
