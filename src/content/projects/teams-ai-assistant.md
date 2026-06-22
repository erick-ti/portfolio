---
title: 'OTIS: Teams AI Assistant'
org: 'CelLink'
tagline: 'A natural-language interface that lets non-technical staff query production databases and locate documents without leaving Microsoft Teams.'
category: 'AI Systems'
status: 'Shipped'
visibility: 'private-production'
featured: true
order: 1
timeframe: '2024 to Present'
role: 'Two-engineer build'
stack:
  - Python
  - FastAPI
  - Anthropic SDK
  - M365 Agents SDK
  - SQL Server
  - Azure
metrics:
  - value: '80%'
    label: 'fewer ad-hoc data requests'
  - value: '500+'
    label: 'staff served'
  - value: '~$115/mo'
    label: 'runtime cost'
links: {}
---

## Context

The information always existed: yields, test results, where a given spec
lived. The access path didn't. Anyone who wasn't fluent in SQL
had exactly one way to get an answer out of production: file a ticket and wait
on an engineer. Every routine question turned into an interrupt, and the
cumulative tax on the engineering team was real. A steady drip of "quick
questions" pulled people off the work they were actually there to do.

## What I built

OTIS is a Teams-native assistant that answers plain-English questions in the
channel where people already work. Ask it for a yield trend or a document, and
it works out which tool to call, runs it, and replies. No SQL, no digging
through the shared drive. Another engineer and I built it from concept to production, and it now
serves 500+ users.

## Architecture

A FastAPI service sits between Teams and the Anthropic API. Each incoming
message goes to the model alongside a custom tool-calling layer that exposes
exactly two capabilities: a parameterized SQL tool scoped to read-only
reporting views, and a file-retrieval tool over the shared drive. The model
decides which tool to call; the service executes it under tight permissions and
returns structured results for the model to summarize. The model plans. It
never gets a hand on the database itself.

## Technical highlights

- **A deliberately small tool surface.** The SQL tool never runs free-form
  queries. It hits a fixed set of vetted views with bound parameters, so no
  amount of clever prompting reaches data it shouldn't. For a model pointed at
  production, that constraint *is* the feature.
- **Cost discipline.** Careful prompt design and model selection keep the whole
  thing running around $115/month while serving the full team, cheap enough
  that nobody has to think about it.
- **A migration nobody noticed.** When the Bot Framework Python SDK was
  deprecated, I moved the Teams integration onto the M365 Agents SDK as an
  isolated adapter swap rather than a rewrite. No downtime for users.

## Tradeoffs

The small tool surface trades flexibility for safety on purpose: a genuinely
new question sometimes needs a new vetted view before OTIS can answer it,
instead of working out of the box. For a tool touching production data, I'll
take that trade every time. I'd rather add a reviewed view than hand a model a
blank check.

## Outcome

Ad-hoc data requests to engineering dropped about 80%. OTIS runs quietly in
production and has become the default way non-technical staff get to their
data. That's the only outcome I really cared about: people reach for it without
being told to.
