/**
 * Looks for the closest owned structure that requires loading.
 * @return {object} - The structure that requires loading.
 */
Creep.prototype.findClosestToLoad = function () {
    // Follows priorities: Spawns > Extensions > Towers
    let energyStructureTargets = {
        spawn: [],
        extension: [],
        tower: []
    }
    this.room.find(FIND_MY_STRUCTURES).forEach(target => {
        if (energyStructureTargets.hasOwnProperty(target.structureType)
            && target.store.getUsedCapacity('energy') < target.store.getCapacity('energy')
        ) {
            energyStructureTargets[target.structureType].push(target)
        }
    })
    // return closest prioritized target
    for(var targetType in energyStructureTargets) {
        if (energyStructureTargets[targetType].length > 0) {
            return this.pos.findClosestByPath(energyStructureTargets[targetType])
        }
    }
    return null
}


Creep.prototype.findClosestUsableSource = function () {
    const sources = this.room.find(FIND_SOURCES)
    const closestSource = this.pos.findClosestByPath(sources)
    // Check if it is not ...
    // const sources = creep.room.find(FIND_SOURCES)
    // sources.forEach(source => {
    //     // 1. is closest
    //     // 2. leftEnergy > requiredEnergy
    //     // 3. queue.length
    //     // YES:
    //     // NO:
    //     console.log('source.pos', source.pos)
    //     console.log('source.energy', source.energy)
    //     console.log('source.energyCapacity', source.energyCapacity)
    //     console.log('source.ticksToRegeneration', source.ticksToRegeneration)
    //     console.log('--- --- --- --- ---')
    // })
    // Calc ticks to fully load creep storage
    return closestSource
}
// TODO: Implement generic task runner
// Creep.prototype.taskQueue = []
// Creep.prototype.currentTask = {}

Creep.prototype.taskHarvest = function (source) {
    const requiredEnergy = this.store.getFreeCapacity()
    // Abort harvest if full
    if (requiredEnergy < 1) {
        this.memory.task = null
        return false
    }
    if (this.harvest(source) === ERR_NOT_IN_RANGE) {
        // TODO: Convert to task
        this.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
    }
}