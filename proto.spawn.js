/**
 * Spawns an emergency Harvester.
 */
Spawn.prototype.spawnEmergencyHarvester = function () {
    this.spawnCreep([WORK, CARRY, MOVE],
    `EME_${++Memory.stats.creeps.increment}`,
    { memory: {role: 'harvester' } })
}