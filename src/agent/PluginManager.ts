interface Plugin {
  name: string;
  description: string;
  version: string;
  enabled: boolean;
}

export class PluginManager {
  private plugins: Plugin[] = [];

  /**
   * Get number of loaded plugins
   */
  async getLoadedCount(): Promise<number> {
    return this.plugins.filter(p => p.enabled).length;
  }

  /**
   * List all plugins
   */
  async list(): Promise<Array<{ name: string; description: string }>> {
    return this.plugins.map(p => ({
      name: p.name,
      description: p.description,
    }));
  }

  /**
   * Load a plugin (mock implementation)
   */
  async loadPlugin(name: string, description: string): Promise<void> {
    this.plugins.push({
      name,
      description,
      version: '1.0.0',
      enabled: true,
    });
  }
}
