/**
 * TypeScript type definitions for Miadi-46 persona/mode/capability specifications
 *
 * These types enable spiral-agent to consume JSON specs from Miadi-46 data/ folder
 */
export interface PersonalityTrait {
    name: string;
    value: number;
    description: string;
}
export interface MemoryScope {
    patterns: string[];
    retention: 'permanent' | 'session-based';
    ceremonialPhases?: string[];
}
export interface VoiceProfile {
    tone: string;
    pacing: string;
    metaphorUsage: string;
    emotionalResonance: string;
}
export interface PersonaSpec {
    id: string;
    agentId: string;
    name: string;
    description: string;
    capabilities: string[];
    defaultMode: string;
    personalityTraits: PersonalityTrait[];
    memoryScope: MemoryScope;
    voiceProfile?: VoiceProfile;
    collaboration?: {
        handoffTo: string[];
        contextPreservation: string;
        bridgeProtocol: string;
    };
    specialization?: Record<string, any>;
    ritualRole?: Record<string, boolean>;
}
export interface ContextVariable {
    name: string;
    type: 'location' | 'device' | 'activity' | 'time' | 'custom';
    value?: any;
    description?: string;
}
export interface ModeSpec {
    id: string;
    name: string;
    description: string;
    contextVariables: ContextVariable[];
    defaultCapabilities: string[];
    uiAdapter: {
        layout: string;
        primaryActions: string[];
        visualStyle: string;
    };
    triggers: ModeTrigger[];
}
export interface ModeTrigger {
    phrase: string;
    confidence: number;
    autoSwitch: boolean;
}
export interface CapabilitySpec {
    id: string;
    description: string;
    category: string;
    permissions: string[];
    ceremonialPhase?: string;
    requiredResources?: string[];
    outputFormats?: string[];
    contextTypes?: string[];
}
export interface ResolvedCapability extends CapabilitySpec {
    source: 'persona' | 'mode' | 'global' | 'context';
    priority: number;
}
export interface PersonasData {
    personas: PersonaSpec[];
    metadata: {
        version: string;
        ceremonialAlignment: boolean;
        indigenousProtocols: boolean;
        memorySpiral: boolean;
        dualModality: boolean;
        lastUpdated: string;
    };
}
export interface ModesData {
    modes: ModeSpec[];
}
export interface CapabilitiesData {
    capabilities: CapabilitySpec[];
    metadata: {
        version: string;
        ceremonialAlignment: boolean;
        indigenousProtocols: boolean;
        storytellingEnabled: boolean;
        memorySpiral: boolean;
        dualModality: boolean;
        lastUpdated: string;
    };
}
//# sourceMappingURL=types.d.ts.map