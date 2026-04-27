# Playwright Test Automation Framework (TypeScript)

## Overview

This project is a **modern end-to-end test automation framework** built with Playwright and TypeScript, designed to cover:

- UI Testing
- API Testing
- Authentication via storage state
- Scalable Page Object Model (POM)
- Component-based UI abstraction
- CI-ready structure

The goal of this project is to simulate a **real-world QA Automation framework**, focusing on maintainability, scalability, and best practices used in modern engineering teams.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions (CI ready)
- Page Object Model (POM)
- Fixtures & Dependency Injection

## Authentication Strategy

This framework uses Playwright’s storageState mechanism to persist authenticated sessions and optimize test execution.

A dedicated setup test (`auth.setup.ts`) performs the authentication flow once and generates a session file:

tests/.auth/user.json

However, the target application (https://bstackdemo.com) does not persist authentication via cookies. Instead, it relies on sessionStorage to maintain the logged-in state.

To handle this limitation, the framework extends the default Playwright approach by manually injecting sessionStorage data into the generated storageState file. This ensures that authenticated state is correctly restored across test runs.

As a result:
- Tests reuse a pre-authenticated session
- Repetitive UI login steps are avoided
- Execution time is reduced
- Test stability is improved

This hybrid approach (storageState + sessionStorage injection) provides a reliable authentication strategy even for applications that do not rely on cookies.

## How to Run

Install dependencies:

npm install
npx playwright install

Run all tests:

npm run test

## Documentation
- Architecture → docs/folder-structure.md
- Roadmap → docs/ROADMAP.md

## Roadmap

The docs/ROADMAP.md file outlines a phased plan to evolve this framework from a solid foundation to a senior‑level enterprise solution. Upcoming enhancements include:

Contract testing for microservices – verify that APIs meet agreed contracts and catch breaking changes before deployment.
Advanced integration tests – validate workflows across services with mocks, stubs and real data.
Flakiness detection and analytics – track failure patterns and flag flaky tests to improve trust.
Observability integration – capture logs, metrics and traces from services under test.
Performance, resilience & security checks – add load tests (e.g. with k6), chaos experiments and basic security validations.
Cross‑device UI tests – run critical journeys on real mobile devices via cloud providers when necessary.

