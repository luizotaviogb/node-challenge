# Products API

![Node.js](https://img.shields.io/badge/Node.js-v16+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-v5+-yellow)

A lightweight REST API built with Node.js (Express) and MongoDB.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Without Docker](#without-docker)
  - [With Docker](#with-docker)
- [Default User](#default-user)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)

---

## Prerequisites

Ensure you have the following installed before running the project:

- **MongoDB**: Version 5.0 or higher (a running instance is required).
- **Node.js**: Version 16 or higher.
- **npm**: Bundled with Node.js (ensure it's updated to the latest version).
- **Docker** (optional): Required if running the project with Docker.

---

## Installation

Follow these steps after cloning the repository:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/luizotaviogb/node-challenge.git
   cd node-challenge
   ```

2. **Create an environment configuration file**:

   ```bash
   cp .env.example .env
   ```

---

## Running the Project

### Without Docker

#### First-time setup:

```bash
npm run init
```

This installs dependencies, seeds the database, and starts the project.

#### Subsequent runs:

```bash
npm run start
```

### With Docker

#### Build and start the containers:

```bash
docker-compose up --build
```

#### Stop the containers:

```bash
docker-compose down
```

---

## Default User

A default admin user is created during the initial setup for testing:

```bash
Login: admin
Password: admin
```

Use these credentials to log in and test authentication endpoints.

---

## API Documentation

Swagger documentation is available after starting the server:

```bash
http://localhost:3000/api-docs
```

This provides an interactive interface for exploring and testing API endpoints.

---

## Scripts

The `package.json` includes several scripts for managing the project:

| Script                 | Description                                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node seed.js`         | Seeds the database with fake products and an admin user. Run `node seed.js [quantity]` to specify the number of products (default is 20). Requires Node.js and a running MongoDB instance. |
| `npm run init`         | Installs dependencies, seeds the database, and starts the server. Use this for the first run.                                                                                              |
| `npm run start`        | Starts the server using `node server.js`.                                                                                                                                                  |
| `npm run test`         | Runs the test suite using Jest.                                                                                                                                                            |
| `npm run lint`         | Runs ESLint to check for code style and potential errors.                                                                                                                                  |
| `npm run lint:fix`     | Runs ESLint and automatically fixes fixable issues.                                                                                                                                        |
| `npm run format`       | Formats all files using Prettier according to the defined configuration.                                                                                                                   |
| `npm run format:check` | Checks if all files are formatted correctly with Prettier (without making changes).                                                                                                        |

### Example usage:

```bash
npm run lint       # Check linting
npm run format     # Format code
npm run test       # Run tests
```

---

Enjoy coding! 🚀
