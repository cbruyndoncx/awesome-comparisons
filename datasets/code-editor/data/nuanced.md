# Nuanced MCP Server - https://nuanced.ai
Nuanced provides compiler-grade code intelligence (call graphs, symbols, types, dataflow) to AI coding agents via an MCP server that runs analysis locally and serves precise context slices to LLMs.

## General Info

### Classification
- Code/Editor

### Version
v— (2025-10-19)

### Repo
- https://github.com/mattmorgis/nuanced-mcp
  - Repository maintained by Matt Morgis (nuanced-mcp)

### Rating
- N/A
  - No public aggregated review score found; project is a niche open-source tool with limited public reviews.

### Short Description
- Local MCP server that supplies LLMs with compiler-grade call graphs and symbol-level context (TypeScript/Python focus).

### Description
Nuanced is an MCP (Model Context Protocol) server and code-intelligence layer that supplies AI coding assistants with compiler-grade facts about a repository: static call graphs, symbol tables (fully-qualified names and paths), inferred types, dataflow and control-flow information. Rather than sending raw file text or embeddings, Nuanced serves on-demand subgraphs of precisely the code relevant to a prompt, enabling agents to follow real call chains across files, reason about downstream impact ("blast radius"), and reduce hallucinations. Its design emphasizes local-first analysis so that repository code and analysis results remain on user infrastructure while providing integration points for IDEs, CI, and custom agents.

### Languages
- TypeScript
- JavaScript
- Python
- Other 
  - advertised: total support for 8 languages; TypeScript and Python are prominent

### Notes
- Built by former GitHub engineers experienced in large-scale code intelligence and search.
- Key capabilities: static call graphs, symbol-level context, inferred types, dataflow/control-flow facts, and on-demand context subgraphs for prompts.
- Integrations: used with AI assistants and tools (examples reported: Cursor, Claude Code, Codex workflows) and integrates with LSP tooling and IDEs.
- Benefits: reduces LLM token spend (reported up to ~33% in company materials), improves accuracy of generated code, limits hallucinations by giving models precise code facts, and helps predict downstream impact of edits.
- Language support: strong TypeScript support, official Python support announced; company advertises support for eight languages in total with broader support available via enterprise offerings.
- Deployment: installable via npm/CLI or Python tooling (project implementations vary); configured as an MCP server; designed to run locally or on-prem for secure codebases.
- Tradeoffs/Unknowns: full license details and exact language-by-language feature parity are not always documented in public materials; enterprise features and expanded language support may be gated under paid plans.
- Good fit for: teams using LLMs to assist coding on large/complex repos, organizations requiring local analysis for security/privacy, and tooling vendors building LLM-powered code assistants.

### Last Update
- 2025-10-19

## Licensing

### Opensource
- Yes
  - Nuanced is published as an open-source project on GitHub; users should check the repository's LICENSE file for the canonical license text.

### License
- Permissive (check repository LICENSE)
  - Public materials describe the project as permissively licensed; confirm exact license (MIT/Apache-2.0/etc.) by inspecting the repo's LICENSE file before using in license-sensitive contexts.

### FreeTrial
- Yes
  - Core project is open-source and available to use without payment. Commercial/enterprise add-ons (if offered) may be paid — check project or vendor pages for details.

## MCP-Client

### MCP-Client
- Yes
  - Nuanced is explicitly implemented as an MCP server to deliver structured code context to LLM-based agents.

### Prompts
- Yes
  - The project includes prompt templates / example prompts for common code-analysis tasks (e.g. analyze_function, impact analysis, dependency prompts) used by MCP clients to structure model queries.

### Tools
- Yes
  - Exposed tools include initialize_graph, switch_repository, list_repositories, get_function_call_graph, analyze_dependencies, analyze_change_impact and related helpers used by clients to request specific analyses.

### Resources
- Yes
  - Queryable resources (graph:// style) exist for summaries and function-level data, for example graph://summary, graph://repo/{repo_path}/summary, graph://function/{file_path}/{function_name}.

## Deployment

### BYOK
- No
  - Nuanced provides context to LLMs but does not manage LLM API keys itself; bring-your-own-LLM/API-key is handled by the client (e.g., Claude Desktop, Cursor) rather than the MCP server.

### LocalOffline
- Yes
  - Local-first MCP server: analysis runs on the user's machine or infrastructure; code/context does not need to be uploaded to external APIs.

## Developer Experience

### ContextManagement
- Yes
  - Nuanced supports on-demand subgraphs and focused context slices to control what is provided to the model as context.

### DirectFileReferences
- Yes
  - Function- and file-level resources allow direct references (file paths, function names) so clients can request precise code locations.

### Checkpoints
- No
  - No built-in checkpoint/undo system documented; versioning or undo workflows should be handled with VCS (git) or client tooling.

### GitSupport
- Yes
  - Designed to integrate with developer workflows; commonly used alongside git-based repositories for initialization and analysis.

## Extensible

### Extensible
- Yes
  - Server exposes tools/resources via MCP and can be integrated into other tooling chains; implementations are intended to be extended or wrapped by clients.

### Plugins
- No
  - No documented plugin bundling system; extension is achieved by wrapping or adding MCP tool endpoints rather than an internal plugin marketplace.

### Hooks
- No
  - No documented lifecycle hook system in the core project; integration points are via MCP tool calls and external orchestration.

### SlashCommands
- No
  - Not a chat-platform agent; no documented slash-command set. Client-side integrations may map commands to MCP calls.

### CustomModes
- No
  - No documented custom chat modes; clients may implement specialized prompts or modes when calling the server.

### Subagents
- No
  - Nuanced itself exposes analysis endpoints rather than managing subagent workflows; higher-level orchestration is left to the client agent.

## Ungrouped Criteria

### Terminal
- Yes
  - Provides an npm package / Python package and CLI for setup/configuration; integrates with developer workflows.

### SpecDrivenDevelopment
- None
  - No explicit support or built-in integrations with spec-driven development frameworks (Tessl, SpecKit, etc.) documented; treat as orthogonal to spec tooling.
