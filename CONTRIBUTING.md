# Contributing

Thank you for your interest in improving the Provider Verification System.

This is a portfolio demonstration using fictional provider records and simulated verification workflows.

## Before You Start

- Read README.md and CODE_OF_CONDUCT.md.
- Check existing issues and pull requests for related work.
- Open an issue before starting a substantial change.
- Describe the problem and proposed improvement.

Small documentation fixes can be submitted directly.

## Local Setup

Requires Node.js 24 and npm.

Install frontend dependencies from the project root:

```bash
npm ci
```

Install backend dependencies and start the API:

```bash
cd server
npm ci
npm run dev
```

In a separate terminal at the project root, start the frontend:

```bash
npm run dev -- --port 5173 --strictPort
```

Open:

http://localhost:5173/provider-verification-system/

During development, the frontend defaults to the local API on port 3001 unless VITE_API_URL is configured.

If .env.local points to Render, remove that override when testing the local frontend-to-backend connection, then restart Vite.

## Making Changes

1. Create a branch from the latest main.
2. Use a descriptive branch name, such as fix/api-error-message.
3. Keep changes focused on one issue or improvement.
4. Follow the existing React and TypeScript conventions.
5. Update documentation when behavior or setup changes.
6. Add or update tests for meaningful behavior changes.

Use fictional data only. Do not commit personal information, credentials, API keys, or environment files containing secrets.

## Validation

From the project root, run:

```bash
npm run lint
npm run build
npx cypress run --config baseUrl=http://localhost:5173
```

Keep the frontend running while Cypress executes.

Direct API tests also require the backend at the apiUrl configured in cypress/e2e/api-endpoints.cy.js. For repeatable local testing, use http://localhost:3001 and keep the local backend running.

The frontend API tests use controlled responses to check successful requests and network failures. The direct endpoint tests send requests to the actual backend.

For documentation-only changes, check the Markdown preview and relevant links and commands.

## Pull Requests

Submit your pull request against main and include:

- The problem being addressed.
- What changed and why.
- How the change was tested.
- Screenshots for visible interface changes.
- Any limitations or follow-up work.

Use a draft pull request if the work is incomplete. Resolve relevant test failures before requesting review.

The current GitHub Pages workflow builds and deploys the frontend but does not run Cypress. Include your local test results in the pull request.

## Reporting Bugs

Include:

- Steps to reproduce the problem.
- Expected and actual behavior.
- Browser and relevant environment details.
- Error messages or screenshots with sensitive data removed.
- Whether the problem occurs locally or on the live demo.

For API problems, include the request method, endpoint, and response status when available.

Do not post credentials, private provider information, or sensitive security details in public issues.

To request a private reporting channel, open an issue without incident details and ask the maintainer to arrange one.

## Review and Collaboration

Keep discussions respectful and constructive.

Follow CODE_OF_CONDUCT.md and respond to review feedback with clear explanations or focused changes.

Contributions are reviewed as maintainer availability allows.