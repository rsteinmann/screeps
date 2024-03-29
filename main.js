var objLog = function (obj) {
    if (typeof obj !== 'object') {
        console.log(`OBJECT is`, typeof obj)
        return false
    }
    for (i in obj) {
        console.log('OBJECT', i, obj[i])
    }
}

require('./proto.spawn')
require('./proto.source')
require('./proto.creep')
require('./proto.tower')

const MainMemory = require('./main.memory')
const MainRoom = require('./main.room')
const MainSpawner = require('./main.spawn')

// Prepare
MainMemory.init()
MainRoom.init('E24N31')

// Game loop
module.exports.loop = () => {
    const My = require('./config')
    
    // 1. Memory Tasks
    MainMemory
        .clear()
        .countCreeps()
        .countTodos()
        .setMode()


    // Display Stats
    console.log('---------------------- TICK ----------------------')
    Memory.attackMode ? console.log('!!! ATTACK MODE !!!') : ''
    console.log('[SPAWN] harvester:', Memory.stats.creeps.harvester, 'builder:', Memory.stats.creeps.builder)
    console.log('[RESOURCE] energy', Game.rooms['E24N31'].energyAvailable, `(${Game.rooms['E24N31'].energyCapacityAvailable})`)
    console.log('[TODO] build:', Memory.stats.todos.toBuild, 'repair:', Memory.stats.todos.toRepair)

    // 2. Spawn new Creeps
    MainSpawner.spawnCreeps()

    // 3. Organize Creeps
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

    // 4. Do stuff coded within memory
    // TODO: Requires generalization!!!
    const RoomStructures = Game.rooms['E24N31'].find(FIND_MY_STRUCTURES)
    Memory.rooms['E24N31'].structures.towers
        .forEach((towerMemory, index) => {
            // Connect memory to object and run its protocol
            const Tower = RoomStructures.filter(s => s.id === towerMemory.id)[0]
            Tower.memory = Game.rooms['E24N31'].memory.structures.towers[index]
            Tower.run()
        })
}
