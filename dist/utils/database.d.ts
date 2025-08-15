export declare class DatabaseManager {
    private static initialized;
    /**
     * Initialize the database connection
     */
    static initialize(): Promise<void>;
    /**
     * Close database connections
     */
    static close(): Promise<void>;
    /**
     * Check if database is initialized
     */
    static isInitialized(): boolean;
}
//# sourceMappingURL=database.d.ts.map