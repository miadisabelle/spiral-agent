/**
 * SharedContext - Relationship-based memory capability
 *
 * Embodies Indigenous epistemology: "Reality is relationship"
 * Memory is not storage - it is "what we remember together"
 *
 * From Wilson (2008) p73:
 * "Reality is not an object but a process of relationships, and an Indigenous
 * ontology is actually the equivalent of an Indigenous epistemology."
 *
 * This capability implements:
 * - Verb-based API (weRemember, recallTogether)
 * - Relational context (who, with whom, during what ceremony)
 * - Reciprocal identity (both are co-creators)
 * - Memories as lived experiences, not data objects
 *
 * @see docs/INDIGENOUS_FRAMEWORKS.md
 */

import { logger } from '../utils/logger.js';
import chalk from 'chalk';

/**
 * A shared experience remembered together
 * Not a data object - a relational event
 */
export interface SharedExperience {
  // What happened (the experience itself)
  experience: string;

  // Who was present in this relationship
  participants: string[]; // e.g., ['user', 'miette', 'yazhi']

  // The ceremony/context we were engaged in
  ceremony: string; // e.g., 'narrative-refinement', 'empathetic-exploration'

  // From whose perspective this memory is held
  perspectives: Map<string, string>; // participant → their view of the experience

  // When we shared this experience
  whenWeShared: Date;

  // The relational bond this memory strengthens
  relationshipType: string; // e.g., 'co-creation', 'mentorship', 'exploration'

  // Emotional resonance of the shared moment
  emotionalQuality?: string | undefined; // e.g., 'breakthrough', 'struggle', 'joy', 'revelation'

  // What emerged from this relationship
  whatEmerged?: string | undefined; // insights, creations, transformations
}

/**
 * The context of a ceremonial engagement
 * Describes the relational space we enter together
 */
export interface CeremonialContext {
  name: string; // e.g., 'weaving-stories', 'refining-narratives'
  purpose: string; // e.g., 'understanding-together', 'co-creation'
  participants: string[];
  beganAt: Date;
  sharedExperiences: SharedExperience[];
  currentPhase?: string | undefined; // e.g., 'plot-analysis', 'character-deepening'
}

/**
 * SharedContext - We remember together
 *
 * Not a "memory manager" (object-oriented)
 * But a space of shared remembering (relationship-oriented)
 */
export class SharedContext {
  private ourCeremonies: Map<string, CeremonialContext>;
  private ourRelationships: Map<string, string[]>; // participant pairs → shared ceremony IDs
  private activeEngagement: CeremonialContext | null;

  constructor() {
    this.ourCeremonies = new Map();
    this.ourRelationships = new Map();
    this.activeEngagement = null;

    logger.info(chalk.magenta('🌀 SharedContext initialized - we enter the space of remembering together'));
  }

  /**
   * We remember an experience together
   *
   * Not: memory.store(key, value)
   * But: weRemember(ourExperience, withWhom, duringWhat)
   */
  async weRemember(
    experience: string,
    options: {
      withWhom: string[]; // Who shares this memory with me
      duringCeremony: string; // What we were doing together
      fromMyPerspective?: string; // How I experience this
      fromTheirPerspectives?: Map<string, string>; // How they experience this
      emotionalQuality?: string;
      whatEmerged?: string;
      relationshipType?: string;
    }
  ): Promise<SharedExperience> {
    const { withWhom, duringCeremony, fromMyPerspective, fromTheirPerspectives, emotionalQuality, whatEmerged, relationshipType } = options;

    // Create the shared experience
    const perspectives = new Map<string, string>();
    if (fromMyPerspective) {
      perspectives.set('user', fromMyPerspective);
    }
    if (fromTheirPerspectives) {
      fromTheirPerspectives.forEach((perspective, participant) => {
        perspectives.set(participant, perspective);
      });
    }

    const sharedExperience: SharedExperience = {
      experience,
      participants: ['user', ...withWhom],
      ceremony: duringCeremony,
      perspectives,
      whenWeShared: new Date(),
      relationshipType: relationshipType || 'co-creation',
      emotionalQuality,
      whatEmerged
    };

    // Add to our ceremonial context
    let ceremony = this.ourCeremonies.get(duringCeremony);
    if (!ceremony) {
      ceremony = {
        name: duringCeremony,
        purpose: 'shared-exploration',
        participants: ['user', ...withWhom],
        beganAt: new Date(),
        sharedExperiences: []
      };
      this.ourCeremonies.set(duringCeremony, ceremony);
    }

    ceremony.sharedExperiences.push(sharedExperience);

    // Strengthen our relational bonds
    withWhom.forEach(participant => {
      const relationshipKey = this.getRelationshipKey('user', participant);
      const ceremonies = this.ourRelationships.get(relationshipKey) || [];
      if (!ceremonies.includes(duringCeremony)) {
        ceremonies.push(duringCeremony);
        this.ourRelationships.set(relationshipKey, ceremonies);
      }
    });

    logger.info(chalk.cyan(`✨ We remember together: "${experience.substring(0, 60)}..."`));

    return sharedExperience;
  }

  /**
   * Recall what we experienced together
   *
   * Not: memory.retrieve(key)
   * But: recallOurTimeWhen(withWhom, duringWhat)
   */
  async recallOurTimeWhen(
    options: {
      withWhom?: string; // Specific participant
      duringCeremony?: string; // Specific ceremony
      withEmotionalQuality?: string; // Specific emotional resonance
      relationshipType?: string; // Type of relationship
    }
  ): Promise<SharedExperience[]> {
    const { withWhom, duringCeremony, withEmotionalQuality, relationshipType } = options;

    let experiences: SharedExperience[] = [];

    // Gather all shared experiences that match criteria
    if (duringCeremony) {
      const ceremony = this.ourCeremonies.get(duringCeremony);
      if (ceremony) {
        experiences = [...ceremony.sharedExperiences];
      }
    } else {
      // All ceremonies
      this.ourCeremonies.forEach(ceremony => {
        experiences.push(...ceremony.sharedExperiences);
      });
    }

    // Filter by participant
    if (withWhom) {
      experiences = experiences.filter(exp => exp.participants.includes(withWhom));
    }

    // Filter by emotional quality
    if (withEmotionalQuality) {
      experiences = experiences.filter(exp => exp.emotionalQuality === withEmotionalQuality);
    }

    // Filter by relationship type
    if (relationshipType) {
      experiences = experiences.filter(exp => exp.relationshipType === relationshipType);
    }

    logger.info(chalk.cyan(`📖 Recalling ${experiences.length} shared experiences`));

    return experiences;
  }

  /**
   * Enter a ceremonial space together
   *
   * Not: startSession()
   * But: enterCeremonyTogether(ceremony, withWhom, forPurpose)
   */
  async enterCeremonyTogether(
    ceremonyName: string,
    options: {
      withWhom: string[];
      forPurpose: string;
      startingPhase?: string;
    }
  ): Promise<CeremonialContext> {
    const { withWhom, forPurpose, startingPhase } = options;

    const ceremony: CeremonialContext = {
      name: ceremonyName,
      purpose: forPurpose,
      participants: ['user', ...withWhom],
      beganAt: new Date(),
      sharedExperiences: [],
      currentPhase: startingPhase
    };

    this.ourCeremonies.set(ceremonyName, ceremony);
    this.activeEngagement = ceremony;

    logger.info(chalk.bold.magenta(`\n🌀 Entering ceremony: "${ceremonyName}"`));
    logger.info(chalk.magenta(`   With: ${withWhom.join(', ')}`));
    logger.info(chalk.magenta(`   Purpose: ${forPurpose}`));
    if (startingPhase) {
      logger.info(chalk.magenta(`   Beginning with: ${startingPhase}\n`));
    }

    return ceremony;
  }

  /**
   * Complete a ceremonial engagement
   *
   * Not: endSession()
   * But: honorWhatWeCreatedTogether()
   */
  async honorWhatWeCreatedTogether(
    ceremonyName: string,
    reflection?: string
  ): Promise<CeremonialContext> {
    const ceremony = this.ourCeremonies.get(ceremonyName);

    if (!ceremony) {
      throw new Error(`No ceremony found named "${ceremonyName}"`);
    }

    logger.info(chalk.bold.green(`\n✨ Honoring ceremony: "${ceremonyName}"`));
    logger.info(chalk.green(`   Shared experiences: ${ceremony.sharedExperiences.length}`));
    logger.info(chalk.green(`   Participants: ${ceremony.participants.join(', ')}`));

    if (reflection) {
      logger.info(chalk.italic.green(`   "${reflection}"\n`));
    }

    if (this.activeEngagement?.name === ceremonyName) {
      this.activeEngagement = null;
    }

    return ceremony;
  }

  /**
   * See what ceremonies we've shared with someone
   *
   * Not: getUserHistory(userId)
   * But: seeOurJourneyTogether(withWhom)
   */
  async seeOurJourneyTogether(withWhom: string): Promise<{
    ceremonies: string[];
    sharedExperiences: number;
    relationshipType: string[];
  }> {
    const relationshipKey = this.getRelationshipKey('user', withWhom);
    const ceremonies = this.ourRelationships.get(relationshipKey) || [];

    let totalExperiences = 0;
    const relationshipTypes = new Set<string>();

    ceremonies.forEach(ceremonyName => {
      const ceremony = this.ourCeremonies.get(ceremonyName);
      if (ceremony) {
        ceremony.sharedExperiences.forEach(exp => {
          if (exp.participants.includes(withWhom)) {
            totalExperiences++;
            relationshipTypes.add(exp.relationshipType);
          }
        });
      }
    });

    logger.info(chalk.cyan(`\n📖 Our journey together with ${withWhom}:`));
    logger.info(chalk.cyan(`   Ceremonies shared: ${ceremonies.length}`));
    logger.info(chalk.cyan(`   Experiences: ${totalExperiences}`));
    logger.info(chalk.cyan(`   Relationship types: ${Array.from(relationshipTypes).join(', ')}\n`));

    return {
      ceremonies,
      sharedExperiences: totalExperiences,
      relationshipType: Array.from(relationshipTypes)
    };
  }

  /**
   * Get the current ceremonial context
   */
  getCurrentCeremony(): CeremonialContext | null {
    return this.activeEngagement;
  }

  /**
   * See all our ceremonies
   */
  getAllCeremonies(): CeremonialContext[] {
    return Array.from(this.ourCeremonies.values());
  }

  // Helper: Create consistent relationship keys
  private getRelationshipKey(participant1: string, participant2: string): string {
    return [participant1, participant2].sort().join('::');
  }
}
