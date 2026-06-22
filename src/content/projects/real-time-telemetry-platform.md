---
title: 'Real-Time Telemetry Platform'
org: 'CelLink'
tagline: 'Real-time telemetry at scale: 20+ event-driven ETL pipelines feeding 30+ code-generated dashboards, on a Kubernetes cluster built to stay up.'
category: 'Data & Operations'
status: 'Shipped'
visibility: 'private-production'
featured: false
order: 5
timeframe: '2024'
role: 'Sole engineer'
stack:
  - Python
  - 'C# / .NET'
  - AWS Timestream
  - MinIO
  - Kubernetes (K3s)
  - Grafana
  - SQL
metrics:
  - value: '30+'
    label: 'live dashboards'
  - value: '20+'
    label: 'ETL pipelines'
  - value: '50k+'
    label: 'records / day'
links: {}
---

## Context

Industrial equipment never stops talking: machines on the line emit a steady
stream of process telemetry, around the clock. None of it
is useful until it lands somewhere queryable and shows up on a screen an operator
actually watches. A drift caught on a live run chart is a scrap batch that never
ships, and missing that signal is the expensive case. So the data has to move
reliably, and the dashboards have to stay honest.

## What I built

A real-time telemetry backbone: 20+ event-driven ETL pipelines that move
equipment data off the line into a time-series store, feeding 30+ Grafana
dashboards that operators and process engineers watch in real time. The pipelines
are C# file-watcher services. The dashboards are generated from code, not clicked
together by hand. Together they process 50,000+ records a day.

## Architecture

C# file-watcher services pick up equipment output as it lands and push it into AWS
Timestream, with MinIO holding the raw artifacts. On the read side, a Python build
script generates the Grafana dashboards: every panel's query against Timestream is
defined in code, so 30+ dashboards stay version-controlled, diffable, and
regenerable. The pipeline fleet runs on a K3s Kubernetes cluster with multi-node
failover, so a single node dropping out doesn't take telemetry down with it. I
validated the migration with a 24-hour soak test before it carried production
load.

## Technical highlights

- **Event-driven ingestion.** The pipelines react to equipment output as it
  arrives instead of polling on a timer, so the data stays fresh and the
  services sit idle when nothing is happening.
- **Dashboards as code.** 30+ dashboards come out of a script, so they stay
  consistent and one change propagates everywhere at once. No click-by-click
  drift, no panel that quietly disagrees with the one next to it. I-MR (individual
  / moving-range) charts bring process-control thinking to live equipment data.
- **Built to stay up.** Running on K3s with multi-node failover means the
  telemetry path survives a node loss, and the 24-hour soak test proved it before
  real data depended on it.
- **Time-series native.** Querying Timestream directly keeps a 50,000-record-a-day
  feed fast enough to watch in real time, instead of timing out on a relational
  table.

## Tradeoffs

Generating dashboards from code and running the pipelines on Kubernetes is more
upfront machinery than a handful of charts would need. You can't just drag a panel
and save, and a cluster is a thing you have to operate. It pays back the moment you
have 30+ dashboards that must agree, 20+ pipelines that can't silently die, and an
operation that treats the data as ground truth.

## Outcome

The platform runs as live, real-time monitoring across the operation: equipment telemetry
flows through 20+ pipelines into 30+ dashboards that operators and engineers trust
as a shared, real-time view of process health. It runs on infrastructure built to
survive a bad night, and every dashboard lives in version control where it can be
reviewed and rebuilt instead of redrawn by hand.
