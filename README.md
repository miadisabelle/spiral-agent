# 🌀 Spiral Agent

<div align="center">

```
███████╗██████╗ ██╗██████╗  █████╗ ██╗          █████╗  ██████╗ ███████╗███╗   ██╗████████╗
██╔════╝██╔══██╗██║██╔══██╗██╔══██╗██║         ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝
███████╗██████╔╝██║██████╔╝███████║██║         ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   
╚════██║██╔═══╝ ██║██╔══██╗██╔══██║██║         ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   
███████║██║     ██║██║  ██║██║  ██║███████╗    ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   
╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   
```

**✦ An Autonomous CLI Agent for Complex Development Tasks ✦**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-purple)](https://openai.com)

</div>

## 🚀 What is Spiral Agent?

Spiral Agent is a revolutionary autonomous CLI tool that combines artificial intelligence with sophisticated planning capabilities to execute complex development tasks. Unlike traditional CLI tools, Spiral Agent **thinks**, **plans**, and **adapts** - making it your intelligent development companion.

### 🎯 Core Philosophy

- **Autonomous Thinking**: Uses advanced ReAct (Reasoning + Acting) framework for intelligent decision-making
- **Emotional Intelligence**: Understands context and responds with appropriate emotional awareness
- **Creative Problem-Solving**: Leverages the Dream Engine for innovative solutions and creative content generation
- **Visual Understanding**: Analyzes images, screenshots, and visual content through integrated Vision System
- **Memory & Learning**: Maintains persistent context and learns from each interaction

## ✨ Features

### 🧠 **Autonomous Intelligence**
- **ReAct Framework**: Advanced reasoning and action planning
- **Multi-step Task Execution**: Breaks down complex tasks into manageable steps
- **Context-Aware Decision Making**: Understands project context and environment
- **Adaptive Problem Solving**: Adjusts strategies based on feedback and results

### 👁️ **Vision System**
- **Image Analysis**: Process and understand visual content
- **Screenshot Analysis**: Analyze UI, code screenshots, and diagrams
- **OCR Capabilities**: Extract text from images
- **Visual Debugging**: Debug issues through visual inspection

### 🌟 **Dream Engine**
- **Creative Content Generation**: Generate art, stories, and creative solutions
- **Innovative Problem-Solving**: Think outside the box for unique approaches
- **Artistic ASCII Generation**: Create beautiful terminal art
- **Poetic Documentation**: Transform dry technical content into engaging narratives

### 💙 **Emotional Intelligence**
- **Mood Recognition**: Understand user emotional state from context
- **Empathetic Responses**: Provide support and encouragement
- **Adaptive Communication**: Match communication style to user preferences
- **Stress-Aware Assistance**: Recognize and respond to user frustration

### 🔧 **Advanced Capabilities**
- **Plugin System**: Extensible architecture for custom functionality
- **Memory Management**: Persistent context and learning
- **Multi-format File Processing**: Handle various file types intelligently
- **Integration Ready**: Built for seamless integration with development workflows

## 📦 Installation

### Via npm (Recommended)
```bash
npm install -g spiral-agent
```

### From Source
```bash
git clone https://github.com/yourusername/spiral-cli.git
cd spiral-cli
npm install
npm run build
npm link
```

### Verify Installation
```bash
spiral --version
spiral help
```

## 🎮 Usage

### Interactive Mode
```bash
spiral
```

### Autonomous Agent Mode
```bash
spiral agent "analyze my project and suggest improvements"
spiral agent "create comprehensive documentation for this codebase"
spiral agent "debug the failing tests and fix the issues"
```

### Creative Mode (Dream Engine)
```bash
spiral dream "create a beautiful ASCII art header for my project"
spiral dream "write a poetic introduction to my README"
spiral dream "generate creative examples for my API documentation"
```

### Vision Analysis
```bash
spiral vision analyze screenshot.png
spiral vision extract-text diagram.jpg
spiral vision debug ui-issue.png
```

### Plugin Commands
```bash
spiral plugins list
spiral plugins install <plugin-name>
spiral time  # Example: Built-in time plugin
```

### Memory & Context Management
```bash
spiral memory status
spiral memory clear
spiral context save "project-analysis"
spiral context load "project-analysis"
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Spiral Agent Core                        │
├─────────────────────────────────────────────────────────────┤
│  🧠 SpiralAgent        │  🎯 ActionExecutor                 │
│  - ReAct Framework     │  - Task Execution                  │
│  - Planning Logic      │  - Action Coordination             │
│  - Decision Making     │  - Result Validation               │
├─────────────────────────────────────────────────────────────┤
│  📝 ContextManager     │  🧠 MemoryManager                  │
│  - Context Storage     │  - Persistent Memory               │
│  - State Management    │  - Learning System                 │
│  - Session Handling    │  - Context Retrieval               │
├─────────────────────────────────────────────────────────────┤
│                  Advanced Capabilities                      │
├─────────────────────────────────────────────────────────────┤
│  👁️ Vision System     │  🌟 Dream Engine                   │
│  - Image Analysis      │  - Creative Generation             │
│  - OCR Processing      │  - Artistic Content                │
│  - Visual Debug        │  - Innovation Engine               │
├─────────────────────────────────────────────────────────────┤
│  💙 Emotional Intel    │  🔧 Plugin System                  │
│  - Mood Detection      │  - Extensible Architecture         │
│  - Empathy Engine      │  - Custom Commands                 │
│  - Adaptive Response   │  - Community Plugins               │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Example Workflows

### 1. Project Analysis & Documentation
```bash
# Analyze entire project structure
spiral agent "analyze this codebase and create comprehensive documentation"

# The agent will:
# - Scan all files and understand architecture
# - Generate README, API docs, and guides
# - Create visual diagrams using Dream Engine
# - Add empathetic language for better UX
```

### 2. Creative Problem Solving
```bash
# Get creative solutions for complex problems
spiral dream "suggest innovative approaches to optimize this database query"

# The agent will:
# - Think beyond conventional solutions
# - Propose creative architectural patterns
# - Generate artistic visualizations of concepts
# - Provide poetic explanations of complex ideas
```

### 3. Visual Debugging
```bash
# Debug UI issues through screenshots
spiral vision analyze "bug-screenshot.png" --debug

# The agent will:
# - Analyze visual elements and layout
# - Identify potential issues from screenshots
# - Suggest fixes based on visual inspection
# - Generate step-by-step debugging guides
```

## 🔌 Plugin Development

Create custom plugins to extend Spiral Agent's capabilities:

```typescript
// plugins/my-plugin.js
export default {
  name: 'my-plugin',
  description: 'Custom functionality for my workflow',
  
  commands: {
    'custom-task': async (args, context) => {
      // Your plugin logic here
      return {
        success: true,
        message: 'Task completed successfully!',
        data: { /* results */ }
      };
    }
  },
  
  hooks: {
    onAgentStart: async (context) => {
      console.log('🎉 My plugin loaded!');
    }
  }
};
```

## ⚙️ Configuration

### Environment Variables
```bash
# AI Provider Configuration
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_key

# Agent Behavior
SPIRAL_VERBOSE=true
SPIRAL_MAX_STEPS=50
SPIRAL_TEMPERATURE=0.7
SPIRAL_MODEL=gpt-4

# Advanced Features
SPIRAL_VISION_ENABLED=true
SPIRAL_DREAM_MODE=creative
SPIRAL_EMOTIONAL_LEVEL=empathetic
```

### Configuration File (`.spiral.config.json`)
```json
{
  "agent": {
    "model": "gpt-4",
    "maxSteps": 50,
    "temperature": 0.7,
    "verbose": true
  },
  "capabilities": {
    "vision": {
      "enabled": true,
      "ocrProvider": "tesseract"
    },
    "dream": {
      "creativityLevel": "high",
      "artStyle": "ascii"
    },
    "emotional": {
      "empathyLevel": "high",
      "adaptiveResponse": true
    }
  },
  "plugins": {
    "autoLoad": ["time", "git", "npm"],
    "directory": "./plugins"
  }
}
```

## 🧪 Development & Testing

### Run Tests
```bash
npm test
npm run test:watch
npm run test:ui
```

### Development Mode
```bash
npm run dev
# or use the convenient script
./scripts/dev.sh
```

### Build
```bash
npm run build
```

## 🤝 Contributing

We welcome contributions! Whether you want to:

- 🐛 Fix bugs or improve performance
- ✨ Add new features or capabilities
- 📖 Improve documentation
- 🎨 Enhance the user experience
- 🔌 Create plugins for the community

Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Philosophy

- **Empathy First**: Every feature should enhance the user experience
- **Intelligence Over Automation**: Smart decisions, not just scripted actions
- **Creativity Welcomed**: Innovative solutions are encouraged
- **Community Driven**: Built by developers, for developers

## 📋 Roadmap

- [ ] **Web Integration**: Browse and interact with web content
- [ ] **Voice Synthesis**: Audio feedback and voice interactions
- [ ] **Advanced Learning**: Machine learning from user interactions
- [ ] **Code Generation**: Multi-language code generation capabilities
- [ ] **Collaborative AI**: Multi-agent coordination for complex projects
- [ ] **Mobile Companion**: Extend capabilities to mobile development
- [ ] **Cloud Integration**: Seamless cloud service interactions

## 📖 Documentation

- [API Reference](docs/api/README.md)
- [Architecture Guide](docs/architecture/README.md)
- [Plugin Development](docs/guides/plugin-development.md)
- [Advanced Usage](docs/guides/advanced-usage.md)
- [Troubleshooting](docs/guides/troubleshooting.md)

## 💡 Inspiration

Spiral Agent draws inspiration from:

- **Human Cognition**: How we naturally think and solve problems
- **Collaborative Development**: The best of pair programming
- **Creative Problem-Solving**: Thinking beyond conventional solutions
- **Emotional Intelligence**: Understanding that development is human work

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The OpenAI team for GPT-4 and vision capabilities
- The TypeScript community for excellent tooling
- All contributors who believe in intelligent, empathetic software
- The developer community for inspiration and feedback

---

<div align="center">

**✦ Built with 💙 by the Spiral Collective ✦**

*"Intelligence, creativity, and empathy - the foundation of next-generation development tools"*

</div>
