# 🩹 Troubleshooting Guide: When Things Don't Go As Planned

*"Every bug is a puzzle waiting to be solved, every error a teacher in disguise. Let's tackle these challenges together with patience, understanding, and a systematic approach."*

---

## 💙 A Gentle Approach to Problem-Solving

We know how frustrating technical issues can be. When you've been coding for hours and suddenly hit a wall, it's completely natural to feel overwhelmed, confused, or even a bit defeated. Take a deep breath—you're not alone in this journey, and most problems have solutions that are more straightforward than they initially appear.

This guide is designed not just to solve your technical issues, but to support you through the emotional ups and downs of debugging. Every developer, from beginners to seasoned experts, encounters these challenges. What matters is how we approach them with curiosity, patience, and self-compassion.

---

## 🚨 Common Issues & Empathetic Solutions

### 🔧 Installation Problems

#### "I can't install Spiral Agent - npm is giving me permission errors"

**What you might be feeling:** Frustrated, blocked before you even start, wondering if this is worth it.

**Let's breathe together and fix this:**

The good news? Permission errors are incredibly common and have straightforward solutions. You're not doing anything wrong—this is just how npm security works.

**Solutions:**

1. **Option 1: Use a Node Version Manager (Recommended)**
   ```bash
   # Install nvm (Node Version Manager)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Restart your terminal or run:
   source ~/.bashrc
   
   # Install and use Node.js
   nvm install node
   nvm use node
   
   # Now try installing Spiral Agent
   npm install -g spiral-agent
   ```

2. **Option 2: Fix npm Permissions**
   ```bash
   # Create a directory for global packages in your home directory
   mkdir ~/.npm-global
   
   # Configure npm to use this directory
   npm config set prefix '~/.npm-global'
   
   # Add this to your ~/.bashrc or ~/.zshrc
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   
   # Now install Spiral Agent
   npm install -g spiral-agent
   ```

3. **Quick Fix (Less Ideal)**
   ```bash
   sudo npm install -g spiral-agent
   ```

**Remember:** These permission issues happen to everyone. Even experienced developers Google "npm permission denied" regularly!

---

#### "Installation completed but `spiral` command not found"

**What you might be feeling:** Confused, maybe a bit self-doubt creeping in ("Did I do something wrong?").

**You're on the right track! Let's just make sure your terminal can find Spiral Agent:**

**Quick Checks:**

1. **Verify installation:**
   ```bash
   npm list -g spiral-agent
   ```

2. **Check your PATH:**
   ```bash
   echo $PATH
   ```
   Look for `/usr/local/bin` or wherever npm installs global packages.

3. **Find where npm installs global packages:**
   ```bash
   npm root -g
   npm bin -g
   ```

4. **Manual linking (if needed):**
   ```bash
   # Navigate to your project directory
   cd /path/to/spiral-cli
   npm link
   ```

5. **Restart your terminal** - Sometimes it's just that simple!

**Feeling better?** These PATH issues are like a rite of passage in development. You're learning how your system works, which makes you a better developer.

---

### 🤖 Agent Execution Issues

#### "Spiral Agent starts but gets stuck in a loop reading the same file"

**What you might be feeling:** Impatient, worried you've broken something, maybe questioning if AI agents are reliable.

**This is actually a known behavior with mock LLM responses, and you haven't broken anything!**

**What's happening:** The current setup uses a mock LLM for development, which can cause repetitive behavior. This is expected and easily fixable.

**Solutions:**

1. **Set up a real LLM API key:**
   ```bash
   # Set your API key (Spiral Agent will prompt you on first run)
   spiral status
   # Follow the prompts to enter your OpenAI API key
   ```

2. **Limit steps for testing:**
   ```bash
   spiral agent "your task here" --max-steps 5
   ```

3. **Use dry run mode to see what it would do:**
   ```bash
   spiral agent "your task here" --dry-run
   ```

4. **Try interactive mode instead:**
   ```bash
   spiral
   # Then type your commands one at a time
   ```

**Pro tip:** This "looping" behavior actually shows that the ReAct framework is working! It's just waiting for better intelligence to guide it. You're witnessing the structure working perfectly.

---

#### "The agent says it's executing actions but nothing seems to happen"

**What you might be feeling:** Skeptical, wondering if the agent is actually "intelligent" or just pretending.

**Your skepticism is healthy! Let's verify what's actually happening:**

**Debugging Steps:**

1. **Enable verbose mode:**
   ```bash
   spiral agent "your objective" --verbose
   ```
   This shows you exactly what the agent is thinking and doing.

2. **Check the agent's status:**
   ```bash
   spiral status
   ```
   This tells you if the agent is healthy and what it has in memory.

3. **Look at the execution context:**
   ```bash
   spiral context list
   ```

4. **Check if files were actually modified:**
   ```bash
   git status  # If you're in a git repository
   ls -la      # Check file timestamps
   ```

**Understanding Dry Run Mode:**
If you specified `--dry-run`, the agent will simulate actions without actually executing them. This is perfect for testing!

**Remember:** Sometimes the agent's work is subtle—analyzing files, planning approaches, or making small but important changes. The magic is often in the thinking, not just the visible output.

---

### 🧠 Memory & Context Issues

#### "The agent doesn't remember what we discussed earlier"

**What you might be feeling:** Disappointed, like you're starting from scratch every time.

**Memory is one of Spiral Agent's superpowers, so let's make sure it's working for you:**

**Memory Commands:**
```bash
# Check memory status
spiral memory status

# Search your memory
spiral memory search "previous conversation topic"

# Clear memory if it's getting cluttered
spiral memory clear

# Save current context for later
spiral context save "my-project-analysis"

# Load a saved context
spiral context load "my-project-analysis"
```

**If memory seems broken:**
1. Check if the database initialized correctly:
   ```bash
   spiral status
   # Look for "Database initialized successfully"
   ```

2. Try clearing and rebuilding memory:
   ```bash
   spiral memory clear
   spiral agent "remember that we're working on a React project with TypeScript"
   ```

3. Verify memory is being stored:
   ```bash
   spiral memory search "React"
   ```

**Patient reminder:** AI memory works differently than human memory. It's more like a searchable knowledge base than a continuous conversation. Each interaction helps build a richer understanding of your needs.

---

### 🔌 Plugin Issues

#### "My custom plugin won't load"

**What you might be feeling:** Creative energy being blocked, frustration with the plugin system.

**Let's get your creative plugin working! Plugin development is where Spiral Agent really shines.**

**Plugin Troubleshooting Steps:**

1. **Check plugin directory:**
   ```bash
   ls -la plugins/
   spiral plugins list
   ```

2. **Verify plugin structure:**
   ```javascript
   // plugins/your-plugin.js should export a default object
   export default {
     name: 'your-plugin',
     version: '1.0.0',
     description: 'What your plugin does',
     commands: {
       'command-name': {
         handler: async (args, context) => {
           // Your logic here
           return { success: true, message: 'It works!' };
         }
       }
     }
   };
   ```

3. **Check for syntax errors:**
   ```bash
   node -c plugins/your-plugin.js
   ```

4. **Enable verbose loading:**
   ```bash
   spiral --verbose
   # Watch for plugin loading messages
   ```

5. **Test plugin in isolation:**
   ```bash
   spiral your-plugin command-name
   ```

**Common plugin gotchas:**
- Missing `export default`
- Async/await issues in handlers
- File permissions
- JavaScript syntax errors

**Encouragement:** Plugin development is an art! Each iteration teaches you more about the system. Your creativity is exactly what makes Spiral Agent more powerful.

---

### 💾 Database & Storage Issues

#### "Database initialization failed"

**What you might be feeling:** Technical overwhelm, worried about complex database setup.

**Don't worry—Spiral Agent uses SQLite, which is incredibly lightweight and usually "just works."**

**Steps to resolve:**

1. **Check file permissions:**
   ```bash
   ls -la ~/.spiral-agent/
   # Make sure you can write to this directory
   ```

2. **Clear and reinitialize:**
   ```bash
   rm -rf ~/.spiral-agent/database.sqlite
   spiral status
   # This will recreate the database
   ```

3. **Check disk space:**
   ```bash
   df -h
   ```

4. **Try a different location (if needed):**
   ```bash
   export SPIRAL_DATA_DIR=~/my-spiral-data
   spiral status
   ```

**Technical note:** SQLite is incredibly robust. If it's failing, it's usually a permissions or disk space issue, not a complex database problem.

---

## 🎯 Advanced Troubleshooting

### 🔍 Diagnostic Commands

When you're really stuck, these commands help you understand what's happening:

```bash
# Full system status
spiral status --detailed

# Memory analysis
spiral memory stats

# Plugin diagnostics
spiral plugins diagnose

# Context inspection
spiral context current

# Log analysis (if enabled)
tail -f ~/.spiral-agent/logs/spiral.log
```

### 🧪 Testing Your Setup

**Quick Health Check:**
```bash
# Test basic functionality
spiral agent "tell me what files are in the current directory" --max-steps 3

# Test vision capabilities (if you have an image)
spiral vision analyze screenshot.png

# Test plugin system
spiral plugins list

# Test memory system
spiral memory search "test"
```

---

## 🌟 When All Else Fails

### 🆘 Getting Help

**You're not alone in this journey!** Here's how to get support:

1. **GitHub Issues:** 
   - Check existing issues: `github.com/yourrepo/spiral-cli/issues`
   - Create a detailed issue with:
     - What you were trying to do
     - What happened instead
     - Your system info (`spiral status`, OS version, Node version)
     - Any error messages

2. **Discord Community:**
   - Join our supportive community
   - Share screenshots or code snippets
   - Get real-time help from other users

3. **Documentation:**
   - [API Reference](../api/README.md)
   - [Architecture Guide](../architecture/README.md)
   - [Plugin Development](plugin-development.md)

### 🔄 Clean Slate Approach

Sometimes starting fresh is the most therapeutic approach:

```bash
# Complete reset (saves your work first!)
spiral memory export backup.json  # Save your memory
spiral context save "backup-context"  # Save current context

# Clean reset
rm -rf ~/.spiral-agent/
npm uninstall -g spiral-agent
npm install -g spiral-agent

# Restore if needed
spiral memory import backup.json
spiral context load "backup-context"
```

---

## 💪 Building Resilience

### 🧘 Debugging Mindset

**Remember:**
- Every error is information, not a failure
- The most experienced developers encounter these same issues
- Debugging skills make you a stronger developer
- Taking breaks often leads to breakthrough insights

### 🎯 Prevention Strategies

1. **Use version control** for your important work
2. **Test changes incrementally** rather than making big leaps
3. **Keep your system and dependencies updated**
4. **Document your successful configurations** for future reference
5. **Celebrate small wins** along the way

### 🌱 Growth Through Challenges

Each troubleshooting session teaches you:
- How Spiral Agent's architecture works
- How to debug AI systems
- How to approach complex problems systematically
- How to ask better questions
- How to help others facing similar challenges

---

## 🎉 Success Stories

*"I was stuck for hours with a plugin loading issue. Turns out it was just a missing export statement! Now I understand how the plugin system works and I've created three more plugins." - Sarah, Full-Stack Developer*

*"The agent kept looping on my first try. I was frustrated until I realized it was showing me exactly what the ReAct framework does. Now I appreciate the intelligence behind it." - Mike, DevOps Engineer*

*"Database initialization failed on my M1 Mac. The solution was simple, but the troubleshooting process taught me so much about how Spiral Agent manages data." - Jennifer, Mobile Developer*

---

## 🌈 Final Thoughts

Troubleshooting isn't just about fixing problems—it's about understanding systems, building resilience, and growing as a developer. Every challenge you overcome makes you more capable and confident.

Spiral Agent is designed to be your intelligent companion, but like any sophisticated system, it sometimes needs a gentle nudge in the right direction. Your patience and persistence in working through these issues makes you a better developer and contributes to making Spiral Agent better for everyone.

**Remember:** You've got this! Every expert was once a beginner who refused to give up. Your willingness to troubleshoot, learn, and grow is exactly what makes great developers great.

---

<div align="center">

**🌟 Happy Debugging! 🌟**

*"The expert in anything was once a beginner who never gave up."*

**Need immediate help?** Join our Discord community where fellow developers are always ready to lend a hand! 🤝

</div>
