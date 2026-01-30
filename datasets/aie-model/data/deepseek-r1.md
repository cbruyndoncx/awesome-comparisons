# DeepSeek R1 - https://www.deepseek.com/

DeepSeek's open-source reasoning model matching OpenAI o1 performance. Released January 2025, achieving 90.8% on MMLU, 71.0% on AIME, and 71.5% on GPQA Diamond through novel reinforcement learning training without supervised fine-tuning.

## General Info

### Classification
- AIE/Model

### Version
- DeepSeek-R1 (January 2025)

### Repo
- https://github.com/deepseek-ai/DeepSeek-R1

### Rating
- MMLU: 90.8%
- AIME: 71.0%
- GPQA Diamond: 71.5%

### Short Description
- Open-source reasoning model using MoE architecture and reinforcement learning, matching OpenAI o1 on reasoning tasks with self-verification and chain-of-thought capabilities.

### Description
DeepSeek-R1 is an open-source reasoning model released January 2025 that achieves performance comparable to OpenAI's o1 on reasoning benchmarks. Built on the DeepSeek-V3 base model with a Mixture of Experts architecture, it uses a distinctive two-stage training approach combining supervised fine-tuning on Chain-of-Thought examples followed by iterative reinforcement learning phases. The RL framework encourages autonomous emergence of chain-of-thought reasoning, self-verification, and error correction. DeepSeek-R1-Zero, a precursor model, demonstrated that reasoning capabilities can develop purely through reinforcement learning without any supervised data. The model scores 90.8% on MMLU, 84.0% on MMLU-Pro, 71.5% on GPQA Diamond, and improved from 15.6% to 71.0% on AIME. Distilled variants built on Qwen and Llama base models are available for resource-constrained deployments.

### Languages
- Any

### Notes
- MoE architecture built on DeepSeek-V3 base model
- Two-stage training: supervised fine-tuning + reinforcement learning
- Self-evolving reasoning: RL produces chain-of-thought and self-verification autonomously
- Distilled variants available (e.g., R1-Distill-Qwen-7B scores 55.5% on AIME 2024)
- Strongest in coding, mathematics, and discrete reasoning tasks
- Full 22-page research paper published detailing training methodology
- Signaled China's growing influence in open-source LLM ecosystem

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
