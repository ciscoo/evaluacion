# Evaluación

[![Dependency Status](https://david-dm.org/ciscoo/evaluacion/status.svg?style=flat)](https://david-dm.org/ciscoo/evaluacion)
[![Coverage Status](https://coveralls.io/repos/github/ciscoo/evaluacion/badge.svg?branch=master)](https://coveralls.io/github/ciscoo/evaluacion?branch=master)
[![Build Status](https://travis-ci.org/ciscoo/evaluacion.svg?branch=master)](https://travis-ci.org/ciscoo/evaluacion)

An [Express](https://expressjs.com/) app that exposes a RESTful API for a single resource. Part of Solstice's backend coding challenge for new hires.

### Features
- [Express.js](https://expressjs.com/) as the web framework.
- [Helmet](https://github.com/helmetjs/helmet) to protect from some well-known web vulnerabilities
- ES2017 syntax.
- Linting with [ESLint](http://eslint.org/).
- Conforms to [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).
- Testing with [Jest](https://facebook.github.io/jest/).
- Continuous Integration (CI) with [Travis CI](https://travis-ci.org/). (see below).
- Code coverage with [Coveralls](https://coveralls.io/github/ciscoo/evaluacion).
- Model–view–controller (MVC) architectural pattern.

### Core Libraries/Modules

* [Express.js](https://expressjs.com/)
* [mongoose](http://mongoosejs.com/)
* [body-parser](https://github.com/expressjs/body-parser)
* [Helmet](https://github.com/helmetjs/helmet)
* [Jest](https://facebook.github.io/jest/)
* [ESLint](https://github.com/eslint/eslint)
* [nodemon](https://github.com/remy/nodemon)

**Note**: Logging was intentionally left out as there are a [few](https://github.com/expressjs/morgan) [ways](https://github.com/trentm/node-bunyan) [to](https://github.com/winstonjs/winston) approach it depending on your needs. For the purposes of this project, logging was not needed.

## Available routes

**Note**: All endpoints are relative to `/api`, unless otherwise noted.

| HTTP Method	| URL             | Description                 |
|:-----------:|:----------------|:----------------------------|
| `GET`      	| `/contacts`     | Returns a list of contacts. |
| `GET`      	| `/contacts/:id` | Returns a contact.          |
| `DELETE`   	| `/contacts/:id` | Deletes a contact.          |
| `PATCH`    	| `/contacts/:id` | Updates a contact.          |
| `POST`      | `/contacts`     | Creates a contact.          |

## Prerequisites

- [MongoDB](https://www.mongodb.com/download-center)
- [Node.js 7.6+](https://nodejs.org/)

**Note**: This project makes use of [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) which have been availble in Node behind its `--harmony` flag. As of v7.6, async functions were enabled by default therefore the bare minimum for this project s v7.6. Async functions were also part of the recently released ES2017.

## Getting started

```bash
# Clone the project
git clone https://github.com/ciscoo/evaluacion.git
cd evaluacion

# Install dependencies
npm install

# or if you're using Yarn
yarn
```

This project makes use of [dotenv](https://www.npmjs.com/package/dotenv) module for injecting environment variables while developing. Be sure to create a copy of the provided `.env.example` and name it `.env`.

```bash
# Run app in dev mode
npm run dev
```

## Tests

Simply execute the test script which run all the tests and generate code coverage.

**Note**: Ensure you have MongoDB running. Ideally MongoDB and mongoose should be mocked, but they're not.

```bash
# Run tests and generate coverage
npm run test
```
