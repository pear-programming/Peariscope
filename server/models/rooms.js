var db = require('../db.js');

var Room = module.exports

Room.addRooms = function(rooms) {

  // console.log("got room info after organization insert:", rooms, organizationId);
  var roomsWithAvailability= rooms.map((room) => Object.assign(room, {isAvailable: true})); 
  console.log("after mapping:", roomsWithAvailability);
  return db.collection('rooms').insert(roomsWithAvailability)
  .then(data => {
    return data.map((room) => room._id);
  })
  .catch(err => console.log("error inserting rooms:", err))
}


Room.findRooms = function() {
  return db.collection('rooms').find({})
}


Room.changeAvailability = function(roomName) {
  return db.collection('rooms').find({roomName: roomName})
  .then(rooms => {
    if(rooms[0].isAvailable === true) {
      var updatedObj = rooms[0]
      updatedObj.isAvailable = false
      db.collection('rooms').update({roomName: roomName}, updatedObj)
      return 'availability updated to false'
    } else {
      var updatedObj = rooms[0]
      updatedObj.isAvailable = true
      db.collection('rooms').update({roomName: roomName}, updatedObj)
      return 'availability updated to true'
    }
  })
}

