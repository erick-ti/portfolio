---
title: 'CelLink Internal Tooling Platform'
org: 'CelLink'
tagline: 'Fifteen-plus production internal tools for validation, reporting, and ETL, owned end to end across two sites.'
category: 'Product / Full-Stack'
status: 'Shipped'
visibility: 'private-production'
featured: false
order: 4
timeframe: '2024 to Present'
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
  - value: '500+'
    label: 'users'
  - value: '99.9%'
    label: 'uptime'
links: {}
---

## Context

A high-velocity startup scaling across two sites needs internal software the
off-the-shelf market doesn't sell: data movement between systems that were never
meant to talk, reporting, and validation. When that software is wrong,
the cost lands immediately. That whole surface
became mine to own.

## What I built

A suite of 15+ internal tools serving 500+ users across both sites: validation
systems, an admin tool, automated reporting, and the ETL pipelines that feed
them. Not one
app. A platform of small, focused tools, each one solving a real operational
bottleneck, all maintained by one engineer.

## Architecture

Services are Python/FastAPI and C#/.NET against SQL Server, with Apache NiFi
moving data between systems and React on the operator-facing interfaces. Each
tool stays small and single-purpose, but they share conventions for data access,
validation, and deployment. That shared spine is what lets one person own 15+
tools without the set rotting.

## Technical highlights

- **Validation that gates release.** These systems decide whether work passes, so
  being down is not an option. They run at 99.9% uptime.
- **Reporting automation.** Replaced a manual reporting process with an automated
  pipeline, so the report is a byproduct of
  the data instead of someone's afternoon.
- **One admin surface.** Folded scattered manual operations into a single tool,
  so day-to-day administration stops being tribal knowledge.

## Tradeoffs

Many small tools owned by one engineer only works under ruthless consistency.
Every tool that drifts from the shared patterns is a tool only I can touch, and
that doesn't scale. I'd rather give up a little local cleverness to keep the
whole set legible. The discipline is the price of the breadth.

## Outcome

The toolset is core operational infrastructure at both sites, used daily by 500+
people. It's also where I learned what it takes to ship software an organization
genuinely leans on, and to keep it standing.
