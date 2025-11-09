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
import type { PersonaSpec, PersonalityTrait } from './types.js';
export declare class PersonaLoader {
    private dataPath;
    private personasCache;
    private personasData;
    /**
     * @param dataPath Path to Miadi-46 data directory (default: /a/src/Miadi-46/data)
     */
    constructor(dataPath?: string);
    /**
     * Initialize loader by reading personas.json
     */
    initialize(): Promise<void>;
    /**
     * Load specific persona by ID
     * @param personaId Persona identifier (e.g., "miette-sprite")
     * @returns PersonaSpec or null if not found
     */
    load(personaId: string): Promise<PersonaSpec | null>;
    /**
     * Load persona with validation
     * @throws Error if persona not found
     */
    loadOrThrow(personaId: string): Promise<PersonaSpec>;
    /**
     * Get all persona IDs
     */
    list(): string[];
    /**
     * Get all persona specs
     */
    listAll(): PersonaSpec[];
    /**
     * Find personas by agent ID (e.g., all Mia personas)
     */
    findByAgentId(agentId: string): PersonaSpec[];
    /**
     * Find personas that have a specific capability
     */
    findByCapability(capabilityId: string): PersonaSpec[];
    /**
     * Get metadata about persona system
     */
    getMetadata(): {
        version: string;
        ceremonialAlignment: boolean;
        indigenousProtocols: boolean;
        memorySpiral: boolean;
        dualModality: boolean;
        lastUpdated: string;
    } | null;
    /**
     * Extract personality traits as a simple object for easy access
     */
    getPersonalityTraitsMap(persona: PersonaSpec): Record<string, number>;
    /**
     * Check if persona has a specific trait above threshold
     */
    hasTrait(persona: PersonaSpec, traitName: string, minValue?: number): boolean;
    /**
     * Get dominant traits (> 0.85)
     */
    getDominantTraits(persona: PersonaSpec): PersonalityTrait[];
}
export declare function getPersonaLoader(dataPath?: string): PersonaLoader;
//# sourceMappingURL=PersonaLoader.d.ts.map