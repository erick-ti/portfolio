---
title: 'CelLink Internal Tooling Platform'
tagline: 'Fifteen-plus production internal tools — validation, reporting, and ETL — owned end to end across two manufacturing sites.'
category: 'Product / Full-Stack'
status: 'Shipped'
visibility: 'private-production'
featured: false
order: 4
timeframe: '2023 — Present'
role: 'Owning engineer'
stack:
  - Python
  - FastAPI
  - 'C# / .NET'
  - SQL Server
  - Apache NiFi
  - React
metrics:
  - value: '15+'
    label: 'production tools'
  - value: '200+'
    label: 'users'
  - value: '$12M+'
    label: 'shipments validated'
links: {}
---

## Context

A manufacturing startup scaling across two sites generates a constant
need for software that the off-the-shelf market doesn't sell: end-of-line
validation, quality reporting, data movement between systems that were
never meant to talk. That whole surface became mine to own.

## What I built

A suite of 15+ internal tools serving 200+ users across the Bay Area and
Texas sites — end-of-line validation systems, an admin tool, automated
outgoing-quality-control reporting, and the ETL pipelines that feed them.
Not one app: a platform of small, reliable tools, each solving a real
operational bottleneck.

## Architecture

Services are built in Python/FastAPI and C#/.NET against SQL Server,
with Apache NiFi handling data flow between systems and React powering
the operator-facing interfaces. Each tool is small and focused, but they
share conventions for data access, validation, and deployment so the
whole set stays maintainable by one engineer.

## Technical highlights

- **End-of-line validation.** Systems that gate whether product
  ships — correctness here has direct financial weight, behind the
  $12M+ in validated shipments.
- **OQC reporting automation.** Replaced a manual reporting process
  with an automated pipeline, cutting report turnaround dramatically.
- **Admin tooling.** Consolidated scattered manual operations into one
  interface, with a large measured efficiency gain for the team.

## Tradeoffs

A platform of many small tools owned by one engineer demands ruthless
consistency — shared patterns and conventions — or it becomes
unmaintainable. That discipline is the cost of the breadth.

## Outcome

The toolset is core operational infrastructure at both sites, used daily
by 200+ people. It's also where I learned to ship software that an
organization genuinely depends on.
