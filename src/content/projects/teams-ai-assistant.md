---
title: 'OTIS: Company-Wide AI Agent'
org: 'CelLink'
tagline: 'An AI agent on the web and in Microsoft Teams that lets anyone at the company query live business data and search internal docs in plain English.'
category: 'AI Systems'
status: 'Shipped'
visibility: 'private-production'
featured: true
order: 1
timeframe: '2024 to Present'
role: 'Engineer'
stack:
  - React
  - TypeScript
  - .NET 10
  - Anthropic SDK
  - Qdrant
  - SQL Server
metrics:
  - value: '20%'
    label: 'fewer recurring support requests'
  - value: 'All staff'
    label: 'company-wide rollout'
  - value: 'Web + Teams'
    label: 'where it runs'
links: {}
---

## Context

The business data and internal docs already existed. Getting to them often
meant knowing SQL or knowing where a document was filed, and the fallback was
asking the software team. Those recurring support requests were the cost I
wanted to cut.

## What I built

OTIS is a company-wide AI agent that answers plain-English questions on the web
and inside Microsoft Teams, where people already work. Ask it about live business
data or an internal doc, and it works out which tool to call, runs it, checks its
own answer, and replies. It is used by all staff.

## Architecture

A React/TypeScript front end and a Teams integration both talk to a .NET 10
service built on the Anthropic SDK. The service runs a custom tool-calling
orchestration layer with two kinds of tools: read-only SQL queries against live
business data, and Qdrant vector search over internal documents. The model
decides what to call; the service executes it and returns structured results.
Before anything reaches the user, a second model pass checks the draft answer
against those tool results.

## Technical highlights

- **Read-only SQL, checked before it runs.** Every query the model writes is
  parsed into a syntax tree (AST) and validated as read-only before execution,
  so the guardrail sits in code rather than in the prompt.
- **Answers grounded in the data.** The second model pass compares the reply
  to what the tools actually returned, which catches answers that drift from the
  numbers.
- **Docs and data in one place.** Qdrant document search sits beside the SQL
  tool, so data questions and doc lookups go through the same chat.

## Tradeoffs

Validating SQL and verifying every answer adds work to each request: a parse
step before a query runs and an extra model call before a reply goes out. For a
tool pointed at live business data, I'll take a slightly slower, correct answer
over a fast one nobody can trust.

## Outcome

Recurring software support requests dropped 20%. OTIS runs company-wide in
production, and people reach for it instead of filing a request.
