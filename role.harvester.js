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

        // Secondary: transfer to spawn
        if (Game.spawns['SpawnRaphiman'].store.getFreeCapacity('energy') <= 0) {
            creep.say('upgrade')
            console.log(creep, 'new order: upgrade')
            creep.memory.task = 'upgrade'
        }
        // Tertiary: upgrade controller
        else {
            creep.say('transfer')
            console.log(creep, 'new order: transfer')
            creep.memory.task = 'transfer'
        }
        return this.run(creep)
    },
    

    run (creep, task) {
        task = task || creep.memory.task
        // Set Creeper to work...
        if (['harvest', 'transfer', 'upgrade'].includes(task)) {
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
