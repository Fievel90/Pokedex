# Architecture

This project follows the **Clean Architecture** principles, also known as **Onion Architecture** or **Hexagonal Architecture**. The goal is to separate concerns, make the application independent of frameworks, databases, and external agencies, and make it testable.

## Directory Structure

The `src` directory is organized into three main layers:

### 1. Domain (`src/Domain`)
This is the core of the application. It contains the enterprise business rules and logic.
- **Responsibilities**: Defines entities, value objects, domain events, and repository interfaces.
- **Dependencies**: It has **no dependencies** on outer layers (Application or Infrastructure). It is pure TypeScript code.

### 2. Application (`src/Application`)
This layer contains the application business rules. It orchestrates the flow of data to and from the domain entities, and directs those entities to use their enterprise wide business rules to achieve the goals of the use case.
- **Responsibilities**: Defines use cases (or interactors), application services, and DTOs (Data Transfer Objects).
- **Dependencies**: It depends ONLY on the **Domain** layer.

### 3. Infrastructure (`src/Infrastructure`)
This layer contains frameworks and drivers. It implements the interfaces defined in the Domain and Application layers.
- **Responsibilities**: Implements repositories (database access), external services (API clients), web frameworks (Express.js), logging, and configuration.
- **Dependencies**: It depends on the **Application** and **Domain** layers. It is the only layer that should depend on external libraries and frameworks (like Express, database drivers, etc.).

## Dependency Rule
The overriding rule that makes this architecture work is the **Dependency Rule**: source code dependencies can only point **inwards**. Nothing in an inner circle can know anything at all about something in an outer circle.

- **Infrastructure** -> depends on -> **Application**
- **Application** -> depends on -> **Domain**
- **Domain** -> depends on -> **Nothing**

## Key Components

- **`src/index.ts`**: The entry point of the application. It bootstraps the infrastructure (e.g., starts the Express server).
- **Shared Kernel**: Common utilities and types that can be used across layers (be careful not to couple layers tightly with this).

## Development Environment

### Running Locally

To run the application locally without Docker:

```bash
npm run dev
```

To run the test suite:

```bash
npm test
```

### Running with Docker

To run the application using Docker (recommended for consistency):

```bash
make run
```

To build and run the production image:

```bash
make run-prod
```

To run the test suite inside docker:

```bash
make test
```
