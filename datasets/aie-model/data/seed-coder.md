# Seed-Coder - https://github.com/ByteDance-Seed/Seed-Coder

Lightweight open-source code LLM family from ByteDance Seed trained on 6 trillion tokens. Achieves state-of-the-art performance at 8B scale, surpassing much larger models.

## General Info

### Classification
- AIE/Model

### Version
- 1.0 (May 8, 2025)

### Repo
- https://github.com/ByteDance-Seed/Seed-Coder

### Rating
- SOTA among open-source models at 8B parameter scale
- Surpasses many larger models on coding benchmarks

### Short Description
- Family of lightweight open-source code LLMs (base, instruct, reasoning) trained on 6T tokens from GitHub code, commit histories, and code-related web data, achieving SOTA at 8B scale.

### Description
Seed-Coder is a family of lightweight open-source code language models developed by ByteDance Seed, comprising base, instruct, and reasoning model variants. The pretraining corpus comprises approximately 6 trillion tokens sourced from GitHub code, commit histories, and code-related web data, providing comprehensive coverage of modern software development practices. Despite its relatively compact 8B parameter scale, Seed-Coder achieves state-of-the-art performance among open-source models at this size and even surpasses some much larger models in coding benchmarks. All models in the family are publicly available on Hugging Face, making them accessible for research, fine-tuning, and deployment. The model family represents ByteDance's contribution to open-source AI coding tools, providing an efficient alternative for developers who need strong coding capabilities without requiring massive computational resources.

### Languages
- Any

### Notes
- 6 trillion tokens: Massive training corpus from GitHub code, commits, and code-related web data.
- Lightweight efficiency: Achieves SOTA at 8B scale, surpassing much larger models.
- Model family: Includes base, instruct, and reasoning variants for different use cases.
- Open source: All models publicly available on Hugging Face collection.
- State-of-the-art 8B: Best performance among open-source models at 8B parameter scale.
- Compact deployment: Suitable for resource-constrained environments while maintaining quality.
- ByteDance Seed: Developed by ByteDance's AI research division.
- Research-friendly: Accessible for academic research, fine-tuning, and custom deployments.
- Code-focused training: Specialized corpus emphasizing practical software development.
- Released May 8, 2025 as part of ByteDance's open-source AI strategy.
- Model variants: Base (32K context), Instruct (32K context), Reasoning (64K context), plus bf16 reasoning variant.
- Model-centric data curation: Uses LLMs to filter and curate training data, minimizing manual effort.
- Deployment: transformers library, vLLM offline batched inference, multi-GPU distributed serving with tensor parallelism.
- 2025-2026 Update: Released May 8, 2025. ByteDance Seed team preparing next-generation launches including Doubao 2.0, Seedream 5.0, and Seeddance 2.0 potentially by February 2026. Model supports vLLM deployment and multi-GPU distributed serving for long-context inputs up to 32K tokens.

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- MIT
  - Note: Different sources report both MIT and Apache-2.0; verify from official repository

### Free Trial
- Yes
