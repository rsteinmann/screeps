module.exports = {
    /**
     * Prepares memory
     */
    init () {
        Memory.rooms = {} // Stores room informations
        Memory.stats = {
            creeps: {
                increment: Memory.stats.creeps.increment || 0,
                harvester: 0,
                builder: 0,
            }
        }
        return this
    },

    
    /**
     * Removes unused stuff from memory.
     */
    clear () {
        // Reset creep counters
        for (const i in Memory.stats.creeps) {
            if (i !== 'increment') {
                Memory.stats.creeps[i] = 0
            }
        }
        // Clear unused creeps
        for (const i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        return this
    },


    /**
     * Count creeps
     */
    countCreeps () {
        for (const i in Game.creeps) {
            const role = Game.creeps[i].memory.role
            Memory.stats.creeps[role]++
        }
        return this
    },


    /**
     * Count todos
     */
    countTodos () {
        Memory.stats.todos = {
            toBuild: Game.rooms['E24N31'].find(FIND_CONSTRUCTION_SITES).length,
            toRepair: Game.rooms['E24N31'].find(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL}).length,
        }
        return this
    },
}
