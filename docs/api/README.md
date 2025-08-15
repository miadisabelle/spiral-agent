# 📖 Spiral Agent API Reference

Welcome to the comprehensive API documentation for Spiral Agent. This reference covers all core classes, interfaces, and capabilities that make up the autonomous CLI agent system.

## 🏗️ Core Architecture

### SpiralAgent

The main agent class that orchestrates all autonomous operations using the ReAct framework.

```typescript
class SpiralAgent {
  constructor(config: SpiralAgentConfig)
  async executeObjective(objective: string): Promise<void>
  async startInteractiveMode(): Promise<void>
  getStatus(): AgentStatus
  getMemoryResults(query: string): Promise<MemoryResult[]>
  clearMemory(): Promise<void>
}
```

#### Configuration

```typescript
interface SpiralAgentConfig {
  verbose?: boolean;      // Enable detailed logging
  dryRun?: boolean;       // Execute without side effects
  model?: string;         // LLM model to use (default: 'gpt-4')
  maxSteps?: number;      // Maximum execution steps (default: 50)
  temperature?: number;   // LLM creativity level (default: 0.7)
}
```

#### Status Information

```typescript
interface AgentStatus {
  healthy: boolean;       // Overall system health
  memoryCount: number;    // Number of stored memories
  pluginCount: number;    // Number of loaded plugins
  lastActivity?: string;  // Last recorded activity
  uptime: string;         // Time since initialization
}
```

#### Memory Results

```typescript
interface MemoryResult {
  content: string;        // Stored content
  context: string;        // Context when stored
  relevance: number;      // Relevance score (0-1)
}
```

### ActionExecutor

Handles the execution of actions determined by the agent's reasoning process.

```typescript
class ActionExecutor {
  constructor(dryRun: boolean = false)
  async execute(action: AgentAction): Promise<ExecutionResult>
  async validateAction(action: AgentAction): Promise<ValidationResult>
}
```

#### Action Types

```typescript
interface AgentAction {
  type: ActionType;
  payload: string;
  reasoning: string;
  metadata?: ActionMetadata;
}

type ActionType = 
  | 'READ'          // Read file or directory
  | 'WRITE'         // Write to file
  | 'EXECUTE'       // Run shell command  
  | 'SEARCH'        // Search files/content
  | 'ANALYZE'       // Analyze code/data
  | 'PLAN'          // Create execution plan
  | 'FINISH'        // Complete objective
```

#### Execution Results

```typescript
interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}
```

### ContextManager

Manages the execution context and maintains state across agent operations.

```typescript
class ContextManager {
  initialize(sessionId: string, objective: string): void
  getCurrentContext(): ExecutionContext
  addStep(step: ExecutionStep): void
  getExecutionHistory(): ExecutionStep[]
  saveContext(name: string): Promise<void>
  loadContext(name: string): Promise<ExecutionContext>
}
```

#### Context Structure

```typescript
interface ExecutionContext {
  sessionId: string;
  objective: string;
  startTime: Date;
  steps: ExecutionStep[];
  currentDirectory: string;
  environment: Record<string, string>;
  metadata: Record<string, any>;
}

interface ExecutionStep {
  step: number;
  action: AgentAction;
  result: ExecutionResult;
  timestamp: Date;
}
```

### MemoryManager

Provides persistent memory storage and retrieval capabilities.

```typescript
class MemoryManager {
  async initialize(): Promise<void>
  async store(content: string, type: string, context: string): Promise<string>
  async retrieve(query: string, limit?: number): Promise<MemoryResult[]>
  async update(id: string, content: string): Promise<void>
  async delete(id: string): Promise<void>
  async clear(): Promise<void>
  async getStats(): Promise<MemoryStats>
}
```

#### Memory Statistics

```typescript
interface MemoryStats {
  totalEntries: number;
  typeBreakdown: Record<string, number>;
  oldestEntry: Date;
  newestEntry: Date;
  averageRelevance: number;
}
```

## 🚀 Advanced Capabilities

### VisionSystem

Provides image analysis, OCR, and visual debugging capabilities.

```typescript
class VisionSystem {
  async analyzeImage(imagePath: string): Promise<ImageAnalysis>
  async extractText(imagePath: string): Promise<OCRResult>
  async compareImages(image1: string, image2: string): Promise<ComparisonResult>
  async generateImageDescription(imagePath: string): Promise<string>
  async detectObjects(imagePath: string): Promise<ObjectDetection[]>
}
```

#### Vision Data Types

```typescript
interface ImageAnalysis {
  dimensions: { width: number; height: number }
  format: string;
  objects: ObjectDetection[];
  text: OCRResult;
  colors: ColorAnalysis;
  composition: CompositionAnalysis;
  metadata: ImageMetadata;
}

interface OCRResult {
  text: string;
  confidence: number;
  words: TextRegion[];
  lines: TextRegion[];
  blocks: TextRegion[];
}

interface ObjectDetection {
  label: string;
  confidence: number;
  boundingBox: BoundingBox;
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

### DreamEngine

Enables creative content generation and artistic expression.

```typescript
class DreamEngine {
  async generateArt(prompt: string, style?: ArtStyle): Promise<ArtResult>
  async generatePoetry(theme: string, style?: PoetryStyle): Promise<Poetry>
  async generateStory(prompt: string, genre?: StoryGenre): Promise<Story>
  async generateMetaphor(concept: string): Promise<Metaphor>
  async brainstormIdeas(topic: string, count?: number): Promise<Idea[]>
}
```

#### Creative Data Types

```typescript
interface ArtResult {
  art: string;            // ASCII art or visual representation
  style: ArtStyle;
  inspiration: string;
  metadata: ArtMetadata;
}

interface Poetry {
  title: string;
  verses: string[];
  style: PoetryStyle;
  theme: string;
  mood: EmotionalState;
}

interface Story {
  title: string;
  content: string;
  genre: StoryGenre;
  characters: Character[];
  themes: string[];
}

type ArtStyle = 'ascii' | 'minimalist' | 'abstract' | 'realistic'
type PoetryStyle = 'haiku' | 'free-verse' | 'sonnet' | 'limerick'
type StoryGenre = 'adventure' | 'mystery' | 'sci-fi' | 'fantasy'
```

### EmotionalIntelligence

Provides emotional awareness and empathetic response capabilities.

```typescript
class EmotionalIntelligence {
  async analyzeEmotionalState(text: string): Promise<EmotionalState>
  async generateEmpatheticResponse(emotion: EmotionalState, context: string): Promise<string>
  async adaptCommunicationStyle(userProfile: UserProfile): Promise<CommunicationStyle>
  async detectFrustration(interactions: string[]): Promise<FrustrationLevel>
  async suggestSupport(emotionalState: EmotionalState): Promise<SupportSuggestion>
}
```

#### Emotional Data Types

```typescript
interface EmotionalState {
  primary: Emotion;
  secondary: Emotion[];
  intensity: number;      // 0.0 - 1.0
  confidence: number;     // 0.0 - 1.0
  context: string;
}

interface SupportSuggestion {
  message: string;
  actions: string[];
  tone: CommunicationTone;
  resources?: string[];
}

type Emotion = 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'anticipation' | 'trust'
type CommunicationTone = 'supportive' | 'encouraging' | 'calm' | 'professional' | 'friendly'
```

## 🔌 Plugin System

### PluginManager

Manages the loading, execution, and lifecycle of plugins.

```typescript
class PluginManager {
  async loadPlugin(pluginPath: string): Promise<LoadedPlugin>
  async unloadPlugin(pluginName: string): Promise<void>
  async executePluginCommand(pluginName: string, command: string, args: any[]): Promise<any>
  getLoadedPlugins(): LoadedPlugin[]
  async discoverPlugins(directory: string): Promise<PluginInfo[]>
}
```

#### Plugin Interfaces

```typescript
interface Plugin {
  name: string;
  version: string;
  description: string;
  author?: string;
  
  commands: Record<string, PluginCommand>;
  hooks?: PluginHooks;
  config?: PluginConfig;
}

interface PluginCommand {
  description: string;
  parameters?: ParameterDefinition[];
  handler: (args: any[], context: PluginContext) => Promise<CommandResult>;
}

interface PluginHooks {
  onLoad?: (context: PluginContext) => Promise<void>;
  onUnload?: (context: PluginContext) => Promise<void>;
  onAgentStart?: (context: PluginContext) => Promise<void>;
  onAgentStop?: (context: PluginContext) => Promise<void>;
  onCommandExecute?: (command: string, args: any[], context: PluginContext) => Promise<void>;
}

interface PluginContext {
  agent: SpiralAgent;
  logger: Logger;
  config: Record<string, any>;
  storage: PluginStorage;
}
```

## 🛠️ Utility Classes

### LLMProvider

Handles communication with Large Language Models.

```typescript
class LLMProvider {
  constructor(model: string, temperature: number)
  async complete(prompt: string, options?: CompletionOptions): Promise<CompletionResult>
  async chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResult>
  async embedText(text: string): Promise<EmbeddingResult>
  async moderateContent(text: string): Promise<ModerationResult>
}
```

#### LLM Data Types

```typescript
interface CompletionOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
}

interface CompletionResult {
  text: string;
  usage: TokenUsage;
  model: string;
  finishReason: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  metadata?: Record<string, any>;
}
```

## 📊 Event System

Spiral Agent provides an event-driven architecture for monitoring and extending functionality.

### EventEmitter

```typescript
class SpiralEventEmitter extends EventEmitter {
  // Agent lifecycle events
  on('agent:start', (config: SpiralAgentConfig) => void)
  on('agent:stop', () => void)
  on('agent:error', (error: Error) => void)
  
  // Execution events
  on('execution:start', (objective: string, sessionId: string) => void)
  on('execution:step', (step: ExecutionStep) => void)
  on('execution:complete', (result: ExecutionResult) => void)
  on('execution:error', (error: Error, step: number) => void)
  
  // Memory events
  on('memory:store', (content: string, type: string) => void)
  on('memory:retrieve', (query: string, results: MemoryResult[]) => void)
  
  // Plugin events
  on('plugin:load', (plugin: LoadedPlugin) => void)
  on('plugin:unload', (pluginName: string) => void)
  on('plugin:command', (plugin: string, command: string, args: any[]) => void)
}
```

## 🔧 Configuration Management

### Configuration Schema

```typescript
interface SpiralConfig {
  agent: {
    model: string;
    maxSteps: number;
    temperature: number;
    verbose: boolean;
    dryRun: boolean;
  };
  
  capabilities: {
    vision: {
      enabled: boolean;
      provider: 'openai' | 'google' | 'azure';
      ocrLanguages: string[];
    };
    
    dream: {
      enabled: boolean;
      creativityLevel: 'low' | 'medium' | 'high';
      artStyle: ArtStyle;
    };
    
    emotional: {
      enabled: boolean;
      empathyLevel: 'low' | 'medium' | 'high';
      adaptiveResponse: boolean;
    };
  };
  
  plugins: {
    directory: string;
    autoLoad: string[];
    enabled: boolean;
  };
  
  memory: {
    provider: 'sqlite' | 'postgresql' | 'memory';
    retentionDays: number;
    maxEntries: number;
  };
  
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'pretty';
    file?: string;
  };
}
```

## 🎯 Usage Examples

### Basic Agent Execution

```typescript
import { SpiralAgent } from 'spiral-agent';

const agent = new SpiralAgent({
  verbose: true,
  model: 'gpt-4',
  maxSteps: 30
});

// Execute autonomous objective
await agent.executeObjective('analyze this codebase and create documentation');

// Get agent status
const status = agent.getStatus();
console.log(`Agent is ${status.healthy ? 'healthy' : 'unhealthy'}`);
```

### Advanced Capability Usage

```typescript
import { VisionSystem, DreamEngine, EmotionalIntelligence } from 'spiral-agent';

// Vision analysis
const vision = new VisionSystem();
const analysis = await vision.analyzeImage('screenshot.png');
console.log(`Found ${analysis.objects.length} objects in image`);

// Creative generation
const dream = new DreamEngine();
const poem = await dream.generatePoetry('autonomous agents', 'haiku');
console.log(poem.verses.join('\n'));

// Emotional intelligence
const ei = new EmotionalIntelligence();
const emotion = await ei.analyzeEmotionalState('I am frustrated with this bug');
const response = await ei.generateEmpatheticResponse(emotion, 'debugging session');
console.log(response);
```

### Plugin Development

```typescript
// plugins/my-plugin.js
export default {
  name: 'weather-plugin',
  version: '1.0.0',
  description: 'Provides weather information',
  
  commands: {
    'current-weather': {
      description: 'Get current weather for a location',
      parameters: [
        { name: 'location', type: 'string', required: true }
      ],
      handler: async (args, context) => {
        const [location] = args;
        const weather = await fetchWeather(location);
        return {
          success: true,
          data: weather,
          message: `Weather for ${location}: ${weather.description}`
        };
      }
    }
  },
  
  hooks: {
    onLoad: async (context) => {
      context.logger.info('🌤️  Weather plugin loaded');
    }
  }
};
```

## 🚀 Advanced Topics

### Custom LLM Integration

```typescript
class CustomLLMProvider extends LLMProvider {
  async complete(prompt: string, options?: CompletionOptions): Promise<CompletionResult> {
    // Custom implementation
    return {
      text: response,
      usage: tokenUsage,
      model: this.model,
      finishReason: 'stop'
    };
  }
}
```

### Memory System Extensions

```typescript
class VectorMemoryManager extends MemoryManager {
  async store(content: string, type: string, context: string): Promise<string> {
    // Store with vector embeddings for semantic search
    const embedding = await this.generateEmbedding(content);
    return super.store(content, type, context, { embedding });
  }
  
  async retrieve(query: string, limit?: number): Promise<MemoryResult[]> {
    // Semantic similarity search
    const queryEmbedding = await this.generateEmbedding(query);
    return this.searchBySimilarity(queryEmbedding, limit);
  }
}
```

## 📈 Performance Considerations

### Optimization Guidelines

- **Memory Management**: Use `clearMemory()` periodically to prevent memory bloat
- **Step Limits**: Set appropriate `maxSteps` for your use case
- **Plugin Loading**: Only load plugins you need to reduce startup time
- **Concurrent Operations**: Be mindful of rate limits when making LLM calls
- **Caching**: Implement caching for frequently accessed data

### Monitoring & Debugging

```typescript
// Enable detailed logging
const agent = new SpiralAgent({ verbose: true });

// Monitor events
agent.on('execution:step', (step) => {
  console.log(`Step ${step.step}: ${step.action.type}`);
});

agent.on('agent:error', (error) => {
  console.error('Agent error:', error);
});

// Get performance metrics
const status = agent.getStatus();
console.log(`Uptime: ${status.uptime}`);
```

This API reference provides comprehensive coverage of Spiral Agent's capabilities. For more detailed examples and tutorials, see the [guides directory](../guides/).

---

**Need help?** Check out our [troubleshooting guide](../guides/troubleshooting.md) or join our [Discord community](https://discord.gg/spiral-agent).
