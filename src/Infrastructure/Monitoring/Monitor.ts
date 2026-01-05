import { MonitorInterface } from "@Application/Shared/Monitoring/MonitorInterface";

/**
 * Implementation of the MonitorInterface
 */
export class Monitor implements MonitorInterface {
    /**
     * Tracks a monitoring event
     * @param event The event data to track
     */
    trackEvent(event: unknown) {
        console.log('Event tracked:', event);
    }
}
