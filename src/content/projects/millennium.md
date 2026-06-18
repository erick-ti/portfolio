---
title: 'Millennium'
tagline: 'A full-stack collection tracker for trading-card players — catalog, pricing, and deck data in one typed, containerized app.'
category: 'Product / Full-Stack'
status: 'In Progress'
visibility: 'public'
featured: true
order: 2
timeframe: '2024 — Present'
role: 'Sole engineer — personal product'
stack:
  - FastAPI
  - PostgreSQL
  - SQLAlchemy 2.0
  - Alembic
  - React
  - TypeScript
  - TanStack Query
  - Tailwind
  - Docker
metrics:
  - value: 'End-to-end'
    label: 'type safety'
  - value: 'Dockerized'
    label: 'one-command setup'
  - value: 'Portfolio'
    label: 'flagship build'
links:
  repo: 'https://github.com/erick-ti'
---

## Context

Trading-card players juggle a sprawling catalog, volatile prices, and
their own collection and decklists across spreadsheets and half a dozen
sites. Millennium is the tool I wanted: one app that holds all of it and
treats card data as a first-class, well-modeled domain.

## What I built

A full-stack web application — typed Python API, relational data model,
React frontend — for cataloging cards, tracking a personal collection,
and organizing decks. It doubles as a portfolio flagship: a project I
control end to end, built with the same stack I'd use professionally.

## Architecture

The backend is FastAPI with SQLAlchemy 2.0's typed ORM over PostgreSQL,
with Alembic managing schema migrations. The frontend is React +
TypeScript on Vite, using TanStack Query for server-state caching and
Tailwind with shadcn/ui for the interface. The whole stack runs under
Docker Compose, so a fresh environment is one command.

## Technical highlights

- **One contract, both ends.** Pydantic schemas define the API
  contract and flow into TypeScript types, so the frontend and backend
  can't silently drift apart.
- **Migrations from day one.** Alembic was wired in before the schema
  got interesting — card data evolves, and the history is tracked.
- **Reproducible by default.** Docker Compose means the project runs
  identically on any machine, which matters for a portfolio piece a
  recruiter might actually clone.

## Tradeoffs

Going full containerized and fully typed is heavier than a quick
prototype would need — but Millennium is deliberately built to
production standards, because demonstrating that standard is half its
purpose.

## Outcome

In active development. The data model and API are taking shape, and the
project is the clearest end-to-end demonstration of how I build a
product from an empty repo.
