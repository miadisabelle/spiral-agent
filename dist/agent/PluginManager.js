export class PluginManager {
    plugins = [];
    /**
     * Get number of loaded plugins
     */
    async getLoadedCount() {
        return this.plugins.filter(p => p.enabled).length;
    }
    /**
     * List all plugins
     */
    async list() {
        return this.plugins.map(p => ({
            name: p.name,
            description: p.description,
        }));
    }
    /**
     * Load a plugin (mock implementation)
     */
    async loadPlugin(name, description) {
        this.plugins.push({
            name,
            description,
            version: '1.0.0',
            enabled: true,
        });
    }
}
//# sourceMappingURL=PluginManager.js.map