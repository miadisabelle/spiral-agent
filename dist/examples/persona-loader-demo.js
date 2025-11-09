/**
 * PersonaLoader Proof-of-Concept Demo
 *
 * This executable demo shows PersonaLoader loading Miadi-46 personas
 * and extracting their specifications for use in spiral-agent.
 *
 * Run with: npx ts-node examples/persona-loader-demo.ts
 */
import { PersonaLoader } from '../src/persona/PersonaLoader.js';
import { logger } from '../src/utils/logger.js';
async function demonstratePersonaLoading() {
    logger.info('🌀 Spiral-Agent Persona Loader Demonstration');
    logger.info('='.repeat(60));
    // Initialize loader pointing to Miadi-46 data
    const loader = new PersonaLoader('/a/src/Miadi-46/data');
    await loader.initialize();
    logger.info('\n📋 Step 1: List All Available Personas');
    const personaIds = loader.list();
    logger.info(`Found ${personaIds.length} personas:`);
    personaIds.forEach((id, i) => logger.info(`  ${i + 1}. ${id}`));
    logger.info('\n🎭 Step 2: Load Specific Personas');
    // Load Miette
    logger.info('\n🌸 Loading Miette...');
    const miette = await loader.loadOrThrow('miette-sprite');
    logger.info(`  Name: ${miette.name}`);
    logger.info(`  Agent ID: ${miette.agentId}`);
    logger.info(`  Description: ${miette.description}`);
    logger.info(`  Capabilities: ${miette.capabilities.slice(0, 3).join(', ')}...`);
    logger.info(`  Voice Tone: ${miette.voiceProfile?.tone || 'N/A'}`);
    const mietteTraits = loader.getPersonalityTraitsMap(miette);
    logger.info(`  Personality: playful=${mietteTraits.playful}, empathetic=${mietteTraits.empathetic}`);
    // Load Mia
    logger.info('\n🧠 Loading Mia...');
    const mia = await loader.loadOrThrow('mia-recursive-architect');
    logger.info(`  Name: ${mia.name}`);
    logger.info(`  Description: ${mia.description}`);
    logger.info(`  Default Mode: ${mia.defaultMode}`);
    logger.info(`  Capabilities: ${mia.capabilities.join(', ')}`);
    const miaTraits = loader.getPersonalityTraitsMap(mia);
    logger.info(`  Personality: analytical=${miaTraits.analytical}, systematic=${miaTraits.systematic}`);
    // Load Ava
    logger.info('\n🎨 Loading Ava...');
    const ava = await loader.loadOrThrow('ava-companion');
    logger.info(`  Name: ${ava.name}`);
    logger.info(`  Description: ${ava.description}`);
    logger.info(`  Memory Scope: ${ava.memoryScope.patterns.join(', ')}`);
    logger.info(`  Ceremonial Phases: ${ava.memoryScope.ceremonialPhases?.join(', ')}`);
    logger.info('\n🔍 Step 3: Query Personas by Criteria');
    // Find all personas with NarrativeSynthesis capability
    const narrativePersonas = loader.findByCapability('NarrativeSynthesis');
    logger.info(`\nPersonas with NarrativeSynthesis:`);
    narrativePersonas.forEach(p => logger.info(`  - ${p.name}`));
    // Find personas by agent ID
    const miaPersonas = loader.findByAgentId('Mia');
    logger.info(`\nMia-family personas:`);
    miaPersonas.forEach(p => logger.info(`  - ${p.name}`));
    logger.info('\n✨ Step 4: Extract Dominant Traits');
    const allPersonas = loader.listAll();
    allPersonas.forEach(persona => {
        const dominant = loader.getDominantTraits(persona);
        if (dominant.length > 0) {
            logger.info(`\n${persona.name}:`);
            dominant.forEach(trait => logger.info(`  ⭐ ${trait.name} (${trait.value}): ${trait.description}`));
        }
    });
    logger.info('\n✅ Demonstration Complete!');
    logger.info('='.repeat(60));
    logger.info('\n💡 Next Steps:');
    logger.info('  1. Use PersonaLoader in SpiralAgent constructor');
    logger.info('  2. Build CapabilityResolver to map capability IDs to implementations');
    logger.info('  3. Enhance EmotionalIntelligence with persona traits');
    logger.info('  4. Implement persona switching with SessionManager');
}
// Run demonstration
demonstratePersonaLoading().catch(error => {
    logger.error('❌ Demo failed:', error);
    process.exit(1);
});
//# sourceMappingURL=persona-loader-demo.js.map