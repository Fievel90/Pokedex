import app from './app';
import config from '@Infrastructure/Environments/config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pokedex API',
            version: '1.0.0',
        },
    },
    apis: [
        './src/app.ts',
        './src/Domain/ValueObjects/Pokemon.ts',
    ],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

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
