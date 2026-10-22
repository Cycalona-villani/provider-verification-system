# Security Policy

## Project Scope

Provider Verification System is a portfolio demonstration
using fictional provider data and simulated verification
and approval workflows.

It is not intended to process real patient information,
provider credentials, identity documents, or other
sensitive records.

## Supported Versions

Security fixes are applied to the latest code on the main
branch. Older versions are not maintained separately.

## Reporting a Vulnerability

Please do not disclose vulnerabilities, exploit details,
credentials, or personal information in public issues
or pull requests.

Use GitHub's private vulnerability reporting feature:

1. Open this repository's Security tab.
2. Select Advisories.
3. Click Report a vulnerability.
4. Describe the issue and its potential impact.
5. Include reproduction steps using fictional data only.

If private reporting is unavailable, open an issue titled
"Request for private security contact" without including
vulnerability details. The maintainer will arrange a
private reporting method.

## What to Include

- The affected component or endpoint.
- A description of the potential security impact.
- Steps to reproduce using fictional data.
- Relevant versions or environment details.
- Suggested mitigations, if known.

Remove secrets and personal information from screenshots
and logs before submitting them.

## Response and Resolution

Reports are reviewed as maintainer availability allows.
There is no guaranteed response or resolution timeline.

The maintainer may request additional information,
investigate the issue, and release a fix where appropriate.

Please coordinate public disclosure with the maintainer
to allow time for investigation and remediation.

## Current Limitations

The demo does not implement production authentication,
reviewer authorization, durable audit storage, or
server-enforced verification and approval rules.

CORS configuration is not authentication or access control.

These limitations must be addressed before adapting
the project for sensitive or production use.