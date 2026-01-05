---
title: Architecture
children:
    - ./Architecture/C4-Level.md
    - ./Architecture/Event-Storming.md
showGroups: true
---
# Architecture

## Dependencies

The project relies on a minimal set of dependencies to ensure lightweight and efficient execution:

- **Express**: Web server framework for handling HTTP requests.
- **Zod**: Schema validation for runtime type checking.
- **Dotenv**: Environment variable management.

Development dependencies include **Jest** for testing, **TypeDoc** for documentation, and **ESLint/Prettier** for code quality.

## Testing Framework

The project uses **Jest** as the primary testing framework.
- **Integration/E2E Tests**: Located in the `tests/` directory (e.g., `e2e.spec.ts`).
- **Unit Tests**: Co-located with source files (e.g., `src/Domain/ValueObjects/Pokemon.spec.ts`).

## Tracing Technique

Tracing is implemented via a custom `TracingMiddleware`.
- **Location**: `src/Infrastructure/Http/Middlewares/TracingMiddleware.ts`
- **Mechanism**: uses `AsyncLocalStorage` to store and propagate a correlation ID for each request.
- **Integration**: The correlation ID is passed to the Logger to ensure all logs for a specific request can be traced back to a single event chain.

## Folder Structure

The project follows **Clean Architecture** principles to separate concerns into distinct layers:

- **`src/Domain/`**: Contains the core business logic, entities, and repository interfaces (Ports). usage of this layer is independent of any external agency.
- **`src/Application/`**: Contains the application logic and use cases (Queries and Commands). It orchestrates the flow of data between the Domain and Infrastructure layers.
- **`src/Infrastructure/`**: Contains the implementation of the interfaces defined in the Domain layer (Adapters). This includes database repositories, external API clients, and the HTTP server setup.
