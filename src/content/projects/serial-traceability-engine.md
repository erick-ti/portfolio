---
title: 'Serial Traceability Engine'
tagline: 'A recursive traceability layer over an ERP database — plus a stored-procedure rewrite that cut a key query from 11 seconds to under 500ms.'
category: 'Data & Operations'
status: 'Shipped'
visibility: 'private-production'
featured: true
order: 6
timeframe: '2024'
role: 'Sole engineer'
stack:
  - SQL Server
  - T-SQL
  - Recursive CTEs
  - Syspro ERP
metrics:
  - value: '11s → 0.5s'
    label: 'query latency'
  - value: '~22×'
    label: 'faster'
  - value: '1.8M+'
    label: 'records reconciled'
links: {}
---

## Context

In manufacturing, traceability is non-negotiable: given a finished
serial number, you must be able to walk back through every job, lot, and
component that produced it. That history is spread across many ERP
tables and isn't queryable in any direct way out of the box.

## What I built

A traceability layer over the Syspro ERP database that reconstructs the
full genealogy of a serial number — and, alongside it, a focused
performance rewrite of a critical reporting stored procedure.

## Architecture

Genealogy is reconstructed with recursive common table expressions that
walk the parent/child relationships across Syspro's job and lot tables
(reserved serials, job postings, lot transactions) to assemble a
complete trace. A separate set of cross-server sync routines reconciles
1.8M+ records between production and development environments so the
work could be validated safely against realistic data.

## Technical highlights

- **Recursive genealogy.** A recursive CTE turns a scattered web of
  ERP rows into a clean, walkable trace from finished serial back to
  raw inputs.
- **11s → sub-500ms.** Rewriting a key stored procedure — reworking
  the query plan and access paths — cut its runtime roughly 22×,
  turning a sluggish report into an instant one.
- **Validated at scale.** Sync routines moving 1.8M+ records meant
  changes were tested against production-scale data, not toy samples.

## Tradeoffs

Recursive CTEs are expressive but can be performance traps on deep
hierarchies — they demand careful query design and the right indexes.
The payoff is logic that reads clearly and matches how traceability
actually works.

## Outcome

The traceability layer answers genealogy questions that were previously
painful to assemble, and the optimized procedure made a daily-use report
fast enough to stop being a complaint.
