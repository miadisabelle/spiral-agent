export declare function read_file_action(filePath: string): Promise<string>;
export declare function shell_command_action(command: string, cwd?: string): Promise<string>;
export interface AgentAction {
    type: 'read_file' | 'shell_command';
    payload: any;
}
export declare function runAgent(plan: AgentAction[]): Promise<void>;
//# sourceMappingURL=core.d.ts.map