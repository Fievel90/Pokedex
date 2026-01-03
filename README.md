# Pokedex

A RESTful API application designed to provide Pokemon information, including standard descriptions and fun translated versions. Built with **TypeScript**, **Node.js**, and **Express**, this project strictly adheres to **Clean Architecture** principles to promote testability, maintainability, and separation of concerns.

## Environments

### Development

To run the project in development mode using Docker (which will also install dependencies):

```bash
cp .env.example .env
make run
```

### Production

To build and run the production configuration:

```bash
cp .env.example .env
make run-prod
```

## Testing

The project uses the following testing structure:

- **Unit Tests**: Should be implemented in the same folder as the original file (e.g., `src/moduleA/component.ts` should have `src/moduleA/component.spec.ts`).
- **E2E Tests**: Should be located under the `tests` folder.

Tests can be run using:

```bash
make test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
