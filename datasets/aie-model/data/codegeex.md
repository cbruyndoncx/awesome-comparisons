# CodeGeeX - https://github.com/THUDM/CodeGeeX
Open-source multilingual code generation model from Tsinghua University (THUDM).
## Classification
- AIE/Model

## Version

## Rating

## Languages
- Any
## Description
CodeGeeX is a large-scale multilingual code generation model and toolkit developed by THUDM. It was trained on a massive corpus covering source code and natural language across many programming languages to support code generation, translation (cross‑language), completion, summarization, and explanation. The project provides model checkpoints (for research use), inference scripts, and IDE integrations (for example, a VS Code extension).
## FreeTrial
- Yes
  - Model code is open-source; weights are available for academic research. Commercial use of weights typically requires registration/approval per THUDM's model license terms.
## Opensource
- Yes
## License
- Code: Apache-2.0
- Model weights: released for academic research; commercial use requires application/approval (see repository for details)
## Notes
- Trained at large scale (reported training on 850B+ tokens and large TPU/Ascend clusters in original publications) and evaluated with a multilingual HumanEval-X benchmark.
- Provides cross-language code translation and multilingual code generation capabilities; reported strong performance compared to contemporaneous open models.
- IDE integrations (VS Code, JetBrains) exist to make the model usable as a coding assistant; downstream usage may be subject to the model weights' licensing terms.
- For commercial deployment, review the repository's instructions and registration process for obtaining the model weights.
- See also: CodeGeeX2 (follow-up) and related THUDM releases which may have differing licenses or access requirements.
