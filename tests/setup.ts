/**
 * Test setup and utilities for Spiral CLI
 */

import { beforeAll, afterAll } from 'vitest';
import { rm } from 'fs/promises';
import path from 'path';

// Test database path
const TEST_DB_PATH = path.join(process.cwd(), 'test.db');

beforeAll(async () => {
  // Setup test environment
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = `file:${TEST_DB_PATH}`;
  
  console.log('🧪 Setting up test environment...');
});

afterAll(async () => {
  // Cleanup test database
  try {
    await rm(TEST_DB_PATH, { force: true });
    console.log('🧹 Test cleanup completed');
  } catch (error) {
    console.warn('Test cleanup warning:', error);
  }
});

/**
 * Create a test agent configuration
 */
export function createTestAgentConfig() {
  return {
    verbose: false,
    dryRun: true,
    model: 'mock',
    maxSteps: 5,
    temperature: 0.0
  };
}

/**
 * Mock LLM responses for testing
 */
export const mockResponses = {
  simple: '{"type": "INFO", "payload": "Mock response", "reasoning": "Test reasoning"}',
  finish: '{"type": "FINISH", "payload": "Task completed", "reasoning": "Test finished"}',
  read: '{"type": "READ", "payload": "package.json", "reasoning": "Reading file"}'
};
