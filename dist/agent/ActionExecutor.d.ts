export interface ActionResult {
    success: boolean;
    data?: any;
    error?: string;
    output?: string;
}
export interface Action {
    type: 'READ' | 'SHELL' | 'CODE' | 'INFO' | 'MEMORY' | 'FINISH';
    payload: string;
    reasoning?: string;
}
export declare class ActionExecutor {
    private dryRun;
    constructor(dryRun?: boolean);
    /**
     * Execute an action based on its type
     */
    execute(action: Action): Promise<ActionResult>;
    /**
     * READ: Read a file and return its contents
     */
    private executeRead;
    /**
     * SHELL: Execute a shell command
     */
    private executeShell;
    /**
     * CODE: Write or modify code in a file
     */
    private executeCode;
    /**
     * INFO: Provide information or ask for clarification
     */
    private executeInfo;
    /**
     * MEMORY: Search memory for relevant information
     */
    private executeMemory;
    /**
     * FINISH: Mark the objective as complete
     */
    private executeFinish;
    /**
     * Security check for file paths
     */
    private isPathDangerous;
    /**
     * Security check for shell commands
     */
    private isDangerousCommand;
}
//# sourceMappingURL=ActionExecutor.d.ts.map