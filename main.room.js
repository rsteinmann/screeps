module.exports = {
  init (roomName) {
    const Room = Game.rooms[roomName]
    // Store room info in memory
    if (!Memory.rooms.hasOwnProperty(roomName)) {
      Memory.rooms[roomName] = {
        sources: this.initSources(Room)
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
  }
}