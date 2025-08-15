interface ExecutionStep {
  step: number;
  action: any;
  result: any;
  timestamp: Date;
}

interface ExecutionContext {
  sessionId: string;
  objective: string;
  startTime: Date;
  history: ExecutionStep[];
  currentStep: number;
}

export class ContextManager {
  private context: ExecutionContext | null = null;

  /**
   * Initialize a new execution context
   */
  initialize(sessionId: string, objective: string): void {
    this.context = {
      sessionId,
      objective,
      startTime: new Date(),
      history: [],
      currentStep: 0,
    };
  }

  /**
   * Add a step to the execution history
   */
  addStep(step: ExecutionStep): void {
    if (!this.context) {
      throw new Error('Context not initialized');
    }

    this.context.history.push(step);
    this.context.currentStep = step.step;
  }

  /**
   * Get the current context
   */
  getCurrentContext(): ExecutionContext {
    if (!this.context) {
      throw new Error('Context not initialized');
    }

    return { ...this.context };
  }

  /**
   * Get execution summary
   */
  getSummary(): {
    sessionId: string;
    objective: string;
    duration: number;
    steps: number;
    success: number;
    failures: number;
  } {
    if (!this.context) {
      throw new Error('Context not initialized');
    }

    const duration = Date.now() - this.context.startTime.getTime();
    const success = this.context.history.filter(step => step.result.success).length;
    const failures = this.context.history.length - success;

    return {
      sessionId: this.context.sessionId,
      objective: this.context.objective,
      duration,
      steps: this.context.history.length,
      success,
      failures,
    };
  }

  /**
   * Clear the context
   */
  clear(): void {
    this.context = null;
  }
}
