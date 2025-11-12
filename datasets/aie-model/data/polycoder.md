# PolyCoder - https://github.com/VHellendoorn/Code-LMs
Open-source code generation model with strong C-language performance
## Classification
- AIE/Model

## Version
v2.7B (2022-03-01)
## Rating
- [4] Excellent open-source alternative for systems-level code (C/C++).
- [3] Not competitive with 2024/2025 largest commercial models on all-language benchmarks.
## Repository
- https://github.com/VHellendoorn/Code-LMs
## Languages
- C/C++
- Python
- JavaScript
- Java
- Go
- PHP
- Ruby
- C#
- Other
  - 12 in total
## Extensible
- Yes
## Description
PolyCoder is an open-source autoregressive code model developed by researchers at Carnegie Mellon University. Built on a GPT-2 style decoder-only transformer, PolyCoder was trained on approximately 249GB of GitHub-sourced code across a dozen languages and published in early 2022. The project ships model checkpoints, preprocessing scripts, tokenizer configs and evaluation notebooks under a permissive MIT license, enabling reproducible research, self-hosting, and fine-tuning.

PolyCoder was released in multiple sizes (160M, 405M and 2.7B parameters). The 2.7B model was notable for outperforming contemporaneous models on C code generation benchmarks in the original paper, making it particularly well-suited for systems and embedded programming tasks where correctness and low-level API usage matter.
## BYOK
- No
## LocalOffline
- Yes
  - PolyCoder can be run locally/self-hosted via the Hugging Face transformers ecosystem. Community quantized builds (GGUF/llama.cpp, WebUI) exist to reduce memory requirements for consumer GPUs.
## FreeTrial

## GitSupport

## Terminal

## Opensource
- Yes
## License
- MIT
## MCP-Client
- No
## Notes
- Trained on ~249GB of code; primary claim-to-fame is strong C-code performance compared to models available in 2022.
- Comes in three sizes (160M, 405M, 2.7B) so teams can choose a footprint that matches hardware constraints.
- Checkpoints and training/evaluation scripts were published to enable reproducible research; model files were also archived on Zenodo and mirrored to Hugging Face by community contributors.
- Requires modern Transformers (4.23+) for out-of-the-box loading; community adapters support LoRA/QLoRA fine-tuning and GGUF quantized deployments.
- Good choice for on-premise, privacy-sensitive deployments (no external API calls required).
- Keep expectations realistic: PolyCoder is a 2022-era model and does not match the capabilities of later multi-hundred-billion-parameter code-specialized models, though it remains valuable for C/C++ and systems-level use-cases.
