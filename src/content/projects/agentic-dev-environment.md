---
title: 'Agentic Dev Environment'
tagline: 'A reproducible, AI-augmented development setup: version-controlled dotfiles, custom Claude Code commands, and a multi-model workflow.'
category: 'Developer Tools'
status: 'Shipped'
visibility: 'concept'
featured: true
order: 7
timeframe: '2025 to Present'
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
  - value: 'Reproducible'
    label: 'fresh-machine bootstrap'
  - value: 'Multi-model'
    label: 'Claude + Codex workflow'
links: {}
---

## Context

A dev environment is a system, and an un-versioned one is a liability. A new
laptop, a wiped install, or context lost between sessions all cost time that good
tooling buys back. I'd rather pay that cost once. So I treat my own setup like any
other project: versioned, reproducible, documented well enough that a fresh
machine comes up through a documented, repeatable bootstrap.

## What I built

An AI-augmented development setup in two halves. A version-controlled dotfiles
repo that reproduces my environment on a clean machine, and a structured Claude
Code workflow that makes AI assistance consistent across every project instead of
starting cold each time.

## Architecture

Configuration lives in the repo and symlinks into place, so the repo is the
single source of truth and edits flow straight back to version control. The Claude
Code half adds structured context files (a per-project `CLAUDE.md`, session notes)
plus custom slash commands for the recurring work: project init, commits, session
handoff. A multi-model setup brings Codex in alongside Claude where it fits.

## Technical highlights

- **Reproducible by symlink.** A documented bootstrap (clone, symlink, Brewfile) links every config into place.
  The repo is the source of truth, so there is no drift between what runs and
  what's checked in.
- **Context as a first-class artifact.** Structured `CLAUDE.md` and session-note
  files keep AI assistance grounded across long-running work, so the model resumes
  with state instead of guessing.
- **Six custom commands.** Slash commands wrap the repetitive workflows (init,
  commit, handoff) into one consistent, repeatable interface I can trust to behave
  the same way every time.

## Tradeoffs

Personal infrastructure only pays back over time. Measure a single afternoon and
it's pure overhead. Measure across every project since and the leverage compounds.
I made that bet deliberately.

## Outcome

A development environment that rebuilds itself on a new machine and keeps
AI-assisted work consistent and repeatable. It's the backbone behind everything
else in this portfolio.
