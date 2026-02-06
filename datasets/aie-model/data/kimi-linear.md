# Kimi Linear - https://github.com/MoonshotAI/Kimi-Linear

Moonshot AI's efficient hybrid linear attention model released October 2025 with 48B total/3B active parameters, achieving 6x faster decoding at 1M token contexts and 75% KV cache reduction through innovative Kimi Delta Attention mechanism.

## General Info

### Classification
- AIE/Model

### Version
- 48B A3B Instruct (October 31 - November 1, 2025)

### Repo
- https://github.com/MoonshotAI/Kimi-Linear

### Rating
- RULER benchmark: 84.3 vs 81.3 for MLA baseline
- 6.3x speedup at 1M tokens (1.84ms vs 11.48ms per output token)
- 75% KV cache reduction
- Superior performance across short-context, long-context, and RL scaling regimes

### Short Description
- Efficient 48B/3B MoE model with hybrid linear attention achieving 6x faster decoding at 1M token contexts and 75% memory reduction through Kimi Delta Attention, outperforming full attention architectures.

### Description
Kimi Linear is a hybrid linear attention model released by Moonshot AI in October 2025 with 48 billion total parameters and 3 billion active parameters that achieves superior performance and efficiency compared to full attention architectures through its innovative Kimi Delta Attention mechanism. The model uses a layerwise hybrid structure that strategically combines Kimi Delta Attention (KDA) with Multi-Head Latent Attention (MLA) layers in a 3:1 ratio, balancing computational efficiency with global information processing capabilities. KDA extends the Gated DeltaNet framework with a finer-grained, channel-wise gating mechanism that allows independent control over memory decay rates across individual feature dimensions, using specialized Diagonal-Plus-Low-Rank (DPLR) transition matrices optimized through a bespoke chunkwise algorithm that delivers approximately 100% improvement in operator efficiency and nearly 2x kernel speedup for sequence lengths up to 64K. This eliminates three matrix multiplications per chunk while remaining consistent with the classical delta rule. Kimi Linear reduces KV cache requirements by up to 75% during inference, enabling processing of batches up to 4 times larger on the same GPU hardware or deployment on cheaper infrastructure. The model achieves up to 6x faster decoding throughput at 1 million token contexts compared to full MLA baselines—specifically 1.84 milliseconds per output token versus 11.48 milliseconds for the MLA baseline at precisely 1 million tokens, transforming ultra-long context processing from offline-only speeds to potentially interactive performance levels. Supporting a 1,048,576 token context window and released under MIT license, Kimi Linear demonstrates superior performance across short-context, long-context, and reinforcement learning scaling regimes, with particularly strong results on RULER benchmark (84.3 vs 81.3 for MLA baseline) and Repo QA tasks.

### Languages
- Any

### Notes
- Hybrid architecture: 3:1 ratio of Kimi Delta Attention to Multi-Head Latent Attention layers.
- Kimi Delta Attention: Finer-grained channel-wise gating for independent memory decay control.
- 100% operator efficiency: Specialized DPLR transition matrices with bespoke chunkwise algorithm.
- 2x kernel speedup: Nearly 2x faster for sequence lengths up to 64K tokens.
- 75% KV cache reduction: Enables 4x larger batches on same hardware or cheaper deployment.
- 6x faster decoding: At 1M token contexts vs full MLA baseline (1.84ms vs 11.48ms per token).
- 1M token context: Supports 1,048,576 token context window.
- Interactive ultra-long context: Transforms offline-only speeds to interactive performance.
- Superior benchmarks: Outperforms full MLA across all evaluation scenarios with identical training.
- RULER excellence: 84.3 vs 81.3 for MLA baseline on long-range retrieval tasks.
- Drop-in replacement: Functions as direct replacement for traditional full attention architectures.
- No positional encoding: MLA layers use no positional encoding; KDA handles implicit positioning.
- Eliminates matrix operations: Removes three matrix multiplications per chunk.
- 48B total / 3B active: Mixture of Experts architecture with efficient parameter usage.
- MIT licensed: Open-source with KDA kernel and vLLM implementations available.
- Pre-trained checkpoints: Both pre-trained and instruction-tuned models released.
- Code repository QA: Strong performance on finding information in large code repositories.
- RL scaling: Particularly effective for reinforcement learning with longer sequences.
- Cost-sensitive deployment: Optimized for hardware efficiency and cost reduction.
- Released October 31 - November 1, 2025 as efficiency-focused alternative to K2.
- Moonshot AI: From Alibaba-backed Beijing startup known for long-context innovations.

### Last Update
- 2026-02-06

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
