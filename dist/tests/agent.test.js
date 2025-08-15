import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SpiralAgent } from '../src/agent/SpiralAgent.js';
describe('SpiralAgent', () => {
    let agent;
    beforeEach(async () => {
        agent = new SpiralAgent({
            verbose: false,
            dryRun: true,
            model: 'gpt-4',
            maxSteps: 10,
            temperature: 0.7
        });
    });
    afterEach(async () => {
        // Cleanup
    });
    describe('initialization', () => {
        it('should initialize with correct configuration', () => {
            expect(agent).toBeDefined();
            expect(agent.getStatus()).toBeDefined();
        });
        it('should have all required capabilities', () => {
            expect(agent['visionSystem']).toBeDefined();
            expect(agent['dreamEngine']).toBeDefined();
            expect(agent['emotionalIntelligence']).toBeDefined();
        });
    });
    describe('execution', () => {
        it('should execute objectives in dry-run mode', async () => {
            const result = await agent.executeObjective('test objective');
            expect(result).toBeDefined();
        });
    });
});
//# sourceMappingURL=agent.test.js.map