---
title: 'Audio-Native Song Recommender'
tagline: 'A music recommendation engine built on audio embeddings — it listens to the song itself, not just its metadata.'
category: 'AI Systems'
status: 'Shipped'
visibility: 'public'
featured: true
order: 3
timeframe: '2024 — Present'
role: 'Sole engineer — personal project'
stack:
  - Python
  - FastAPI
  - LAION-CLAP
  - pgvector
  - PostgreSQL
  - Claude
  - Next.js
  - TypeScript
metrics:
  - value: 'Audio-native'
    label: 'CLAP embeddings'
  - value: '4-axis'
    label: 'fused re-rank score'
  - value: '8 genres'
    label: 'live interactive demo'
links:
  live: 'https://doppel.erickti.com'
  repo: 'https://github.com/erick-ti/doppel'
coverImage: '/projects/doppel/cover.jpg'
coverAlt: 'The Doppel landing page — an audio-native song recommender with a replay console and a cultural-vs-audio convergence view.'
ogImage: '/projects/doppel/cover.jpg'
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
clips. A final stage fuses four signals into one ranking — raw CLAP
audio cosine, vibe-text cosine, a within-batch rerank, and RRF cultural
consensus — and Claude writes a short rationale for each pick.

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

Shipped and live at doppel.erickti.com: pick one of the seed tracks
spanning eight genres and it returns a real top-10 with the four-axis
score breakdown, source overlap, and an LLM rationale for every
neighbor. It's my end-to-end deep dive into a real retrieval system.
