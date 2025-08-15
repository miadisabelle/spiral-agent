# CLI Foundation Toolkit

## Introduction

This file empowers any CLI working directory with a master-level development foundation, integrating instructions, tools, Model Context Protocols (MCPs), APIs, commands, prompts, error handling, and autonomous operation. Place it in your project root (e.g., `~/Desktop/my-cli-project/`) to unlock a robust, scalable system surpassing expert human developers.

## Setup Instructions

### Initialize Environment:

1.  **Install Node.js (v20+):** `brew install node` (macOS) or `sudo apt install nodejs` (Linux).
2.  **Create a `.env` file:** `touch .env` and add `API_KEY=your-key-here DATABASE_URL=file:./dev.db`.
3.  **Install dependencies:** `npm init -y; npm install typescript @types/node prisma langchain commander cheerio axios pm2 inquirer chalk ora boxen`.

### Directory Structure:

-   `src/`: CLI logic and tools.
    -   `commands/`: Command definitions.
    - `utils/`: Helper functions.
    - `plugins/`: Extensible modules.
    - `agent/`: Core agent logic.
-   `prisma/`: Database schema.
-   `tests/`: Validation scripts.
-   `scripts/`: Autonomous runners.
-   `docs/`: This file and notes.

## Core Tools

-   **TypeScript:** Type-safe CLI scripts (`src/cli.ts`).
-   **Commander.js / Yargs:** Robust command-line argument parsing. (`npm install commander`)
-   **Prisma:** ORM for data persistence (`prisma/schema.prisma`).
-   **Axios:** HTTP requests (`npm install axios`).
-   **PM2:** Process management for autonomy (`npm install pm2 -g`).
-   **Cron:** Scheduling for autonomous tasks (`brew install cron` or `sudo apt install cron`).

### UI & Interaction

-   **Inquirer.js:** Interactive command-line prompts (`npm install inquirer`).
-   **Chalk:** Terminal string styling (`npm install chalk`).
-   **Ora:** Elegant terminal spinners (`npm install ora`).
-   **Boxen:** Create boxes and borders in the terminal (`npm install boxen`).

### Web Scraping & Automation

-   **Cheerio:** Server-side HTML parsing and manipulation (`npm install cheerio`).
-   **Puppeteer:** Headless Chrome browser automation for dynamic sites (`npm install puppeteer`).

## Model Context Protocols (MCPs)

### Frameworks

-   **LangChain:** A framework for developing applications powered by language models, including tool integration and memory.
-   **Haystack:** Open-source framework for building custom LLM applications, with a focus on semantic search.

### Vector Stores (for Memory & Embeddings)

-   **ChromaDB:** Open-source embedding database. Easy to run locally.
-   **Weaviate:** Open-source, AI-native vector search engine.
-   **FAISS (Facebook AI Similarity Search):** A library for efficient similarity search, suitable for large-scale applications.
-   **Local File System:** For simple use cases, store vectors directly on disk using formats like JSON or HDF5.

### Local Model Inference

-   **LLaMA.cpp:** High-performance inference for LLaMA models on local CPU/GPU.
-   **Ollama:** Run open-source large language models, like Llama 2, locally.
-   **GPT4All:** An ecosystem to run powerful and customized large language models locally on consumer-grade CPUs.

## APIs

### Foundational Model APIs

-   **OpenAI (Free Tier):** Access to models like GPT-3.5-Turbo.
-   **xAI Grok (Free Access):** Context-aware models via `https://x.ai/api`.
-   **Cohere (Free Tier):** Access to powerful language models with a focus on enterprise use cases.
-   **Hugging Face Hub:** Access thousands of open-source models and datasets via the `transformers.js` library or direct API calls.
-   **Replicate:** Run a vast library of open-source models with a simple cloud API.

### Utility APIs

-   **GitHub API:** Automate repository management, issue tracking, and more.
-   **SerpApi / SearchApi:** Scrape Google and other search engine results.
-   **Weather APIs (OpenWeatherMap, WeatherAPI.com):** Integrate real-time weather data.

## Data Handling

-   **YAML/JSON:** Standard formats for configuration and data exchange. Use libraries like `js-yaml`.
-   **CSV:** For handling tabular data. Use a library like `csv-parse`.
-   **SQLite:** A simple, file-based SQL database, perfect for local data storage without needing a separate server. Prisma supports it out of the box.

## Extensibility & Plugins

Design your CLI to be extensible from the start.

-   **Plugin Architecture:** Create a `plugins` directory. The CLI can dynamically load and register commands from JavaScript or TypeScript files in this directory.
-   **Dynamic Command Loading:** Use `commander` or `yargs` to scan the `plugins` directory and register commands at runtime.
-   **Plugin Manifest:** Use a `manifest.json` file within each plugin directory to declare its name, commands, and dependencies.
-   **Hooks System:** Implement an event-based system where plugins can "hook" into different parts of your CLI's lifecycle (e.g., `beforeCommand`, `afterCommand`).

## Agentic Loop & Core Logic

This section outlines the core decision-making and execution cycle of a sophisticated CLI agent, often modeled after a Reason-Act (ReAct) framework.

### Context Management

-   **ContextManager:** A central class responsible for holding the agent's state for a given task. It should manage:
    -   The initial user request.
    -   A history of actions taken.
    -   The output or observations from each action.
    -   The current plan or objective.
-   **context_memory:** A persistent memory store (e.g., a Vector Store like ChromaDB) that the agent can query to retrieve relevant information from past interactions or a knowledge base.

### Dynamic Planning & Step-by-Step Execution

The agent operates in a loop, continuously deciding on the next action until the task is complete.

1.  **`_ask_grok_for_next_step`**: Based on the current context (the user's goal, what has been done so far), this function queries the LLM (e.g., Grok, OpenAI). The prompt asks the model to reason about the problem and return the next single, executable action.

    *Pseudo-code Request:*
    ```json
    {
      "role": "user",
      "content": "Objective: Refactor the auth logic in src/auth.py to use requests.\nHistory: I have read the file src/auth.py. It uses urllib.\nBased on this, what is the single next action I should take? Choose from: READ, SHELL, CODE, INFO, MEMORY, FINISH."
    }
    ```

2.  **`_execute_step`**: This function takes the action proposed by the LLM and executes it using the appropriate handler.

### Action Handling

The agent should be able to perform a discrete set of actions. The response from the LLM should be parsed into one of these types:

-   **READ**: Read the content of a file. (e.g., `READ:./src/auth.py`)
-   **SHELL**: Execute a shell command. (e.g., `SHELL:npm install requests`)
-   **CODE**: Write or modify code in a file. (e.g., `CODE:./src/auth.py:replace_urllib_with_requests()`)
-   **INFO**: Provide information or ask a clarifying question to the user. (e.g., `INFO:The file src/auth.py does not exist. Should I create it?`)
-   **MEMORY**: Query the `context_memory` for relevant information. (e.g., `MEMORY:Find examples of using the requests library for POST requests.`)
-   **FINISH**: Terminate the loop when the objective is complete.

### Error Handling and Recovery

-   **`_recover_from_failure`**: When a step fails (e.g., a shell command returns a non-zero exit code), this function is triggered.
    -   It logs the error to the `ContextManager`.
    -   It can implement retry logic for transient errors.
    -   For persistent errors, it can feed the error information back into the `_ask_grok_for_next_step` function, allowing the LLM to adjust its plan.

    *Pseudo-code Recovery Prompt:*
    ```json
    {
      "role": "user",
      "content": "Objective: ...\nHistory: ...\nFailed Action: SHELL:npm install requests\nError: Command not found: npm.\nBased on this failure, what is the single next action I should take?"
    }
    ```

## Commands and Prompts

### Essential Commands

-   **Initialize Project:** `npm init -y; npx tsc --init; mkdir -p src/commands src/utils src/plugins src/agent prisma tests scripts docs`.
-   **Build CLI:** `npm run build` (add to `package.json`: `"build": "tsc"`).
-   **Run Tests:** `npm test` (configure `jest` or `vitest`).
-   **Deploy:** `docker build -t cli-app .; docker run -p 8080:8080 cli-app`.

### Useful Prompts

-   **CLI Task:** `unify bridge import https://example.com --analyze-tone`
-   **Memory Query:** `unify search "past commands" --source=chromadb`
-   **Plugin Install:** `unify plugins install weather-reporter`

## Error Handling & Logging

-   **Structured Logging:** Use `winston` or `pino` to output logs in JSON format for easier parsing and analysis.
-   **Custom Error Classes:** Define custom error types (e.g., `ApiError`, `PluginError`) to handle different failure modes gracefully.
-   **Graceful Shutdown:** Ensure database connections are closed and temporary files are cleaned up on `SIGINT` or `SIGTERM`.

## Autonomous Operation

-   **PM2:** Use `ecosystem.config.js` for robust process management.
-   **Cron:** Schedule recurring tasks.
-   **Self-Healing:** Use a monitoring script to ensure the CLI agent is always running.

## Troubleshooting Common Setup Issues

When initializing a new TypeScript Node.js project, you may encounter a few common issues. Here’s how to resolve them:

### 1. ES Module Import Errors

-   **Error:** `SyntaxError: Cannot use import statement outside a module` or `ECMAScript imports and exports cannot be written in a CommonJS file...`
-   **Cause:** Your `package.json` is treated as a CommonJS module by default, but your TypeScript code is using ES Module syntax (`import`/`export`).
-   **Solution:** In `package.json`, set the project type to module:
    ```json
    "type": "module"
    ```

### 2. Node.js Globals Not Found

-   **Error:** `Cannot find name 'process'` or `Cannot find name '__dirname'`.
-   **Cause:** The TypeScript compiler doesn't automatically know about Node.js-specific global variables.
-   **Solution:** Explicitly include the Node.js types in your `tsconfig.json`. You should have already installed `@types/node`.
    ```json
    "compilerOptions": {
      "types": ["node"]
    }
    ```

### 3. Output Files Not Found After Compile

-   **Error:** `Error: Cannot find module '.../dist/index.js'` after running `tsc`.
-   **Cause:** By default, `tsc` compiles `.ts` files in-place, creating `.js` files alongside them in the `src` directory. Your run script, however, is likely looking for the output in a `dist` folder.
-   **Solution:** Specify the output directory in your `tsconfig.json` by uncommenting or adding the `outDir` property:
    ```json
    "compilerOptions": {
      "outDir": ".//dist"
    }
    ```

## Future Enhancements

-   **Web UI:** Add a web-based dashboard (using React or Vue) to visualize CLI activity, manage plugins, and view logs.
-   **Distributed Operation:** Allow multiple CLI agents to coordinate and share tasks using a message queue like RabbitMQ or Redis.
-   **Auto-Updating:** Implement a command for the CLI to update itself by pulling the latest version from a Git repository.
-   **Shell Integration:** Provide shell completion scripts (for Bash, Zsh, Fish) to make the CLI easier to use.
-   **Metrics and Tracing:** Integrate OpenTelemetry to monitor performance and trace command execution across different modules and APIs.