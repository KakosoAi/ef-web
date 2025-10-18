# Contributing Guide

## Development Setup

- Node.js 18+
- Install dependencies: `npm ci`
- Start dev: `npm run dev`

## Branching Model

- `main`: production
- `develop`: integration branch
- Feature branches: `feat/<short-name>`
- Fix branches: `fix/<short-name>`

## Commit Messages

- Use clear, imperative messages (e.g., `feat: add equipment filters`)
- Group related changes; avoid noisy, unrelated commits

## Pre-commit Quality

- Husky runs `lint-staged` and `npm run type-check`
- Ensure `npm run lint` and `npm run type-check` pass locally

## Pull Requests

- Base branch: `develop` (unless hotfix)
- Provide context: problem, solution, trade-offs
- Checklist:
  - Lint passes
  - Types pass
  - Builds locally
  - No secrets committed
  - Update docs if user-facing changes

## Environment & Secrets

- Add environment variables in `.env.local` (never commit real keys)
- Configure secrets in the hosting provider or GitHub Encrypted Secrets for CI

## Testing & QA

- Prefer small, focused PRs with clear acceptance criteria
- Include manual test steps or screenshots for UI changes

## Code Style

- Feature-based folder structure; keep components cohesive
- TypeScript strict mode; avoid `any` unless necessary
- Use Tailwind utilities and shared UI components where possible
