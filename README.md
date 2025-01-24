# NestJS Project with Clean Architecture

This project is a NestJS application following **Clean Architecture** principles. The goal is to ensure clear separation of concerns, maintaining a modular, testable, and scalable codebase.

## Project Structure

### **1. src/**

The `src` directory contains the entire application code.

---

### **2. core/**

The `core` directory contains the application's core business logic. These components are independent of external frameworks or infrastructure.

- **domain/**
  - **entities/** : Defines domain entities (business objects). These classes represent key domain concepts.
    - Example: `UserEntity.ts` defining a user.
  - **repositories/** : Interfaces for repositories, serving as abstractions for data access.
    - Example: `UserRepository.ts`.
  - **use-cases/** : Contains the primary business logic, organized around use cases.
    - Example: `CreateUserUseCase.ts`.

---

### **3. infrastructure/**

The `infrastructure` directory contains framework- and technology-specific implementations.

- **database/**
  - **repositories/** : Concrete implementations of the repository interfaces defined in `core/domain/repositories`. These handle database interactions (e.g., MongoDB, PostgreSQL).
    - Example: `MongoUserRepository.ts`.

- **config/** : Application configuration files (environment variables, database setup, etc.).

- **controllers/** :
  - Contains the HTTP request entry points (routes). Each entity may have its own subdirectory.
  - Example:
    - `user/`
      - `user.module.ts` : NestJS module for the User entity, grouping the controller, services, and dependencies.
      - `user.controller.ts` : Manages HTTP requests and invokes use cases.
      - `user.service.ts` : Application-level service orchestrating use case calls.

- **exceptions/** : Centralized error handling and exception management.

- **interceptors/** : Contains NestJS interceptors for adding business logic or transformations before/after request processing.

---

### **4. application/**

The `application` directory bridges the core business logic with the external world, handling data transformation and orchestration.

- **dtos/** : Data Transfer Objects (DTOs) define the structure of data exchanged between the client and server.
  - Example: `CreateUserDto.ts`.

- **mappers/** : Contains classes or functions to map objects between layers.
  - Example: Mapping a `UserEntity` to a `UserDto`.

- **services/** : Application services that orchestrate business logic for specific use cases, often invoked by controllers.

---

### **5. shared/**

The `shared` directory holds code shared across multiple layers of the application, such as types, constants, and utility functions.

- Example: `constants.ts`, `validators.ts`.

---

### **6. main.ts**

The main entry point of the application. This file initializes and configures the NestJS app.

---

## Installation and Usage

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
