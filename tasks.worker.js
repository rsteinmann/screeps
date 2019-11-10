const My = require('./config')

module.exports = {

    /**
     * Harvest an energy resource until creep is full.
     * @param {creep} creep 
     */
    harvest (creep) {
        if (creep.store.getFreeCapacity() <= 0) {
            creep.say('full')
            console.log(creep, 'storage is full! Skipping harvest...')
            creep.memory.task = null
            return false
        }
        const energySource = creep.pos.findClosestByPath(FIND_SOURCES)
        if (creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(energySource)
        }
        return true
    },


    /**
     * Transfers energy to spawn until full or creep is empty.
     * @param {creep} creep 
     */
    transfer (creep) {
        if (creep.store.getFreeCapacity() === creep.store.getCapacity('energy')) {
            creep.say('empty')
            console.log(creep, 'storage is empty! Skipping transfer...')
            creep.memory.task = null
            return false
        }
        if (My.spawn.store.getFreeCapacity('energy') === 0) {
            creep.say('full')
            console.log(creep, 'Spawn is full! Skipping transfer...')
            creep.memory.task = false
            return false
        }
        const transferTarget = My.spawn || null
        if (transferTarget) {
            if (creep.transfer(transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(transferTarget)
            }
        } else {
            console.log(creep, 'No target for transfer set!')
        }
        return true
    },


    /**
     * Transfers energy to controller until empty.
     * @param {creep} creep 
     */
    upgrade (creep) {
        if (creep.store.getFreeCapacity() === creep.store.getCapacity('energy')) {
            creep.say('empty')
            console.log(creep, 'storage is empty! Skipping upgrade...')
            creep.memory.task = null
            return false
        }
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller)
        }
        return true
    },


    /**
     * Builds any nearby building until empty.
     * @param {creep} creep 
     */
    build (creep) {
        if (creep.store.getFreeCapacity() === creep.store.getCapacity('energy')) {
            creep.say('empty')
            console.log(creep, 'storage is empty! Skipping build...')
            creep.memory.task = null
            return false
        }
        const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
        if (!constructionSite) {
            return false
        }
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite)
        }
        return true
    }
}