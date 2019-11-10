/**
 * Change Values to increase/decrease size of items.
 */
module.exports = {
    spawn: Game.spawns['SpawnRaphiman'],
    creeps: {
        harvester: {
            max: 12, // Max. number of this type (auto manufactured)
            class: 'workers',
            requiredEnergy: 300,
            body: [WORK, CARRY, MOVE, MOVE, MOVE],
        },
        builder: {
            max: 3,
            class: 'workers',
            requiredEnergy: 300,
            body: [WORK, WORK, CARRY, MOVE],
        }
    }
}
