/**
 * Calculates the slots.
 */
Source.prototype.calcSlots = function () {
  let slots = [], x, y;
  for (x = this.pos.x - 1; x < this.pos.x + 2; x++) {
    for (y = this.pos.y - 1; y < this.pos.y + 2; y++) {
      // Check sourrounding terrain: 'wall' | 'swamp' | 'plain'
      const terrain = this.room.lookAt(x, y).filter(objects => objects.type === 'terrain')[0].terrain
      if(terrain !== 'wall') {
        slots.push({x: x, y: y})
      }
    }
  }
  console.log('Fetched slots for source', this, slots)
  return slots
}

/**
 * Returns all slots for the source.
 */
Source.prototype.getSlots = function () {
  return Memory.rooms[this.room.name].sources.filter(source => source.x === this.pos.x && source.y === this.pos.y)[0].slots
}

/**
 * Returns total number of slots for the source.
 */
Source.prototype.getSlotCapacity = function () {
  return this.getSlots().length
}


/**
 * Returns number of used slots for the source.
 */
Source.prototype.getUsedSlotCapacity = function () {
  return this.getSlotCapacity() - this.getFreeSlotCapacity()
}


/**
 * Returns number of free slots for the source.
 */
Source.prototype.getFreeSlotCapacity = function () {
  return this.getFreeSlots().length
}


/**
 * Returns next available free slot for the source.
 */
Source.prototype.getFreeSlot = function () {
  const freeSlots = this.getFreeSlots()
  return freeSlots.length > 0 ? freeSlots[0] : null
}


/**
 * Returns an array of available free slots for the source.
 */
Source.prototype.getFreeSlots = function () {
  let freeSlots = []
  this.getSlots().forEach(slot => {
    const creeps = this.room.lookAt(slot.x, slot.y).filter(object => object.type === 'creep' )[0]
    if (typeof creeps !== 'undefined') {
      return
    }
    // TODO: CHECK FOR BLOCKING STRUCTURES!
    // const structures = this.room.lookAt(slot.x, slot.y).filter(object => object.type === 'structure' )[0]
    // console.log('structures', structures)
    freeSlots.push(slot)
  })
  return freeSlots
}
