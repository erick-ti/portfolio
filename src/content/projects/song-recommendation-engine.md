---
title: 'Audio-Native Song Recommender'
tagline: 'A music recommendation engine built on audio embeddings — it listens to the song itself, not just its metadata.'
category: 'AI Systems'
status: 'In Progress'
visibility: 'concept'
featured: false
order: 3
timeframe: '2024 — Present'
role: 'Sole engineer — personal project'
stack:
  - Python
  - LAION-CLAP
  - pgvector
  - PostgreSQL
  - FastAPI
  - Claude
metrics:
  - value: 'HNSW'
    label: 'vector similarity index'
  - value: 'Audio'
    label: 'content-based signal'
  - value: 'Multi-stage'
    label: 'retrieve + rerank'
links: {}
---

## Context

Most recommenders lean on collaborative filtering — "people who liked X
liked Y." That works until you hit a cold-start track or want to escape
a popularity bubble. I wanted recommendations grounded in how music
actually *sounds*.

## What I built

A content-based recommendation pipeline that represents each track by an
embedding of its audio, then finds neighbors in that acoustic space.
It's a personal project to go deep on embeddings, vector search, and
multi-stage retrieval.

## Architecture

LAION-CLAP turns raw audio into embeddings that capture timbre, energy,
and texture. Vectors are stored in PostgreSQL via pgvector with an HNSW
index for fast approximate nearest-neighbor search. Candidate tracks are
sourced from Last.fm and ListenBrainz, with Deezer supplying preview
clips. A final reranking stage uses Claude to order candidates with
awareness of context the raw vectors miss.

## Technical highlights

- **Audio as the primary signal.** Embedding the waveform sidesteps the
  cold-start problem — a brand-new track is just another point in the
  space.
- **HNSW for scale.** The approximate index keeps nearest-neighbor
  lookups fast as the catalog grows, instead of a linear scan.
- **Retrieve, then rerank.** Cheap vector search casts a wide net; the
  LLM rerank does the expensive, nuanced ordering on a short list — a
  pattern straight from modern retrieval systems.

## Tradeoffs

Audio embeddings capture sound, not sentiment or cultural context — two
songs can be acoustically close but a poor pairing. The rerank stage
exists precisely to recover some of that lost nuance.

## Outcome

Architecture and core pipeline are in place; ongoing work is tuning
retrieval quality and the rerank prompt. The project is my deep dive
into building a real retrieval system end to end.
