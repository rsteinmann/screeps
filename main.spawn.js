const My = require('./config')
module.exports = {
    spawnCreeps () {
        // Check each role
        for (const roleName in My.creeps) {
            if (Memory.stats.creeps[roleName] < My.creeps[roleName].max) {
                switch (My.creeps[roleName].class) {
                    case 'workers':
                        this.spawnWorker(roleName)
                        break
                    default:
                        console.log('MainSpawner: Could not find class for role', roleName)
                        break
                }
            }
        }
    },


    /**
     * Spawns a new Worker class creep.
     * @param {String} roleName - 
     */
    spawnWorker (roleName) {
        if (typeof roleName !== 'string') {
            return false
        }
        let energyLevel = 0
        Game.spawns['SpawnRaphiman'].room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                if(["extension", "spawn"].includes(structure.structureType)) {
                    energyLevel += structure.store.getUsedCapacity('energy')
                }
            }
        })
        if (energyLevel < My.creeps[roleName].requiredEnergy) {
            return false
        }
        // Prepare Build
        const creeperBody = My.creeps[roleName].body
        const creeperName = `${roleName.toUpperCase()}_${++Memory.stats.creeps.increment}`
        const creeperData = { memory: {role: roleName } }
        // Construct the creep
        if(this.spawn(creeperBody, creeperName, creeperData)) {
            // Handle increment
            Memory.stats.creeps.increment = Memory.stats.creeps.increment++
            // Assign class
            const newCreeper = Game.creeps[creeperName]
            console.log(`SPAWN: Spawning ${newCreeper.name}`, newCreeper)
        }
    },

    
    /**
     * Generally spawns a creeper and handles spawning feedback.
     * @param {Array} creeperBody 
     * @param {String} creeperName 
     * @param {Object} creeperData
     * @return {Boolean}
     */
    spawn (creeperBody, creeperName, creeperData) {
        if (Game.spawns['SpawnRaphiman'].spawnCreep(creeperBody, creeperName, creeperData) < 0) {
            // Handle errors
            console.log(`SPAWN: Error spawning new ${creeperName}! Code`)
            return false
        } else {
            return true
        }
    }
}