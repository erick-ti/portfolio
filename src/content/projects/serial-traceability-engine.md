---
title: 'Serial Traceability Engine'
org: 'CelLink'
tagline: 'A recursive traceability layer over an ERP database, plus a stored-procedure rewrite that cut a key query from 11 seconds to under 500ms.'
category: 'Data & Operations'
status: 'Shipped'
visibility: 'private-production'
featured: false
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
  - value: '22×'
    label: 'faster'
  - value: '1.8M+'
    label: 'records reconciled'
links: {}
---

## Context

Traceability is not optional. Given a finished serial number,
you have to walk back through every job, lot, and component that built it.
Recalls, audits, and compliance all depend on that walk being fast and
complete. The history exists in the ERP, but it is scattered across many tables
and nothing queries it directly out of the box. So the answer to "what went into
this unit" was a manual archaeology dig, and the report that should have served
it took 11 seconds to run.

## What I built

I built a recursive traceability layer over the Syspro ERP database that
reconstructs the full genealogy of any serial number, from finished unit back to
raw inputs. Alongside it, I rewrote a critical reporting stored procedure that
had become the slow path everyone complained about.

## Architecture

Genealogy is assembled with recursive common table expressions that walk the
parent/child links across Syspro's job and lot tables: reserved serials, job
postings, lot transactions. One query turns a scattered web of rows into a clean,
walkable trace. To validate the work against real shapes of data instead of toy
samples, a set of cross-server sync routines reconciles 1.8M+ records between
production and a development environment, so I could test changes safely against
production-scale data.

## Technical highlights

- **Recursive genealogy.** A recursive CTE replaces the manual dig: one walk from
  finished serial back to raw inputs, matching how traceability actually works
  rather than how the tables happen to be laid out.
- **11s to sub-500ms.** I killed the cursors, rewrote the logic set-based with
  CTEs and CROSS APPLY, and added composite indexes to match the access paths.
  That cut p95 execution time from 11 seconds to under 500ms, roughly 22x.
- **Validated at scale.** The 1.8M+ record sync meant every change was exercised
  against production-scale data before it went near a real report.

## Tradeoffs

Recursive CTEs read clearly but turn into performance traps on deep hierarchies
if you let them. They need deliberate query design and the right indexes, not just
correct logic. I took on that maintenance cost because the alternative,
hand-rolled iteration, would have been slower to run and harder to read. Set-based
code that survives production beats clever code that only works on a demo row.

## Outcome

The traceability layer answers genealogy questions that used to take manual
assembly, and the rewritten procedure dropped a daily-use report from 11 seconds
to under half a second. The report stopped being a complaint.
