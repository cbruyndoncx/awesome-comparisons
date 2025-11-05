# Verdent for VS Code

Dataset ID: code-editor

## Short Description

Verdent for VS Code is the Visual Studio Code extension for Verdent AI — an agentic, plan-first coding assistant which orchestrates parallel subagents to design, implement, and verify code changes with built-in git worktree isolation and DiffLens visualizations.

## Description

Verdent is designed around a "Plan First, Verify Early" methodology. The VS Code extension brings Verdent's orchestration and verification features into the editor so developers can:

- Create high-level plans that break tasks into subagents and subtasks
- Run Researcher and Verifier subagents to analyze code, propose changes, and automatically validate outcomes
- Execute agentic tasks that operate in isolated git worktrees to avoid conflicts
- Inspect changes via DiffLens and commit/rollback via integrated Git workflows

The extension is intended to reduce context switching by letting developers remain inside VS Code while Verdent handles routine engineering work.

## Key Features

- Plan-first task decomposition and agent orchestration
- Parallel subagents with isolated git worktrees
- Built-in verifier for automated testing and web interactions
- DiffLens for clear visibility into changes
- Commit, PR creation, and rollback support from within the editor
- Customizable rules and permissions to control agent autonomy

## Languages

- Any (language-agnostic)

## Licensing

- Proprietary (commercial product)

## Deployment

- Cloud-first with extension-based integration into VS Code
- Local offline modes not advertised; enterprise/enterprise-on-prem options may exist

## Developer Experience

- Context management: Yes — long-horizon memory and repository indexing
- Direct file references: Yes — agents can surface and edit files directly in the workspace
- Checkpoints: Yes — worktree-level commits and rollbacks protect main branches
- Git support: Yes — integrated commit/PR workflows

## Extensibility

- Plugins: Yes — Verdent offers extension points and a VS Code plugin
- Subagents: Yes — specialized subagents (e.g., Researcher, Verifier) execute tasks in parallel and can be customized

## Notes

- Verdent Deck is the desktop counterpart focused on multi-agent orchestration; the VS Code extension brings the same capabilities into the editor.
- Product is commercial with early access and paid tiers; capabilities and pricing should be verified on the vendor site.

## Sources

- Verdent product announcements and coverage (2025)
- Reviews and demonstrations showing Verdent launching from within VS Code and the Verdent Deck demos
