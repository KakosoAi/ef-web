# Security Policy

## Supported Versions

We support security patches for the latest stable release. Issues affecting older versions may be addressed case-by-case.

## Reporting a Vulnerability

Please report security issues privately:

- Email: security@equipmentsfinder.com (replace with your team inbox)
- Alternatively, open a private security advisory in GitHub (Security → Advisories) if enabled

Include:

- Affected component(s) and version(s)
- Steps to reproduce
- Impact assessment (data access, RCE, etc.)
- Suggested remediation, if known

We aim to acknowledge reports within 72 hours and provide an ETA after triage.

## Disclosure Policy

- We prefer coordinated disclosure.
- Do not publicly discuss or disclose the issue until a fix is released.
- Credit will be given to reporters unless anonymity is requested.

## Hardening Checklist (Summary)

- Secrets are stored in environment variables; `.env` files are gitignored.
- Next.js runs with TypeScript strict mode.
- CI runs linting and type checks on every PR.
- Recommend adding security headers in `next.config.js` and enabling branch protection in GitHub.
