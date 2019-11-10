const MainSpawner = require('./main.spawn')


module.exports.loop = () => {
    const My = require('./config')
    // Stores the current situation
    Memory.stats = {
        creeps: {
            harvester: 0,
            builder: 0,
            increment: Memory.stats.creeps.increment,
        }
    }

    // console.log('---------------------- TICK ----------------------')
    // console.log('SPAWN', Game.spawns['SpawnRaphiman'].store.getUsedCapacity('energy'))
    

    // Clear Memory
    Memory.stats.creeps.harvester = 0
    for (const i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    // Count creeps
    for (const i in Game.creeps) {
        const role = Game.creeps[i].memory.role
        Memory.stats.creeps[role]++
    }
    // Spawn new Creeps
    MainSpawner.spawnCreeps()

    // Creeps
    for (const i in Game.creeps) {

        switch (Game.creeps[i].memory.role) {
            case 'harvester':
                const roleHarvester = require('./role.harvester')
                roleHarvester.init(Game.creeps[i])
                break
            case 'builder':
                const roleBuilder = require('./role.builder')
                roleBuilder.init(Game.creeps[i])
                break
            default:
                console.log(`No role assigned for ${Game.creeps[i]}`)
                break
        }
    }
}

// Important Commands
// Game.spawns.SpawnRaphiman.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], 'Harvester_1', { role: 'harvester' })