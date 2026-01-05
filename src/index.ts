import app from './app';
import config from '@Infrastructure/Environments/config';

/**
 * The port number the server will listen on
 */
const port = config.server.port;

/**
 * Starts the server
 */
app.listen(port, () => {
    console.info(`${config.app.name} is running on http://localhost:${String(port)}`);
});
