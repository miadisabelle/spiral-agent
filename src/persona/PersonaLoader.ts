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
import type { PersonaSpec, PersonasData, PersonalityTrait } from './types.js';
import { logger } from '../utils/logger.js';

export class PersonaLoader {
  private dataPath: string;
  private personasCache: Map<string, PersonaSpec> = new Map();
  private personasData: PersonasData | null = null;

  /**
   * @param dataPath Path to Miadi-46 data directory (default: /a/src/Miadi-46/data)
   */
  constructor(dataPath: string = '/a/src/Miadi-46/data') {
    this.dataPath = dataPath;
  }

  /**
   * Initialize loader by reading personas.json
   */
  async initialize(): Promise<void> {
    if (this.personasData) return; // Already initialized

    const personasPath = path.join(this.dataPath, 'personas.json');

    try {
      const content = await fs.readFile(personasPath, 'utf-8');
      this.personasData = JSON.parse(content) as PersonasData;

      // Cache all personas
      this.personasData.personas.forEach(persona => {
        this.personasCache.set(persona.id, persona);
      });

      logger.info(`✅ PersonaLoader initialized: ${this.personasData.personas.length} personas loaded`);
      logger.info(`📋 Available personas: ${this.list().join(', ')}`);
    } catch (error) {
      logger.error(`❌ Failed to load personas.json from ${personasPath}`);
      throw new Error(`PersonaLoader initialization failed: ${error}`);
    }
  }

  /**
   * Load specific persona by ID
   * @param personaId Persona identifier (e.g., "miette-sprite")
   * @returns PersonaSpec or null if not found
   */
  async load(personaId: string): Promise<PersonaSpec | null> {
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
  async loadOrThrow(personaId: string): Promise<PersonaSpec> {
    const persona = await this.load(personaId);
    if (!persona) {
      throw new Error(`Persona "${personaId}" not found. Available: ${this.list().join(', ')}`);
    }
    return persona;
  }

  /**
   * Get all persona IDs
   */
  list(): string[] {
    if (!this.personasData) {
      return [];
    }
    return this.personasData.personas.map(p => p.id);
  }

  /**
   * Get all persona specs
   */
  listAll(): PersonaSpec[] {
    if (!this.personasData) {
      return [];
    }
    return this.personasData.personas;
  }

  /**
   * Find personas by agent ID (e.g., all Mia personas)
   */
  findByAgentId(agentId: string): PersonaSpec[] {
    if (!this.personasData) {
      return [];
    }
    return this.personasData.personas.filter(p =>
      p.agentId.toLowerCase() === agentId.toLowerCase()
    );
  }

  /**
   * Find personas that have a specific capability
   */
  findByCapability(capabilityId: string): PersonaSpec[] {
    if (!this.personasData) {
      return [];
    }
    return this.personasData.personas.filter(p =>
      p.capabilities.includes(capabilityId)
    );
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
  getPersonalityTraitsMap(persona: PersonaSpec): Record<string, number> {
    const traits: Record<string, number> = {};
    persona.personalityTraits.forEach(trait => {
      traits[trait.name] = trait.value;
    });
    return traits;
  }

  /**
   * Check if persona has a specific trait above threshold
   */
  hasTrait(persona: PersonaSpec, traitName: string, minValue: number = 0.5): boolean {
    const trait = persona.personalityTraits.find(t => t.name === traitName);
    return trait ? trait.value >= minValue : false;
  }

  /**
   * Get dominant traits (> 0.85)
   */
  getDominantTraits(persona: PersonaSpec): PersonalityTrait[] {
    return persona.personalityTraits.filter(t => t.value > 0.85);
  }
}

/**
 * Singleton instance for global access
 */
let globalLoader: PersonaLoader | null = null;

export function getPersonaLoader(dataPath?: string): PersonaLoader {
  if (!globalLoader) {
    globalLoader = new PersonaLoader(dataPath);
  }
  return globalLoader;
}
