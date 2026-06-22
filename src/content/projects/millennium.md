---
title: 'Millennium'
tagline: 'A full-stack collection tracker for trading-card players: catalog, pricing, and deck data in one typed, containerized app.'
category: 'Product / Full-Stack'
status: 'Shipped'
visibility: 'public'
featured: true
order: 2
timeframe: '2024 to Present'
role: 'Sole engineer, personal product'
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
  - Caddy
  - Hetzner VPS
  - Cloudflare R2
  - systemd timers
metrics:
  - value: '10'
    label: 'Django apps'
  - value: '14'
    label: 'typed React screens'
  - value: '821'
    label: 'automated tests'
  - value: '43,313'
    label: 'card printings'
  - value: 'Per-lot'
    label: 'cost-basis valuation'
links:
  live: 'https://millennium.erickti.com'
  repo: 'https://github.com/erick-ti/millennium'
coverImage: '/projects/millennium/cover.png'
coverAlt: 'The Millennium "Vault" landing page: a trading-card collection appraised like a financial portfolio, anchored by a live foil appraisal card.'
ogImage: '/projects/millennium/cover.png'
---

## Context

Trading-card players track a sprawling catalog, volatile prices, and their own
collection across spreadsheets and half a dozen sites. None of it reconciles, and
a misread row quietly corrupts what a collection is worth. Millennium is the tool
I wanted: one app that holds all of it and treats card data as a first-class,
well-modeled domain. It is also my flagship, a system I own end to end and build
to the standard I hold at work.

## What I built

A full-stack web application for cataloging cards, tracking a personal
collection, and valuing it like a portfolio: a typed Django REST API across 10
Django apps, a relational data model, and a Next.js frontend of 14 typed React
screens. Import a CSV and it reconciles every row against a 43,000+ printing catalog,
then reports per-lot cost basis, market value, and unrealized gain or loss. A live
ops dashboard shows what the system is doing.

## Architecture

The backend is Django 5.2 with Django REST Framework over PostgreSQL, with Celery
running the background jobs: catalog sync and price snapshots. The frontend is
Next.js with React and TypeScript, TanStack Query for server-state caching, and
Tailwind for the interface. It runs containerized on a single Hetzner VPS behind
Caddy, which terminates TLS. Deploys are pull-based: the box pulls the new build
rather than a CI runner pushing into it, so nothing outside needs credentials to
the server. A nightly systemd timer drives the ETL refresh, and PostgreSQL
backups ship off-box to Cloudflare R2, so a dead disk is an inconvenience, not a
loss.

## Technical highlights

- **Per-lot cost basis, append-only valuation.** Every acquisition keeps its own
  cost, so gain or loss is computed per lot rather than smeared across an average.
  Daily portfolio snapshots are append-only, and a database CHECK constraint stops
  a gain from ever displaying without complete price coverage. Partial data can't
  masquerade as complete.
- **Confidence-scored reconciliation.** Imported rows match against the 43,000+
  card catalog (TCGCSV / YGOPRODeck) and get scored, not guessed, into EXACT
  versus review tiers. A weak match lands in review instead of silently becoming a
  holding, because a fuzzy match that turns into money is worse than no match at
  all.
- **821 automated tests.** Valuation math breaks in ways nobody notices until the
  number is wrong. The pytest, Vitest, and Playwright suite is the safety net that
  lets me refactor the money path without holding my breath.
- **Off-box backups, pull-based deploys.** Backups go to R2 on a schedule and the
  server pulls its own deploys, so the production box is the only thing that can
  write to itself, and it can always be restored from somewhere a compromise can't
  reach.

## Tradeoffs

Self-hosting on a VPS, fully containerized and fully typed, with 821 tests, is
heavier than a personal project strictly needs. That is the point. Millennium is
built to survive production, because demonstrating that I can run something in
production is half of what it is for. The cost is real maintenance: I own the box,
the backups, and the deploys.

## Outcome

Shipped and live at millennium.erickti.com, actively maintained. Per-lot
valuation with append-only snapshots, confidence-scored reconciliation against a
43,000+ printing catalog, nightly ETL, off-box backups, and a live ops dashboard
surfacing uptime, heartbeat, and deployed SHA, all running on infrastructure I
provision and operate myself. It is the clearest end-to-end demonstration of how I
build and run a system from an empty repo.
