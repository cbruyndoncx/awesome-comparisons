# CodeLlama - https://ai.meta.com/blog/codegen-meta-code-llama/
Code Llama is Meta's open-source family of large language models optimized for code generation, completion, and reasoning about code.
## Classification
- AIE/Model

## Version
v1 (2023-08)
## Rating
- [4] Strong open-source code generation model family with multiple sizes
- [3] Community ecosystem and tooling matured but still behind some proprietary offerings
## Languages
- Any
## Description
Code Llama is Meta's open-source family of large language models optimized for code generation, completion, and reasoning about code. It ships in multiple sizes (7B, 13B, 34B and larger variants) and in specialized flavors such as Code Llama-Instruct (instruction-tuned) and Code Llama-Python (further fine-tuned on Python). The models use a decoder-only transformer architecture with optimizations tuned for code tasks and support fill-in-the-middle style completions and larger context windows than many older public models.

## FreeTrial
- Yes
  - The models and weights are available for download (open-source) for research and commercial use under Meta's license terms.
## Opensource
- Yes

## License
- Meta / Code Llama license (permits research and commercial use — see repository for exact terms)

## Notes
- Variants: Code Llama-Instruct (better at following natural-language prompts) and Code Llama-Python (additional Python fine-tuning).
- Sizes: commonly available in 7B, 13B, 34B; larger checkpoints and tuned variants exist depending on releases.
- Context window: the official models are released with substantially larger context windows (commonly 16k tokens for code-focused variants); deployment runtimes and custom forks may offer extended context support.
- Deployment: Widely available through Hugging Face, community containers, and local runtimes (Ollama, private inference servers).
- Strengths: open-source, good quality for code tasks, multiple sizes for trade-offs between latency and capability.
- Limitations: still requires careful prompt engineering for complex multi-file project reasoning; ecosystem tooling (IDE/product integrations) is smaller than some commercial competitors but growing quickly.
