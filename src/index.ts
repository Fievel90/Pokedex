import express, { Request, Response } from 'express';
import config from './Infrastructure/Environments/config';
import { Logger } from '@Infrastructure/Monitoring/Logger';
import { Monitor } from '@Infrastructure/Monitoring/Monitor';

const app = express();
const port = config.server.port;

app.get('/', (_: Request, res: Response) => {
    Monitor.trackEvent('Hello World!');
    res.send('Hello World!');
});

app.listen(port, () => {
    Logger.info(`${config.app.name} is running on http://localhost:${String(port)}`);
});
