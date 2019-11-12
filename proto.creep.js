/**
 * Looks for the closest owned structure that requires loading.
 * Follows priorities:
 * 1. spawns
 * 2. extensions
 * @return {object} - The structure that requires loading.
 */
Creep.prototype.findClosestToLoad = function () {
    let spawns = []
    let extensions = []
    this.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            if(["extension", "spawn"].includes(structure.structureType) && structure.store.getFreeCapacity('energy') > 0) {
                switch (structure.structureType) {
                    case 'spawn':
                        spawns.push(structure)
                        break
                    case 'extension':
                        extensions.push(structure)
                        break
                    
                }
            }
        }
    })
    const energyStructureTargets = [...spawns, ...extensions]
    const energyStructureTarget = this.pos.findClosestByPath(energyStructureTargets)
    return energyStructureTarget
}


Creep.prototype.findClosestUsableSource = function () {
    const sources = this.room.find(FIND_SOURCES)
    const closestSource = creep.pos.findClosestByPath(sources)
    // Check if it is not 
    // Calc ticks to fully load creep storage
    return closestSource
}