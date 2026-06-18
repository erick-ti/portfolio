---
title: 'OTIS — Teams AI Assistant'
tagline: 'A natural-language interface that lets non-technical staff query production databases and locate documents without leaving Microsoft Teams.'
category: 'AI Systems'
status: 'Shipped'
visibility: 'private-production'
featured: true
order: 1
timeframe: '2024 — Present'
role: 'Sole engineer — concept to production'
stack:
  - Python
  - FastAPI
  - Anthropic SDK
  - M365 Agents SDK
  - SQL Server
  - Azure
metrics:
  - value: '~80%'
    label: 'fewer ad-hoc data requests'
  - value: '50+'
    label: 'staff served'
  - value: '~$115/mo'
    label: 'runtime cost'
links: {}
---

## Context

Manufacturing teams leaned on engineering for routine answers — yields,
test results, the location of a spec document. Every request became an
ad-hoc ticket, and the cumulative interrupt tax on the engineering team
was real. The information existed; the access path didn't.

## What I built

OTIS is a Teams-native assistant that takes plain-English questions and
returns answers in-channel. Ask it for a yield trend or a document, and
it figures out which tool to call, runs it, and replies — no SQL, no
shared-drive spelunking required. It was built solo from concept to a
production rollout for 50+ users.

## Architecture

A FastAPI service mediates between Teams and the Anthropic API. User
messages are passed to the model with a custom tool-calling layer that
exposes two capabilities: a parameterized SQL query tool scoped to
read-only reporting views, and a file-retrieval tool over the shared
drive. The model plans which tools to invoke; the service executes them
under tightly controlled permissions and returns structured results for
the model to summarize.

When the Bot Framework Python SDK was deprecated, the Teams integration
was migrated onto the M365 Agents SDK without downtime to users.

## Technical highlights

- **Constrained tool surface.** The SQL tool never runs free-form
  queries — it targets a fixed set of vetted views with bound
  parameters, so a creative prompt can't reach data it shouldn't.
- **Cost discipline.** Prompt design and model selection keep the whole
  system running at roughly $115/month while serving the full team.
- **Graceful SDK migration.** Swapping the deprecated framework was
  scoped as an isolated adapter change rather than a rewrite.

## Tradeoffs

The constrained tool surface deliberately trades flexibility for safety:
new questions sometimes need a new view rather than working
out-of-the-box. For an internal tool touching production data, that's
the right side of the line.

## Outcome

Ad-hoc data requests to engineering dropped roughly 80%. The system runs
quietly in production and has become the default way non-technical staff
get to the data they need.
