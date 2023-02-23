# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) the npm package manager
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/ElenaBezro/nodejs2022Q4-service
```

## Installing NPM modules

switch to docker branch

```
npm install
```

## Running application

Rename file ".env.example" to ".env"

```
npm run docker:compose
```

App runs on port 4000 by default. You can change port in the ".env" file.
You can open OpenAPI documentation by inserting the contents of "doc/api.yaml" in the editor https://editor.swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Scan for security vulnerabilities

```
npm run docker:scan
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
