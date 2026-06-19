---
title: 'Agentic Dev Environment'
tagline: 'A reproducible, AI-augmented development setup — version-controlled dotfiles, custom Claude Code commands, and a multi-model workflow.'
category: 'Developer Tools'
status: 'Shipped'
visibility: 'public'
featured: false
order: 7
timeframe: '2025 — Present'
role: 'Personal infrastructure'
stack:
  - Claude Code
  - Bash
  - Git
  - Ghostty
  - macOS
metrics:
  - value: '6'
    label: 'custom Claude Code commands'
  - value: 'One-command'
    label: 'machine bootstrap'
  - value: 'Multi-model'
    label: 'Claude + Codex workflow'
links:
  repo: 'https://github.com/erick-ti/dotfiles'
---

## Context

A development environment is itself a system worth engineering. A new
machine, a wiped setup, or simply context lost between sessions all cost
time that good tooling eliminates. So I treat my own environment as a
project: versioned, reproducible, documented.

## What I built

An AI-augmented development setup with two halves: a version-controlled
dotfiles repository that reproduces my environment on a fresh machine,
and a structured Claude Code workflow that makes AI assistance
consistent across projects.

## Architecture

The dotfiles repo uses a symlink-based pattern — configuration lives in
the repo, symlinked into place — documented in its own setup and
cheatsheet files. The Claude Code workflow adds structured context files
(a per-project `CLAUDE.md`, session notes) and custom slash commands for
recurring tasks like project initialization, commits, and session
handoff, alongside a multi-model setup that brings additional models in
where they fit.

## Technical highlights

- **Reproducible by symlink.** One bootstrap step links every config
  into place; the repo is the single source of truth for the
  environment.
- **Context as a first-class artifact.** Structured `CLAUDE.md` and
  session-note files keep AI assistance grounded across long-running
  work instead of starting cold each time.
- **Custom commands.** Slash commands wrap repetitive workflows —
  init, commit, handoff — into one consistent, repeatable interface.

## Tradeoffs

Investing in personal infrastructure only pays back over time — it's
overhead if you measure a single afternoon. Across every project since,
the leverage compounds.

## Outcome

A development environment that rebuilds itself on a new machine and
makes AI-assisted work consistent and repeatable — the backbone behind
everything else in this portfolio.
