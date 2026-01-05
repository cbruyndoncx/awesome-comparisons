# Grok Code Fast 1 - https://x.ai/news/grok-code-fast-1

Grok Code Fast 1 is xAI's speedy and economical reasoning model that excels at agentic coding, built from scratch with a brand-new architecture and offering exceptional speed at approximately 160 tokens per second.

**Dataset ID:** aie-model

## General Info

### Classification
- AIE/Model

### Version
- 1.0 (August 2025)

### Repo
- -

### Rating
- SWE-Bench-Verified: 70.8%
- Speed: ~160 tokens/second (vs GPT-5 at 50.1, Gemini 2.5 Pro at 92.4, Claude 4 Sonnet at 78.7)

### Short Description
xAI's ultra-fast agentic coding model with 314B parameters (MoE), achieving 70.8% on SWE-Bench while delivering ~160 tokens/second throughput.

### Description
Grok Code Fast 1 was released by xAI in late August 2025 as a speedy and economical reasoning model optimized for agentic coding. The model was built from scratch with a brand-new architecture and initially released quietly under the codename "sonic" before its official announcement.

Built using a mixture-of-experts architecture with an estimated 314 billion parameters, the model was trained on a pre-training corpus rich with programming-related content and curated datasets reflecting real-world pull requests and coding tasks. It features a 256k token context window, enabling it to process larger codebases in context.

The model is exceptionally versatile across the software development stack and particularly adept at TypeScript, Python, Java, Rust, C++, and Go. It can complete tasks ranging from building zero-to-one projects to performing surgical bug fixes. On the full subset of SWE-Bench-Verified, grok-code-fast-1 scored 70.8% using xAI's internal evaluation harness.

According to xAI's benchmarks, the model executes at approximately 160 tokens per second, significantly outpacing competitors: GPT-5 at 50.1 tokens/second, Gemini 2.5 Pro at 92.4, and Claude 4 Sonnet at 78.7. The model is available via the xAI API with competitive pricing and was offered for free through launch partners including GitHub Copilot, Cursor, Cline, Roo Code, Kilo Code, opencode, and Windsurf for a limited time.

### Languages
- TypeScript
- Python
- Java
- Rust
- C++
- Go
  - Supports other languages but particularly adept at these

### Notes
- Architecture: Mixture-of-experts with ~314B parameters
- Context Window: 256k tokens
- Speed: ~160 tokens/second (industry-leading)
- Benchmark: 70.8% SWE-Bench-Verified
- Pricing: $0.20/1M input tokens, $1.50/1M output tokens, $0.02/1M cached tokens
- Launch Partners: GitHub Copilot, Cursor, Cline, Roo Code, Kilo Code, opencode, Windsurf
- Free Tier: Available free for limited time through select partners
- Codename: Initially released as "sonic"
- Training: Rich programming content, real-world PR datasets
- Future: Multimodal variant in training with parallel tool calling and extended context
- Developer: xAI
- Release: August 2025

### Last Update
- 2025-11-18

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
  - Free access through launch partner tools for limited time
