# CodeGeeX - https://github.com/THUDM/CodeGeeX
Open-source multilingual code generation model from Tsinghua University (THUDM).

## General Info

### Classification
- AIE/Model

### Version
- CodeGeeX4-ALL-9B (2025)

### Repo
- https://github.com/THUDM/CodeGeeX

### Rating
- 83.4% of users reported increased coding efficiency
- HumanEval-X: Multilingual code generation benchmark leader at release

### Short Description
- Multilingual large-scale code generation model (13B) from Tsinghua University (THUDM) for code generation, translation, completion, summarization, and IDE integration.

### Description
CodeGeeX is a large-scale multilingual code generation model and toolkit developed by THUDM. It was trained on a massive corpus covering source code and natural language across many programming languages to support code generation, translation (cross‑language), completion, summarization, and explanation. The project provides model checkpoints (for research use), inference scripts, and IDE integrations (for example, a VS Code extension).

### Languages
- Any

### Notes
- The original version, CodeGeeX v1 (13B parameters), was released in September 2022.
- Trained at large scale (reported training on 850B+ tokens and large TPU/Ascend clusters in original publications) and evaluated with a multilingual HumanEval-X benchmark.
- Provides cross-language code translation and multilingual code generation capabilities; reported strong performance compared to contemporaneous open models.
- IDE integrations (VS Code, JetBrains) exist to make the model usable as a coding assistant; downstream usage may be subject to the model weights' licensing terms.
- For commercial deployment, review the repository's instructions and registration process for obtaining the model weights.
- See also: CodeGeeX2 (follow-up) and related THUDM releases which may have differing licenses or access requirements.
- 2025-2026 Update: CodeGeeX4-ALL-9B released, built on GLM-4-9B architecture with 9B parameters (down from 13B). Supports code interpreter, web search integration, function calling, repository-level code Q&A, and long context up to 1,048,576 tokens. Available via Cloud Studio and OpenAI-compatible servers. INT8-quantized variants available for resource-constrained deployments. First fully open large-scale multilingual code generation model with public end-to-end pre-training recipes.

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- Code: Apache-2.0
- Model weights: released for academic research; commercial use requires application/approval (see repository for details)

### Free Trial
- Yes
  - Model code is open-source; weights are available for academic research. Commercial use of weights typically requires registration/approval per THUDM's model license terms.
