/**
 * Interface for monitoring operations
 */
export interface MonitorInterface {
    /**
     * Tracks a monitoring event
     * @param event The event data to track
     */
    trackEvent(event: unknown): void;
}
