import { MonitorInterface } from "@Application/Shared/Monitoring/MonitorInterface";

export class Monitor implements MonitorInterface {
    trackEvent(event: unknown) {
        console.log('Event tracked:', event);
    }
}
