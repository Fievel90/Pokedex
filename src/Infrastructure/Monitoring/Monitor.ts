import { MonitorInterface } from "@Application/Shared/Monitoring/MonitorInterface";

export const Monitor: MonitorInterface = {
    trackEvent: (event: unknown) => {
        console.log('Event tracked:', event);
    },
};
