# 🤝 Contributing to Spiral Agent

Welcome to the Spiral Agent community! We're thrilled that you're interested in contributing to this revolutionary autonomous CLI tool. Whether you're fixing bugs, adding features, improving documentation, or sharing ideas, every contribution makes Spiral Agent more intelligent, creative, and empathetic.

## 🎯 Our Mission

Spiral Agent aims to be more than just another CLI tool—it's an intelligent companion that thinks, creates, and adapts. We believe in building software with:

- **Intelligence**: Smart decision-making over simple automation
- **Creativity**: Innovative solutions and artistic expression  
- **Empathy**: Understanding and supporting the human experience of development
- **Community**: Collaborative growth and shared learning

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TypeScript knowledge (recommended)
- Git fundamentals
- A passion for AI-powered development tools!

### Setting Up Your Development Environment

1. **Fork and Clone**
```bash
git clone https://github.com/YOUR_USERNAME/spiral-cli.git
cd spiral-cli
```

2. **Install Dependencies**
```bash
npm install
```

3. **Build the Project**
```bash
npm run build
```

4. **Link for Local Testing**
```bash
npm link
```

5. **Verify Setup**
```bash
spiral --help
spiral status
```

6. **Run Tests**
```bash
npm test
```

### Development Workflow

1. **Start Development Mode**
```bash
npm run dev
# or
./scripts/dev.sh
```

2. **Make Your Changes**
   - Follow our coding standards
   - Write tests for new features
   - Update documentation as needed

3. **Test Thoroughly**
```bash
npm test
npm run build
spiral agent "test my new feature"
```

## 🎨 Ways to Contribute

### 🐛 Bug Reports

Found a bug? We want to hear about it! Please:

1. Check existing issues first
2. Use our bug report template
3. Include:
   - Clear reproduction steps
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Error messages and logs

### ✨ Feature Requests

Have an idea for making Spiral Agent even more amazing?

1. Check if it's already been requested
2. Use our feature request template  
3. Describe:
   - The problem you're solving
   - Your proposed solution
   - Why it aligns with our mission
   - Any implementation ideas

### 🔧 Code Contributions

Ready to dive into the code? Here's what we love to see:

#### Core Agent Features
- Enhanced ReAct reasoning capabilities
- Improved context management
- Better error handling and recovery
- Performance optimizations

#### Advanced Capabilities
- **Vision System**: Image analysis, OCR improvements, visual debugging
- **Dream Engine**: Creative content generation, artistic features
- **Emotional Intelligence**: Mood detection, empathetic responses
- **Plugin System**: New plugin types, better APIs

#### Infrastructure
- Test coverage improvements
- Build system enhancements
- CI/CD pipeline additions
- Documentation automation

### 📖 Documentation

Documentation is crucial for our community! Help us by:

- Improving existing docs
- Adding missing examples
- Creating tutorials and guides
- Translating content
- Recording demo videos

### 🔌 Plugin Development

Create plugins that extend Spiral Agent's capabilities:

```typescript
// Example plugin structure
export default {
  name: 'my-awesome-plugin',
  version: '1.0.0',
  description: 'Adds amazing functionality',
  
  commands: {
    'awesome-command': async (args, context) => {
      // Your plugin magic here
      return {
        success: true,
        message: 'Awesome task completed!',
        data: results
      };
    }
  }
};
```

## 📋 Code Standards

### TypeScript Guidelines

- Use strict TypeScript settings
- Prefer interfaces over types when possible
- Export types and interfaces for extensibility
- Document complex types with JSDoc

```typescript
/**
 * Represents an autonomous agent action
 */
interface AgentAction {
  type: ActionType;
  payload: ActionPayload;
  metadata?: ActionMetadata;
}
```

### Code Style

- Use ESLint and Prettier (configured in the project)
- Prefer async/await over callbacks
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

```typescript
/**
 * Executes an autonomous agent task with emotional awareness
 * @param task - The task to execute
 * @param context - Current execution context  
 * @returns Promise resolving to execution result
 */
async function executeWithEmpathy(
  task: AgentTask, 
  context: ExecutionContext
): Promise<ExecutionResult> {
  // Implementation here
}
```

### Testing Standards

- Write tests for all new features
- Use descriptive test names
- Include both positive and negative test cases
- Test error conditions and edge cases

```typescript
describe('Dream Engine', () => {
  it('should generate creative ASCII art for given prompt', async () => {
    const result = await dreamEngine.generateArt('spiral galaxy');
    expect(result.success).toBe(true);
    expect(result.art).toContain('*');
  });

  it('should handle empty prompts gracefully', async () => {
    const result = await dreamEngine.generateArt('');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

## 🎭 Architecture Guidelines

### Core Principles

1. **Modularity**: Each component should have a single responsibility
2. **Extensibility**: Design for future growth and plugin integration
3. **Testability**: Write code that's easy to test and debug
4. **Performance**: Consider resource usage and optimization
5. **User Experience**: Always prioritize the developer experience

### Component Structure

```
src/
├── agent/           # Core agent logic
│   ├── SpiralAgent.ts
│   ├── ActionExecutor.ts
│   ├── ContextManager.ts
│   └── MemoryManager.ts
├── capabilities/    # Advanced features
│   ├── VisionSystem.ts
│   ├── DreamEngine.ts
│   └── EmotionalIntelligence.ts
├── plugins/        # Plugin system
├── commands/       # CLI commands
├── utils/          # Shared utilities
└── types/          # TypeScript definitions
```

### Plugin Architecture

Plugins should be:
- **Self-contained**: No external dependencies on other plugins
- **Well-documented**: Clear APIs and usage examples
- **Error-resilient**: Handle failures gracefully
- **Configurable**: Allow user customization

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# UI testing dashboard
npm run test:ui

# Coverage report
npm run test:coverage
```

### Test Categories

1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Component interaction testing  
3. **E2E Tests**: Full CLI workflow testing
4. **Plugin Tests**: Plugin functionality and integration

### Writing Good Tests

```typescript
// ✅ Good: Descriptive, focused test
it('should analyze image content and extract meaningful information', async () => {
  const mockImage = createMockImage('test-screenshot.png');
  const result = await visionSystem.analyzeImage(mockImage);
  
  expect(result.success).toBe(true);
  expect(result.analysis).toMatchObject({
    objects: expect.arrayContaining(['button', 'text']),
    text: expect.stringContaining('Login'),
    layout: expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number)
    })
  });
});

// ❌ Avoid: Vague, testing multiple things
it('should work', async () => {
  const result = await doSomething();
  expect(result).toBeTruthy();
});
```

## 📝 Documentation Standards

### README Updates

When adding features, update the README with:
- Feature description in the appropriate section
- Usage examples with code snippets  
- Configuration options
- Any breaking changes

### Code Documentation

```typescript
/**
 * The Dream Engine enables creative content generation and artistic expression
 * within the Spiral Agent ecosystem.
 * 
 * @example
 * ```typescript
 * const engine = new DreamEngine();
 * const poem = await engine.generatePoetry('autonomous agents');
 * const art = await engine.generateAsciiArt('spiral galaxy');
 * ```
 */
class DreamEngine {
  /**
   * Generates creative poetry based on the given theme
   * @param theme - The creative theme or subject
   * @param style - Optional poetry style (haiku, free-verse, etc.)
   * @returns Promise resolving to generated poetry
   */
  async generatePoetry(theme: string, style?: PoetryStyle): Promise<Poetry> {
    // Implementation
  }
}
```

## 🚦 Pull Request Process

### Before You Submit

- [ ] Code compiles without warnings
- [ ] All tests pass
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Changes align with project goals

### PR Template

Use this template for your pull requests:

```markdown
## 🎯 What This PR Does

Brief description of the changes and motivation.

## 🔄 Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)  
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)

## 🧪 Testing

- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested the changes manually

## 📖 Documentation

- [ ] I have updated the documentation accordingly
- [ ] I have added inline code comments where necessary

## ✅ Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published

## 🎨 Screenshots (if applicable)

Include screenshots or GIFs demonstrating the changes.
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and checks
2. **Code Review**: Team members review for quality and alignment  
3. **Testing**: Changes are tested in different environments
4. **Merge**: Approved changes are merged to main branch

## 🌟 Recognition

We celebrate our contributors! Your contributions will be:

- Acknowledged in our release notes
- Added to our contributors list
- Featured in our community highlights (with permission)
- Eligible for contributor rewards and recognition

## 📬 Communication

### Discord Community

Join our Discord server for:
- Real-time discussions
- Getting help with contributions
- Sharing ideas and feedback
- Community events and showcases

### GitHub Discussions

Use GitHub Discussions for:
- Feature brainstorming
- Architecture discussions  
- Q&A and support
- Showcasing plugins and extensions

### Regular Meetings

- **Office Hours**: Weekly contributor Q&A sessions
- **Planning Meetings**: Monthly roadmap discussions
- **Demo Days**: Quarterly feature showcases

## 🎓 Learning Resources

New to the project? Here are some resources to help you get started:

### Understanding the Codebase

- [Architecture Overview](docs/architecture/README.md)
- [API Reference](docs/api/README.md)
- [Plugin Development Guide](docs/guides/plugin-development.md)

### AI and LLM Concepts

- ReAct (Reasoning + Acting) Framework
- Prompt Engineering Best Practices
- Multi-modal AI Integration
- Context Management Strategies

### Development Tools

- TypeScript Advanced Patterns
- Node.js CLI Development
- Testing with Vitest
- AI API Integration

## 🤔 Questions?

Don't hesitate to ask! We're here to help:

- 💬 **Discord**: Join our community server
- 🐛 **Issues**: Create a GitHub issue for bugs
- 💡 **Discussions**: Use GitHub Discussions for questions
- 📧 **Email**: reach out to our maintainer team

## 💙 Thank You!

Every contribution, no matter how small, makes Spiral Agent better for everyone. Whether you're fixing a typo, adding a feature, or helping someone in the community—you're making a difference.

Together, we're building the future of intelligent, creative, and empathetic development tools.

---

*"In the spiral of innovation, every contributor adds their unique thread to the beautiful tapestry of what we create together."*

**✨ Happy Contributing! ✨**
