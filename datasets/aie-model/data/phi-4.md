# Phi-4 - https://azure.microsoft.com/en-us/products/phi

Microsoft's 14B parameter small language model delivering competitive reasoning performance against models 5-50x its size. Scores 84.8% on MMLU and 80.4% on MATH, optimized for local deployment on consumer hardware.

## General Info

### Classification
- AIE/Model

### Version
- Phi-4 Reasoning Plus (2025)

### Repo
- https://huggingface.co/microsoft/phi-4

### Rating
- MMLU: 84.8%
- MATH: 80.4%
- GPQA: 56.1%

### Short Description
- Microsoft's 14B small language model excelling at mathematical reasoning and on-device deployment, competing with models many times its size through data quality optimization.

### Description
Phi-4 is Microsoft's 14-billion parameter small language model designed for high-performance reasoning while maintaining efficiency for local deployment on consumer hardware. The family includes Phi-4 Reasoning (14B), Phi-4-mini-instruct (3.8B with grouped-query attention and 200K vocabulary), Phi-4-multimodal (5.6B with unified text/image/audio input), and Phi-4 Reasoning Plus (enhanced via additional reinforcement learning). Trained on 9.8 trillion tokens from synthetic datasets, filtered web content, and academic materials using 1,920 H100-80G GPUs over 21 days. Phi-4 scores 84.8% on MMLU (surpassing GPT-4o-mini at 81.8%), 80.4% on MATH, 80.6% on MGSM, and 56.1% on GPQA. The model operates with a 16K token context length and runs efficiently on consumer laptops, edge devices, mobile processors, and Intel NPUs.

### Languages
- Any

### Notes
- 14B parameters competing with models 5-50x larger through data quality optimization
- Phi-4-mini (3.8B) runs on mobile and edge devices
- Phi-4-multimodal (5.6B) handles text, image, and audio inputs
- On-device deployment: no cloud connectivity required for inference
- Intel NPU acceleration support; 1,955 tokens/sec on Xeon 6 processors
- Knowledge cutoff: June 2024 and earlier
- Philosophy: data quality over model scale

### Last Update
- 2026-01-30

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- Yes
