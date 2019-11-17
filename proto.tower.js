/**
 * Initialize this structure.
 * => Will get executed once.
 */
StructureTower.prototype.init = function () {
    return {
        ...{hasInitialized: true},
        ...this.setProtocol(),
    }
}


/**
 * TODO: Set towers protocol.
 * @param {object} guardProtocol - {guardAttack: true, guardRepair: true}
 * @return {object} guardProtocol
 */
StructureTower.prototype.setProtocol = function (protocol = {}) {
    protocol = {
        ...{ 
            guardAttack: true,
            guardRepair: true,
            guardHeal: true,
        },
        ...protocol
    }
    console.log('Setting tower protocol:', this.id, protocol.guardAttack, protocol.guardRepair)
    return protocol
}


/**
 * Runs its protocol on every tick.
 */
StructureTower.prototype.run = function () {
    // Execute Tasks configured by protocol
    return {
        guardAttack: this.memory.guardAttack ? this.guardAttack() : false,
        guardRepair: this.memory.guardRepair ? this.guardRepair() : false,
        guardHeal:   this.memory.guardHeal   ? this.guardHeal()   : false,
    }
}


/**
 * Run guard protocol.
 */
StructureTower.prototype.guardAttack = function () {
    const closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    if (closestHostile) {
        return this.attack(closestHostile)
    }
    return 'TODO: Add response code here'
}


/**
 * Guards for repairing structures.
 */
StructureTower.prototype.guardRepair = function () {
    const closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {filter: structure => structure.hits < structure.hitsMax})
    if(closestDamagedStructure) {
        return this.repair(closestDamagedStructure)
    }
    return 'TODO: Add response code here'
}


StructureTower.prototype.guardHeal = function () {
    // TODO: Add heal here
    return 'TODO: Add response code here'
}