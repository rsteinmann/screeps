module.exports = {
  init (roomName) {
    const Room = Game.rooms[roomName]
    // Store room info in memory
    if (!Memory.rooms.hasOwnProperty(roomName)) {
      // Write to memory and Link to room object
      Room.memory = Memory.rooms[roomName] = {
        sources: this.initSources (Room),
        structures: {
          towers: this.initTowers (Room),
        }
      }
    }
  },

  
  /**
   * Initializes Source specific data.
   * @param {object} Room 
   */
  initSources (Room) {
    return Room
      .find(FIND_SOURCES)
      .map(source => {
        return {
          x: source.pos.x,
          y: source.pos.y,
          slots: source.calcSlots()
        }
      })
  },


  initTowers (Room) {
    return Room
      .find(FIND_MY_STRUCTURES)
      .filter(structure => structure.structureType === 'tower')
      .map(tower => { return {... {id: tower.id}, ... tower.init()}})
  },
}