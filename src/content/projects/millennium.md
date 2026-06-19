---
title: 'Millennium'
tagline: 'A full-stack collection tracker for trading-card players — catalog, pricing, and deck data in one typed, containerized app.'
category: 'Product / Full-Stack'
status: 'Shipped'
visibility: 'public'
featured: true
order: 2
timeframe: '2024 — Present'
role: 'Sole engineer — personal product'
stack:
  - Django
  - Django REST Framework
  - PostgreSQL
  - Celery
  - Next.js
  - React
  - TypeScript
  - TanStack Query
  - Tailwind
  - Docker
metrics:
  - value: '10'
    label: 'Django apps'
  - value: '14'
    label: 'typed React screens'
  - value: 'Per-lot'
    label: 'cost-basis valuation'
links:
  live: 'https://millennium.erickti.com'
  repo: 'https://github.com/erick-ti/millennium'
coverImage: '/projects/millennium/cover.jpg'
coverAlt: 'The Millennium "Vault" landing page — a trading-card collection appraised like a financial portfolio, anchored by a live foil appraisal card.'
ogImage: '/projects/millennium/cover.jpg'
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

The backend is Django with Django REST Framework over PostgreSQL, with
Celery running the background jobs (catalog sync, price snapshots). The
frontend is Next.js with React and TypeScript, using TanStack Query for
server-state caching and Tailwind with shadcn/ui for the interface. The
whole stack runs under Docker Compose, so a fresh environment is one
command.

## Technical highlights

- **Per-lot cost basis, append-only valuation.** Every acquisition
  keeps its own cost, daily portfolio snapshots are append-only, and a
  database CHECK constraint stops a gain from ever displaying without
  complete price coverage — partial data can't masquerade as complete.
- **Confidence-scored catalog matching.** Imported cards reconcile
  against the catalog (TCGCSV / YGOPRODeck) into EXACT vs. review tiers,
  so a fuzzy match never silently becomes a holding.
- **Reproducible by default.** Django migrations version every schema
  change, and Docker Compose runs the whole stack identically on any
  machine — which matters for a piece a recruiter might actually clone.

## Tradeoffs

Going full containerized and fully typed is heavier than a quick
prototype would need — but Millennium is deliberately built to
production standards, because demonstrating that standard is half its
purpose.

## Outcome

Shipped and live at millennium.erickti.com — a production-standard build
(typed Django/DRF API, Celery jobs, per-lot valuation with append-only
snapshots, confidence-scored catalog matching), actively maintained. It's the
clearest end-to-end demonstration of how I build a system from an empty repo.
