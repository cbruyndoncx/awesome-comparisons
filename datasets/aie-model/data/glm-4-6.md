# GLM-4.6 - https://huggingface.co/zai-org/GLM-4.6

GLM-4.6 is Zhipu AI's advanced coding model featuring a 355B-parameter Mixture of Experts (MoE) architecture with enhanced real-world coding, long-context processing, reasoning, and agentic AI capabilities.

**Dataset ID:** aie-model

## General Info

### Classification
- AIE/Model

### Version
- 4.6 (September 30, 2025)

### Repo
- https://huggingface.co/zai-org/GLM-4.6

### Rating
- LiveCodeBench v6: 82.8% (up from 63.3% in GLM-4.5)
- CC-Bench: 48.6% win rate vs Claude Sonnet 4 (near-parity)

### Short Description
Open-weight 355B-parameter MoE model from Zhipu AI with enhanced coding capabilities, 200K context window, and competitive performance against Claude Sonnet 4.

### Description
GLM-4.6 was released by Zhipu AI on September 30, 2025, as the latest iteration in the GLM series. The model features a 355B-parameter Mixture of Experts (MoE) architecture designed with a focus on advanced agentic capabilities, reasoning, and coding performance.

The model shows significant improvements over GLM-4.5 across eight public benchmarks, with 15% token efficiency improvements and enhanced real-world coding performance. The context window has been expanded from 128K to 200K tokens, enabling the model to handle more complex agentic tasks and larger codebases.

On LiveCodeBench v6 (which involves writing, executing, and debugging code across languages), GLM-4.6 achieved 82.8%, a substantial jump from GLM-4.5's 63.3%. In real-world coding tests (CC-Bench), it achieves near-parity with Claude Sonnet 4 (48.6% win rate). However, Zhipu AI acknowledges that it still lags behind Claude Sonnet 4.5 in coding ability.

GLM-4.6 is available via Z.ai API and OpenRouter, integrates with popular coding agents (Claude Code, Cline, Roo Code, Kilo Code), and supports local serving via vLLM and SGLang. Zhipu AI offers GLM Coding Plan, a subscription package specifically designed for AI-powered coding, available for $3 per month. As of late 2025, it is the leading open-source solution for coding tasks.

### Languages
- Any

### Notes
- Architecture: 355B-parameter MoE with BF16/F32 tensors
- Context Window: 200K tokens (expanded from 128K in GLM-4.5)
- License: MIT (open-weight model)
- Performance Improvements: 15% token efficiency, 82.8% LiveCodeBench v6
- Benchmarks: Near-parity with Claude Sonnet 4, behind Sonnet 4.5
- Pricing: GLM Coding Plan at $3/month
- Availability: Z.ai API, OpenRouter, Hugging Face, ModelScope
- Inference: vLLM and SGLang support for local serving
- Integration: Claude Code, Cline, Roo Code, Kilo Code
- Developer: Zhipu AI
- Release: September 30, 2025

### Last Update
- 2025-11-18

## Licensing

### Opensource
- Yes
  - Open-weight model

### License
- MIT
