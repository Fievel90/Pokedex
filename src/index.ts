import app from './app';
import config from '@Infrastructure/Environments/config';

const port = config.server.port;

app.listen(port, () => {
    console.info(`${config.app.name} is running on http://localhost:${String(port)}`);
});
