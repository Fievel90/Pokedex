import app from './app';
import config from '@Infrastructure/Environments/config';
import { Logger } from '@Infrastructure/Monitoring/Logger';

const port = config.server.port;

app.listen(port, () => {
    new Logger(config.logger.level).info(`${config.app.name} is running on http://localhost:${String(port)}`);
});
