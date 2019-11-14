const My = require('./config')

module.exports = {

    /**
     * Harvest an energy resource until creep is full.
     * @param {creep} creep 
     */
    harvest (creep) {
        const requiredEnergy = creep.store.getFreeCapacity()
        // console.log('requiredEnergy', requiredEnergy)
        // Abort harvest if full
        if (requiredEnergy < 1) {
            creep.memory.task = null
            return false
        }
        const energySource = creep.findClosestUsableSource()
        creep.taskHarvest(energySource)
        return true
    },


    /**
     * Transfers energy to spawn until full or creep is empty.
     * @param {creep} creep 
     */
    transfer (creep) {
        const transferTarget = creep.findClosestToLoad()
        if (!transferTarget) {
            creep.say('no target')
            console.log(creep, 'No target for transfer set! Skipping transfer...')
            creep.memory.task = null
            return false
        }
        if (creep.store.getFreeCapacity() === creep.store.getCapacity('energy')) {
            creep.say('empty')
            console.log(creep, 'storage is empty! Skipping transfer...')
            creep.memory.task = null
            return false
        }
        if (transferTarget && transferTarget.store.getFreeCapacity('energy') === 0) {
            creep.say('full')
            console.log(creep, 'Spawn is full! Skipping transfer...')
            creep.memory.task = null
            return false
        }
        if (creep.transfer(transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(transferTarget)
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
     * Repairs buildings that have not full hitpoints until empty.
     * @param {creep} creep 
     */
    repair (creep) {
        if (creep.store.getFreeCapacity() === creep.store.getCapacity('energy')) {
            creep.say('empty')
            console.log(creep, 'storage is empty! Skipping build...')
            creep.memory.task = null
            return false
        }
        const toRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, { 
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        })
        if (!toRepair) {
            creep.memory.task = null
            return false
        }
        if (creep.repair(toRepair) === ERR_NOT_IN_RANGE) {
            creep.moveTo(toRepair)
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
            creep.memory.task = null
            return false
        }
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite)
        }
        return true
    }
}