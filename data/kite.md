# Kite — https://kite.com
A desktop AI code-completion assistant focused initially on Python, later multi-language. Ran local models for low-latency, privacy-first completions and editor integrations. Company ceased operations in late 2022 and released parts of its codebase as open source.

## Version
Archived (2022-12-31)

## Rating
- [4] Strong historical accuracy for Python completions (context-aware compared to older alphabetical completions)
- [3] Multi-language coverage decent but uneven (best for Python)
- [4] Privacy: good (local processing design)
- [2] Business viability: failed to monetize sufficiently

## Repository
- https://github.com/kiteco/kiteco

## Languages
- Python
- JavaScript / TypeScript
- Java
- Go
- Many others via editor plugins

## Extensible
- Yes
  - Editor plugins and integrations (VS Code, Sublime, Atom, JetBrains IDEs)

## Description
Kite was an early AI-assisted coding tool (founded 2014) that provided context-aware code completions, documentation lookups, and inline examples inside editors. Its core differentiator was processing code and ML inference locally on the developer's machine to reduce latency and address privacy concerns. Kite trained models on large bodies of open-source code and tuned them for code prediction tasks rather than using plain NLP models. Despite strong technical work and a sizeable user base, Kite shut down operations in late 2022 and open-sourced a portion of its codebase.

## BYOK
- No

## LocalOffline
- Yes
  Any additional details: primary design emphasized on-device inference and privacy (local completions rather than cloud-only).

## FreeTrial
- Yes

## GitSupport
- Yes

## Terminal
- No

## Opensource
- Yes
  - Company published several repositories under the kiteco GitHub organization after winding down; some components and research artifacts are available for reuse.

## License
- Mixed / see repository

## MCPSupport
- No

## Notes
- Founded 2014; widely adopted by Python developers for smarter completions and docs.
- Raised funding and grew to a large community, but announced shutdown in late 2022 due to a combination of technical limits (models not yet delivering transformative improvements) and monetization challenges.
- Legacy: influenced expectations for context-aware completions and privacy-conscious local inference; lessons from Kite informed subsequent entrants and enterprise offerings in the AI coding space.
- As of 2025 the company is inactive; repositories remain as historical artifacts and starting points for community forks and research.
