
module.exports.loop = () => {
    const My = require('./config')
    let Is = { creeps: { harvester: 0 } }

    // Construct Creeps
    for (const i in Game.creeps) {
        if (Game.creeps[i].memory.role === 'harvester') {
            Is.creeps.harvester++
        }
    }

    for (const role in My.creeps) {
        if (Is.creeps[role] < My.creeps[role]) {
            if (My.spawn.store.getUsedCapacity('energy') >= 300) {
                console.log(`Building new ${role}!`)
                My.spawn.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], `Harvester_${Is.creeps[role]++}`, { role: 'harvester' })
            }
        }
    }

    // Creeps
    for (const i in Game.creeps) {
        switch (Game.creeps[i].memory.role) {
            case 'harvester':
                const creepRole = require('./role.harvester')
                creepRole.init(Game.creeps[i])
                break
            default:
                console.log(`No role assigned for ${Game.creeps[i]}`)
        }
    }
}

// Important Commands
// Game.spawns.SpawnRaphiman.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], 'Harvester_1', { role: 'harvester' })