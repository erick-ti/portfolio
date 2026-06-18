---
title: 'Manufacturing Telemetry Dashboards'
tagline: 'Operator-facing monitoring for factory-floor equipment, generated from code and backed by a time-series database.'
category: 'Data & Operations'
status: 'Shipped'
visibility: 'private-production'
featured: false
order: 5
timeframe: '2024'
role: 'Sole engineer'
stack:
  - Python
  - AWS Timestream
  - Grafana
  - SQL
metrics:
  - value: '24'
    label: 'live panels'
  - value: '50k+'
    label: 'records / day'
  - value: 'Code-gen'
    label: 'reproducible build'
links: {}
---

## Context

A laminator tool on the production line produces a steady stream of
process telemetry — heater behavior, diameter, tension — that operators
and engineers need to watch in real time. Hand-built dashboards are slow
to make and slower to keep consistent across many panels.

## What I built

A process-monitoring dashboard for the laminator tool: 24 panels
covering heater run charts, I-MR drill-downs, and diameter and tension
data — generated programmatically rather than clicked together by hand.

## Architecture

A Python build script generates the Grafana dashboard definition,
emitting the queries each panel runs against AWS Timestream, the
time-series store holding the equipment telemetry. The dashboard is
defined as code, so it's version-controlled, reviewable, and
regenerable.

## Technical highlights

- **Dashboards as code.** Generating panels from a script means 24 of
  them stay consistent and a change propagates everywhere at once —
  no click-by-click drift.
- **Statistical drill-downs.** I-MR (individual / moving-range) charts
  bring process-control thinking to live equipment data.
- **Time-series native.** Querying Timestream directly keeps a
  high-volume telemetry feed responsive at dashboard speed.

## Tradeoffs

Code-generating dashboards adds an indirection layer over Grafana's
point-and-click editor — a real upfront cost. It pays back the moment
you need consistency across two dozen panels or have to rebuild them.

## Outcome

The dashboard runs as live monitoring for the laminator tool, giving
operators and engineers a shared, real-time view of process health.
