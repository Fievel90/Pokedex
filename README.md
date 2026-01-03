# Pokedex

## Development

To run the project in development mode using Docker (which will also install dependencies):

```bash
make run
```

## Production

To build and run the production configuration:

```bash
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
