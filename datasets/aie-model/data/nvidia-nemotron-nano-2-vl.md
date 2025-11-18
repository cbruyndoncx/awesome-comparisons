# NVIDIA Nemotron Nano 2 VL - https://developer.nvidia.com/blog/develop-specialized-ai-agents-with-new-nvidia-nemotron-vision-rag-and-guardrail-models/

NVIDIA Nemotron Nano 2 VL is a 12B multimodal reasoning model that enables AI assistants to extract, interpret, and act on information across text, images, tables, and videos with improved accuracy and efficiency.

**Dataset ID:** aie-model

## General Info

### Classification
- AIE/Model

### Version
- V2 (October/November 2025)

### Repo
- https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16

### Rating
- OCRBench v2: Leading results
- Average across benchmarks: ~74 (MMMU, MathVista, AI2D, OCRBench, OCR-Reasoning, ChartQA, DocVQA, Video-MME)

### Short Description
12B-parameter multimodal vision-language model with hybrid Mamba-Transformer architecture, optimized for document understanding, video comprehension, and efficient reasoning tasks.

### Description
NVIDIA Nemotron Nano 2 VL is a 12-billion parameter multimodal reasoning model released in late October/early November 2025. The model features a hybrid Mamba-Transformer architecture delivering on-par accuracy with high token throughput and low latency for efficient large-scale reasoning across visual and text tasks.

Built on top of the Nemotron Nano V2 12B reasoning LLM and RADIOv2.5 vision encoder, the model introduces the Efficient Video Sampling (EVS) method that identifies and prunes temporally static patches in video sequences. EVS reduces token redundancy while preserving essential semantics, enabling the model to process longer clips and deliver results more swiftly—achieving up to 2.5x higher throughput without sacrificing accuracy.

The model was trained on the Nemotron VLM Dataset V2 with over 11 million high-quality samples, optimized for optical-character recognition, chart reasoning, and multimodal comprehension. With a context length of 49,152 tokens, it enhances capability for multi-image and video understanding.

Nemotron Nano 2 VL achieves leading results on OCRBench v2 and scores approximately 74 average across major benchmarks, surpassing prior open VL baselines. The model is available under a permissive NVIDIA open license with deployment supported across NeMo, NIM, and major inference runtimes including Hugging Face, Fireworks AI, Nebius AI Studio, and vLLM.

### Languages
- Any
  - Primarily focused on visual understanding tasks rather than code generation

### Notes
- Architecture: Hybrid Mamba-Transformer, 12B parameters
- Context Length: 49,152 tokens
- Efficient Video Sampling (EVS): Up to 2.5x throughput improvement
- Training Data: Nemotron VLM Dataset V2 (11M+ high-quality samples)
- Benchmarks: ~74 average (MMMU, MathVista, AI2D, OCRBench, OCR-Reasoning, ChartQA, DocVQA, Video-MME)
- Vision Encoder: RADIOv2.5
- Base LLM: Nemotron Nano V2 12B
- Specializations: OCR, chart reasoning, document understanding, video comprehension
- License: Permissive NVIDIA open license
- Deployment: NeMo, NIM, vLLM, Hugging Face, Fireworks AI, Nebius AI Studio
- Release: October/November 2025
- Developer: NVIDIA

### Last Update
- 2025-11-18

## Licensing

### Opensource
- Yes
  - Open-weights with permissive NVIDIA license

### License
- Proprietary
  - NVIDIA open license (permissive)

### FreeTrial
- Yes
  - Available for free under NVIDIA's open license
