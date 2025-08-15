export declare class PluginManager {
    private plugins;
    /**
     * Get number of loaded plugins
     */
    getLoadedCount(): Promise<number>;
    /**
     * List all plugins
     */
    list(): Promise<Array<{
        name: string;
        description: string;
    }>>;
    /**
     * Load a plugin (mock implementation)
     */
    loadPlugin(name: string, description: string): Promise<void>;
}
//# sourceMappingURL=PluginManager.d.ts.map