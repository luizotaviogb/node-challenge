# Products API

![Node.js](https://img.shields.io/badge/Node.js-v16+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-v5+-yellow)

A small REST API using Node.js (Express) and MongoDB.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Running the Project](#running-the-project)
- [Default User](#default-user)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)

---

## Prerequisites

To run this project, you need the following tools installed on your system:

- **MongoDB**: Version 5.0 or higher (a running MongoDB instance is required).
- **Node.js**: Version 16 or higher.
- **npm**: Comes bundled with Node.js (ensure it's updated to the latest version).

---

## Installation

Follow these steps after cloning the project:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/luizotaviogb/node-challenge.git
   cd node-challenge
   ```

2. **Create a .env file**:
   ```
       cp .env.example .env
   ```

## Running the Project

1. **For the first time**

```bash
    npm run init
```

It's gonna install all the dependencies, create the database seeds and run the project

2. **After first time**

```bash
    npm run start
```

## Default User

A default user is created during the initial setup for testing purposes:

```bash
login: admin
password: admin
```

You can use these credentials to log in and test the authentication endpoints.

## API Documentation

The project includes Swagger documentation for the API. Once the server is running, access it at:

```bash
http://localhost:3000/api-docs
```

This provides an interactive interface to explore and test all available endpoints.

## Scripts

The package.json includes the following scripts:

| Script                 | Description                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `node seed.js`         | Seeds the database with fake products and an admin user. Run `node seed.js [quantity]` to specify the number of products (default is 20). Requires Node.js and a running MongoDB instance. |
| `npm run init`         | Installs dependencies, seeds the database, and starts the server. Use this for the first run. |
| `npm run start`        | Starts the server using `node server.js`.                                                     |
| `npm run test`         | Runs the test suite using Jest.                                                               |
| `npm run lint`         | Runs ESLint to check for code style and potential errors in all files.                        |
| `npm run lint:fix`     | Runs ESLint and automatically fixes fixable issues.                                           |
| `npm run format`       | Formats all files using Prettier according to the defined configuration.                      |
| `npm run format:check` | Checks if all files are formatted correctly with Prettier (no changes).                       |

Example usage:

```bash
npm run lint       # Check linting
npm run format     # Format code
npm run test       # Run tests
```
