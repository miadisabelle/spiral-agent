/**
 * PersonaLoader - Loads Miadi-46 persona specifications into spiral-agent runtime
 *
 * This is the bridge between Miadi-46's JSON specs and spiral-agent's execution engine.
 *
 * @example
 * ```typescript
 * const loader = new PersonaLoader('/a/src/Miadi-46/data');
 * const miette = await loader.load('miette-sprite');
 *
 * console.log(miette.voiceProfile.tone); // "warm-reflective"
 * console.log(miette.capabilities); // ["CreativeWriting", "UserEngagement", ...]
 * ```
 */
import { promises as fs } from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';
export class PersonaLoader {
    dataPath;
    personasCache = new Map();
    personasData = null;
    /**
     * @param dataPath Path to Miadi-46 data directory (default: /a/src/Miadi-46/data)
     */
    constructor(dataPath = '/a/src/Miadi-46/data') {
        this.dataPath = dataPath;
    }
    /**
     * Initialize loader by reading personas.json
     */
    async initialize() {
        if (this.personasData)
            return; // Already initialized
        const personasPath = path.join(this.dataPath, 'personas.json');
        try {
            const content = await fs.readFile(personasPath, 'utf-8');
            this.personasData = JSON.parse(content);
            // Cache all personas
            this.personasData.personas.forEach(persona => {
                this.personasCache.set(persona.id, persona);
            });
            logger.info(`✅ PersonaLoader initialized: ${this.personasData.personas.length} personas loaded`);
            logger.info(`📋 Available personas: ${this.list().join(', ')}`);
        }
        catch (error) {
            logger.error(`❌ Failed to load personas.json from ${personasPath}`);
            throw new Error(`PersonaLoader initialization failed: ${error}`);
        }
    }
    /**
     * Load specific persona by ID
     * @param personaId Persona identifier (e.g., "miette-sprite")
     * @returns PersonaSpec or null if not found
     */
    async load(personaId) {
        if (!this.personasData) {
            await this.initialize();
        }
        const persona = this.personasCache.get(personaId);
        if (!persona) {
            logger.warn(`⚠️  Persona "${personaId}" not found`);
            return null;
        }
        logger.info(`🎭 Loaded persona: ${persona.name} (${persona.agentId})`);
        return persona;
    }
    /**
     * Load persona with validation
     * @throws Error if persona not found
     */
    async loadOrThrow(personaId) {
        const persona = await this.load(personaId);
        if (!persona) {
            throw new Error(`Persona "${personaId}" not found. Available: ${this.list().join(', ')}`);
        }
        return persona;
    }
    /**
     * Get all persona IDs
     */
    list() {
        if (!this.personasData) {
            return [];
        }
        return this.personasData.personas.map(p => p.id);
    }
    /**
     * Get all persona specs
     */
    listAll() {
        if (!this.personasData) {
            return [];
        }
        return this.personasData.personas;
    }
    /**
     * Find personas by agent ID (e.g., all Mia personas)
     */
    findByAgentId(agentId) {
        if (!this.personasData) {
            return [];
        }
        return this.personasData.personas.filter(p => p.agentId.toLowerCase() === agentId.toLowerCase());
    }
    /**
     * Find personas that have a specific capability
     */
    findByCapability(capabilityId) {
        if (!this.personasData) {
            return [];
        }
        return this.personasData.personas.filter(p => p.capabilities.includes(capabilityId));
    }
    /**
     * Get metadata about persona system
     */
    getMetadata() {
        return this.personasData?.metadata || null;
    }
    /**
     * Extract personality traits as a simple object for easy access
     */
    getPersonalityTraitsMap(persona) {
        const traits = {};
        persona.personalityTraits.forEach(trait => {
            traits[trait.name] = trait.value;
        });
        return traits;
    }
    /**
     * Check if persona has a specific trait above threshold
     */
    hasTrait(persona, traitName, minValue = 0.5) {
        const trait = persona.personalityTraits.find(t => t.name === traitName);
        return trait ? trait.value >= minValue : false;
    }
    /**
     * Get dominant traits (> 0.85)
     */
    getDominantTraits(persona) {
        return persona.personalityTraits.filter(t => t.value > 0.85);
    }
}
/**
 * Singleton instance for global access
 */
let globalLoader = null;
export function getPersonaLoader(dataPath) {
    if (!globalLoader) {
        globalLoader = new PersonaLoader(dataPath);
    }
    return globalLoader;
}
//# sourceMappingURL=PersonaLoader.js.map