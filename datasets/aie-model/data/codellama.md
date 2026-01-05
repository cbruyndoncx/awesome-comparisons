# CodeLlama - https://ai.meta.com/blog/codegen-meta-code-llama/
Code Llama is Meta's open-source family of large language models optimized for code generation, completion, and reasoning about code.

## General Info

### Classification
- AIE/Model

### Version
v1 (2023-08)

### Repo
- https://github.com/meta-llama/codellama

### Rating
- [4] Strong open-source code generation model family with multiple sizes
- [3] Community ecosystem and tooling matured but still behind some proprietary offerings

### Short Description
Code Llama is Meta's open-source family of LLMs optimized for code generation, completion, and debugging. It provides multiple model sizes (7B, 13B, 34B, 70B) and specialized variants (Instruct, Python) for different coding tasks and deployment constraints.

### Description
Code Llama is Meta's open-source family of large language models optimized for code generation, completion, and reasoning about code. It ships in multiple sizes (7B, 13B, 34B and larger variants) and in specialized flavors such as Code Llama-Instruct (instruction-tuned) and Code Llama-Python (further fine-tuned on Python). The models use a decoder-only transformer architecture with optimizations tuned for code tasks and support fill-in-the-middle style completions and larger context windows than many older public models.

### Languages
- Any

### Notes
- Variants: Code Llama-Instruct (better at following natural-language prompts) and Code Llama-Python (additional Python fine-tuning).
- Sizes: commonly available in 7B, 13B, 34B; larger checkpoints and tuned variants exist depending on releases.
- Context window: the official models are released with substantially larger context windows (commonly 16k tokens for code-focused variants); deployment runtimes and custom forks may offer extended context support.
- Deployment: Widely available through Hugging Face, community containers, and local runtimes (Ollama, private inference servers).
- Strengths: open-source, good quality for code tasks, multiple sizes for trade-offs between latency and capability.
- Limitations: still requires careful prompt engineering for complex multi-file project reasoning; ecosystem tooling (IDE/product integrations) is smaller than some commercial competitors but growing quickly.

### Last Update
- Initial release: August 24, 2023
- 70B release: January 29, 2024


## Licensing

### Opensource
- Yes

### License
- Meta / Code Llama license (permits research and commercial use — see repository for exact terms)

### Free Trial
- N/A
  - Open-source model: weights freely available for download for research and commercial use under Meta's license terms, not a time-limited trial.
