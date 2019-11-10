const My = require('./config')

module.exports = {
    creep: null,

    init (creep) {
        this.creep = creep || this.creep

        // Run until idle
        if (this.creep.memory.action !== null) {
            return this.run()
        }

        // Primary: Harvest when empty
        if (this.creep.store.getUsedCapacity() < this.creep.store.getCapacity()) {
            this.creep.memory.action = 'harvest'
            return this.run()
        }

        // Secondary: transfer to spawn || upgrade controller
        if (My.spawn.store.getCapacity('energy') > 0) {
            this.creep.memory.action = 'transfer'
        } else {
            this.creep.memory.action = 'upgrade'
        }
        return this.run()
    },

    run (action) {
        action = action || this.creep.memory.action
        // Set Creeper to work...
        switch (action) {
            case 'harvest':
                this.harvest()
                break
            case 'transfer':
                this.transfer()
                break
            case 'upgrade':
                this.upgrade()
                break
            default:
                this.creep.memory.action = null
                console.log(`Creep ${this.creep.name} is Idle!`)
        }
    },

    harvest () {
        if (this.creep.store.getFreeCapacity() <= 0) {
            console.log(`Harvester ${this.creep.name} is Filled!`)
            return this.reset()
        }
        console.log(`Creep ${this.creep.name} is now harvesting!`)
        // Choose closest energy source
        const energySource = this.creep.pos.findClosestByPath(FIND_SOURCES)
        if (this.creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(energySource)
        }
        return true
    },

    transfer () {
        if (this.creep.store.getFreeCapacity() === this.creep.store.getCapacity('energy')) {
            console.log(`Harvester ${this.creep.name} is Empty!`)
            return this.setAction('harvest')
        }
        if (My.spawn.store.getFreeCapacity('energy') === 0) {
            console.log(`Spawn is full!`)
            return this.reset()
        }
        console.log(`Creep ${this.creep.name} is now transfering!`)
        const transferTarget = My.spawn || null
        if (transferTarget !== null) {
            if (this.creep.transfer(transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.creep.moveTo(transferTarget)
            }
        } else {
            console.log('No target for transfer set for creep:', this.creep)
        }
        return true
    },

    upgrade () {
        if (this.creep.store.getFreeCapacity() === this.creep.store.getCapacity('energy')) {
            return this.setAction('harvest')
        }
        console.log(`Creep ${this.creep.name} is now upgrading!`, this.creep.room.controller, this.creep.upgradeController(this.creep.room.controller))
        if (this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller)
        }
        return true
    },

    reset () {
        this.creep.memory.action = null
        return this.init()
    },

    setAction (action) {
        this.creep.memory.action = action
        return this.run(action)
    }
}
