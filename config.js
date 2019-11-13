/**
 * Change Values to increase/decrease size of items.
 */
module.exports = {
    spawn: Game.spawns['SpawnRaphiman'],
    creeps: {
        workers: {
            class: 'workers',
            // BUILD COSTS OF BODY PARTS
            // TODO: Check this! (constants?)
            // 20: WORK, TOUGH
            // 50: MOVE, CARRY
            // 100: ATTACK
            // 150: RANGED_ATTACK
            // 200: HEAL
            bodies: {
                300: [WORK, WORK, CARRY, MOVE], // Level 0-1 (Spawn with 300)
                550: [], // Level 2 (5 Extensions + 250)
                800: [], // Level 3 (5 Extensions + 250)
                1300: [], // Level 4 (10 Extensions + 500)
                1800: [], // Level 5 (10 Extensions + 500)
                2300: [], // Level 6 (10 Extensions + 500)
                2800: [], // Level 7 (10 Extensions + 500)
                3300: [], // Level 8 (10 Extensions + 500)
            }
        },
        builder: {
            max: 3,
            class: 'workers',
            requiredEnergy: 300,
            body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE],
        },
        harvester: {
            max: 7, // Max. number of this type (auto manufactured)
            class: 'workers',
            requiredEnergy: 550,
            body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE],
        },
    }
}
