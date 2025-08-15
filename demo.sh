#!/bin/bash

echo "🚀 Spiral Agent CLI Demo"
echo "======================="
echo ""

echo "📋 Available Commands:"
node dist/index.js --help
echo ""

echo "📊 Agent Status:"
node dist/index.js status
echo ""

echo "🧠 Memory Search Example:"
node dist/index.js memory search "test"
echo ""

echo "⏰ Plugin Example (Time):"
node dist/index.js time
echo ""

echo "🔬 Dry Run Example:"
echo "Running: node dist/index.js agent --dry-run --max-steps 5 'show me the package.json'"
node dist/index.js agent --dry-run --max-steps 5 "show me the package.json"
echo ""

echo "✨ Demo Complete!"
echo ""
echo "Next steps to enhance this CLI:"
echo "- Replace MockLLMProvider with real AI API (OpenAI, Anthropic, etc.)"
echo "- Add more sophisticated plugins"
echo "- Implement real vision analysis with APIs"
echo "- Connect to real databases for memory persistence"
echo "- Add more action types (CODE_EDIT, DEPLOY, etc.)"
