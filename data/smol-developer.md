# Smol Developer - https://github.com/smol-ai/developer/
A lightweight open-source AI developer agent for generating small projects and prototypes from natural-language specifications.
## Version

## Rating
- [4] Lightweight and easy to experiment with
- [3] Powerful for small whole-program synthesis tasks but not a full IDE replacement

## Repository
- https://github.com/smol-ai/developer
  
## Languages
- Python (tooling)
- JavaScript (target examples)
- Any (can generate code in many languages via the underlying LLM)
## Extensible
- Yes

## Description
Smol Developer is an opinionated, small-footprint AI "developer" agent that aims to turn high-level product descriptions or markdown specs into runnable, small codebases. It is implemented in Python and designed for experimentation and rapid prototyping: you can run it as a library, as a git-repo driven workflow, or call it via an API-like interface. The project focuses on whole-program synthesis (generating multiple coordinated files rather than isolated snippets) and uses prompt engineering patterns (Markdown specs, planning + implementation steps) to keep results coherent across files.

## BYOK
- Yes

## LocalOffline
- Yes
  - Smol can be used with locally hosted/open-source LLMs in some setups, but most common usage relies on a cloud LLM (e.g., OpenAI GPT-4) which requires network access and an API key.

## FreeTrial
- Yes

## GitSupport
- Yes
  - The repo includes a "git repo mode" workflow that operates on a repository, enabling human-in-the-loop prototyping and iteration.

## Terminal
- Yes
  - Usable as a Python library and in repo-driven workflows; CLI/recipe-style usage patterns exist for iterative development.

## Opensource
- Yes

## License

## MCPSupport

## Notes
- Core value: whole-program synthesis — Smol focuses on producing small, coherent applications from a single natural-language specification rather than only single-file completions.
- Usage modes:
  - Git Repo Mode: operate against a checked-out repository for iterative development and human review.
  - Library Mode: import smol as a Python package to script generation steps (planning, specifying file paths, generate).
  - API/Recipe Mode: integrate the agent into higher-level tooling or automated flows.
- Prompting DSL: leans on Markdown as the canonical way to describe requirements and specs for the agent.
- Good fit: rapid prototyping, scaffolding, learning how to implement features with unfamiliar APIs, and generating small demo apps or PoCs.
- Limitations: quality and speed depend heavily on the chosen LLM (GPT-4 is common but slower/costly). The tool is experimental — outputs require human review, testing, and iteration. Not designed as a drop-in replacement for full IDE/code-review workflows.