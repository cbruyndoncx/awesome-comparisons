# Llama 4 - https://llama.meta.com/

Meta's open-weight natively multimodal AI models using Mixture-of-Experts architecture. Released April 2025, Llama 4 Scout (109B/17B active) and Maverick (400B/17B active) deliver frontier-level performance with industry-leading 10M token context length.

## General Info

### Classification
- AIE/Model

### Version
- Llama 4 Maverick 402B / Scout 109B (April 2025)

### Repo
- https://github.com/meta-llama/llama-models

### Rating
- SWE-bench Verified: Competitive with GPT-4o
- Aider Polyglot: N/A

### Short Description
- Meta's open-weight multimodal MoE models with 17B active parameters per token, supporting up to 10M token context and rivaling GPT-4 and Gemini 2.0 on coding, reasoning, and image tasks.

### Description
Llama 4 is Meta's fourth-generation open-weight large language model family, featuring two main variants: Scout (109B total parameters, 16 experts) and Maverick (400B total parameters, 128 experts), both activating only 17B parameters per token via Mixture-of-Experts. Scout supports an industry-leading 10 million token context window and can run on a single NVIDIA H100 GPU with Int4 quantization at roughly $0.09 per million tokens. Maverick is the flagship variant designed for demanding reasoning and specialized knowledge tasks. Both models are natively multimodal, processing text and image inputs through early fusion architecture, and were trained on 40 trillion tokens across 200 languages. They use interleaved attention layers with iRoPE for enhanced generalization across extended sequences.

### Languages
- Any

### Notes
- MoE architecture: 17B active parameters per token for both Scout and Maverick
- Scout fits on a single H100 GPU with Int4 quantization at ~$0.09/M tokens
- 10M token context window (Scout), 1M tokens (Maverick, extendable to 10M)
- Natively multimodal with early fusion for text and images
- Trained on 200 languages with fine-tuning for 12 specific languages
- Maverick matches or exceeds GPT-4 and Gemini 2.0 on many benchmarks

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- Llama 4 Community License

### Free Trial
- Yes
