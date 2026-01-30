# Grok 2.5 - https://x.ai/

xAI's 314 billion parameter open-source model released under Apache 2.0 license. Features MoE architecture with 64 transformer layers, activating 2 of 8 experts per token, marking a strategic shift toward open-source AI development.

## General Info

### Classification
- AIE/Model

### Version
- Grok 2.5 (Late 2024 / Early 2025)

### Repo
- https://huggingface.co/xai-org

### Rating
- N/A (pre-dates standardized SWE-bench comparisons for this release)

### Short Description
- xAI's 314B open-source MoE model with 64 transformer layers and Apache 2.0 licensing, enabling commercial use and customization of enterprise-grade language capabilities.

### Description
Grok 2.5 is xAI's 314 billion parameter language model released under the Apache 2.0 license, representing a strategic move toward open-source AI. The model uses a Mixture of Experts architecture with 64 transformer layers, 48 attention heads for queries, 8 for keys/values, and a 131,072-token vocabulary. It intelligently selects 2 out of 8 experts per token for efficient inference. The Apache 2.0 license grants full commercial freedom including downloading, modifying, and distributing the model, though it prohibits using Grok 2.5 as training data for competing AI models. Running the full model requires at least 8 GPUs with 40GB+ VRAM, with the complete model file reaching approximately 500GB. Grok 2.5 was xAI's most advanced model before Grok 3 (February 2025) and Grok 4 (July 2025).

### Languages
- Any

### Notes
- 314B parameters with MoE: activates 2 of 8 experts per token
- 64 transformer layers, 48 query attention heads, 8 key/value heads
- Apache 2.0 license with restriction against training competing models
- Requires 8+ GPUs with 40GB+ VRAM; ~500GB model file
- Succeeded by Grok 3 (Feb 2025) and Grok 4 (July 2025)
- Open-source adopters report 51% ROI vs 41% for proprietary solutions
- Full source code available on Hugging Face

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- Apache 2.0 (with restriction on training competing models)

### Free Trial
- Yes
