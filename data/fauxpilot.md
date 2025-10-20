# FauxPilot - https://github.com/fauxpilot/fauxpilot
[Open-source, locally-hosted code-completion server that provides a privacy-focused alternative to cloud-based assistants like GitHub Copilot.]
## Version

## Rating
-

## Repository
- https://github.com/fauxpilot/fauxpilot

## Languages
- Any

## Extensible
- Yes

## Description
FauxPilot is an open-source code-completion server designed to run on-premises or on private infrastructure so that source code and telemetry do not need to be sent to a third-party cloud service. It provides an OpenAI-compatible API surface and integrations that let editors and tools use it in place of cloud assistants. The project is focused on privacy, local deployment, and model flexibility: it supports running models (notably Salesforce CodeGen variants) inside NVIDIA's Triton Inference Server with the FasterTransformer backend and can split large models across multiple GPUs.

## BYOK
- N/A

## LocalOffline
- Yes
  - Runs locally or on private servers using Docker / docker-compose and nvidia-docker for GPU acceleration. Supports multi-GPU model sharding so larger models can be run across several cards.

## FreeTrial
- Yes

## GitSupport
- N/A

## Terminal
- Yes
  - Server components are deployed and managed via Docker/docker-compose and expose REST/OpenAI-compatible APIs; setup and monitoring are typically done from the command line.

## Opensource
- Yes

## License
- MIT

## MCP-Client
- No

## Notes
- Model support: commonly used with Salesforce CodeGen models converted for FasterTransformer / Triton; models are typically downloaded from Hugging Face and converted during setup.
- Hardware: requires an NVIDIA GPU (compute capability >= 6.0) and sufficient VRAM for the chosen model. VRAM can be aggregated across multiple GPUs for larger models.
- Installation: requires Docker, docker-compose (>= 1.28), nvidia-docker (nvidia-container-toolkit), curl and zstd for model download/extraction. A setup script helps choose and prepare a model.
- Integrations: offers OpenAI API compatibility, REST endpoints, and Copilot-plugin style integrations so it can be used with existing editor tooling.
- Privacy: primary selling point is that all inference can be run locally so developer code does not leave the network and no external telemetry is required.
- Support: community-driven project; documentation is community-maintained (wiki, discussion forum). There is no formal commercial support or warranty.
- Common pitfalls: accurate VRAM estimation is critical; ensure nvidia-docker and drivers are correctly installed and that the chosen model fits available GPU memory (or configure model sharding across GPUs).
