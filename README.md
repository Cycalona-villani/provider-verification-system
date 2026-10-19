# Provider Verification System

A React and TypeScript demo of a provider verification workflow for a Trust & Safety team.

The application demonstrates verification checks, manual identity review, approval controls, and decision history using fictional providers and simulated results.

## Features

- Simulated identity and license checks.
- Manual review of identity mismatches, with a required reason.
- Provider approval after eligibility requirements are met.
- Application rejection with a recorded reason.
- Approval blocked when a license is expired.
- Simulated verification service outages and retry support.
- Decision history recording timestamps, actors, actions, and reasons.

## Demo Providers

| Provider | Identity Check | License Check |
| --- | --- | --- |
| Dr. Jordan Smith | Match | Active |
| Dr. Taylor Lee | Mismatch | Active |
| Dr. Morgan Davis | Mismatch | Expired |

## Approval Rules

A provider is eligible for approval only when:

- The license check returns active.
- Identity matches or has been confirmed through manual review.
- The application has not been rejected.
- Verification checks have completed successfully.

Confirming identity does not override an expired license.

## Run Locally

Requires Node.js and npm.

Install dependencies:

    npm install

Start the development server:

    npm run dev

Open the local URL displayed in the terminal.

Build the project:

    npm run build

## Manually Tested Scenarios

- Successful verification followed by approval.
- Identity mismatch resolved through manual review.
- Rejection with a recorded explanation.
- Verification service outage followed by a successful retry.
- Expired license continues to block approval after identity confirmation.

## Demo Limitations

All provider information and verification results are fictional.

Application state and decision history are held in memory and reset when the page is refreshed. The demo does not connect to identity verification services or licensing authorities.

Production use would require backend enforcement of approval rules, authenticated reviewers, access controls, durable audit records, and integrations with authoritative verification sources.

## Technology

- React
- TypeScript
- Vite
- CSS

## Automated Testing and Jenkins CI

The project includes three Cypress end-to-end tests:

- Approval stays blocked until verification checks pass.
- An expired license blocks approval even after identity confirmation.
- A verification service outage blocks approval and allows a successful retry.

### Jenkins pipeline

The pipeline is defined in the version-controlled Jenkinsfile. Each run:

1. Checks Node and npm versions.
2. Installs dependencies using npm ci.
3. Runs ESLint.
4. Builds the application with TypeScript and Vite.
5. Starts a local preview server and runs Cypress in Chrome.
6. Publishes JUnit test results and archives failure screenshots.
7. Archives the application build when all checks pass.

Verified result: **3 tests passed, 0 failed, 0 skipped.**

![Jenkins test results](docs/images/jenkins-test-results.png)

### Run locally

Requires Node.js compatible with the project and Google Chrome.

npm ci
npm run lint
npm run build
npm run test:e2e

The test command starts the preview server, waits for it to respond,
runs Cypress, and stops the server afterward.

### Deployment

The demo is deployed to GitHub Pages through GitHub Actions.
Jenkins currently runs separately on my Mac and is triggered manually.
Deployment is not yet gated by the Jenkins result.

[Try the live demo](https://megalodonfish.github.io/provider-verification-system/)