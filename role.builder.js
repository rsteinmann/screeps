const My = require('./config')
const Tasks = require('./tasks.worker')

module.exports = {
    init (creep) {
        // Run until idle
        if (creep.memory.task !== null) {
            return this.run(creep)
        }
        // Primary: Harvest when empty
        if (creep.store.getUsedCapacity() < creep.store.getCapacity()) {
            creep.say('harvest')
            console.log(creep, 'new order: harvest')
            creep.memory.task = 'harvest'
            return this.run(creep)
        }

        // Secondary: repair buildings
        const toRepair = Game.rooms['E24N31'].find(FIND_STRUCTURES, { 
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        })
        if (toRepair.length > 0) {
            creep.say('repair')
            console.log(creep, 'new order: repair')
            creep.memory.task = 'repair'
        }
        // Tertiary: build buildings
        else if (creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)) {
            creep.say('build')
            console.log(creep, 'new order: build')
            creep.memory.task = 'build'
        }
        return this.run(creep)
    },


    run (creep, task) {
        task = task || creep.memory.task
        // Set Creeper to work...
        if (['harvest', 'build', 'repair'].includes(task)) {
            this.runTask(creep, task)
        } else {
            creep.memory.task = null
            creep.say('Idle')
            console.log(creep, 'is Idle!')
        }
    },


    runTask (creep, task) {
        // reinit when not successful
        if (!(Tasks[task](creep))) {
            this.init(creep)
        }
    },
}