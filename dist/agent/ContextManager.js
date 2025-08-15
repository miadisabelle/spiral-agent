export class ContextManager {
    context = null;
    /**
     * Initialize a new execution context
     */
    initialize(sessionId, objective) {
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
    addStep(step) {
        if (!this.context) {
            throw new Error('Context not initialized');
        }
        this.context.history.push(step);
        this.context.currentStep = step.step;
    }
    /**
     * Get the current context
     */
    getCurrentContext() {
        if (!this.context) {
            throw new Error('Context not initialized');
        }
        return { ...this.context };
    }
    /**
     * Get execution summary
     */
    getSummary() {
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
    clear() {
        this.context = null;
    }
}
//# sourceMappingURL=ContextManager.js.map