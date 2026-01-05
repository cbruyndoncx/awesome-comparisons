# FauxPilot - https://github.com/fauxpilot/fauxpilot
[Open-source, locally-hosted code-completion server that provides a privacy-focused alternative to cloud-based assistants like GitHub Copilot.]

## General Info

### Classification
- AIE/Infrastructure

### Version
- -
  - No formal releases/tags (GitHub 'releases' list is empty; repository does not provide official release version numbers)

### Repo
- https://github.com/fauxpilot/fauxpilot

### Rating
- N/A

### Short Description
- Open-source, locally-hosted code-completion server providing a privacy-focused alternative to cloud-based assistants like GitHub Copilot.

### Description
FauxPilot is an open-source code-completion server designed to run on-premises or on private infrastructure so that source code and telemetry do not need to be sent to a third-party cloud service. It provides an OpenAI-compatible API surface and integrations that let editors and tools use it in place of cloud assistants. The project is focused on privacy, local deployment, and model flexibility: it supports running models (notably Salesforce CodeGen variants) inside NVIDIA's Triton Inference Server with the FasterTransformer backend and can split large models across multiple GPUs.

### Languages
- Any

### Notes
- Model support: commonly used with Salesforce CodeGen models converted for FasterTransformer / Triton; models are typically downloaded from Hugging Face and converted during setup.
- Hardware: requires an NVIDIA GPU (compute capability >= 6.0) and sufficient VRAM for the chosen model. VRAM can be aggregated across multiple GPUs for larger models.
- Installation: requires Docker, docker-compose (>= 1.28), nvidia-docker (nvidia-container-toolkit), curl and zstd for model download/extraction. A setup script helps choose and prepare a model.
- Integrations: offers OpenAI API compatibility, REST endpoints, and Copilot-plugin style integrations so it can be used with existing editor tooling.
- Privacy: primary selling point is that all inference can be run locally so developer code does not leave the network and no external telemetry is required.
- Support: community-driven project; documentation is community-maintained (wiki, discussion forum). There is no formal commercial support or warranty.
- Common pitfalls: accurate VRAM estimation is critical; ensure nvidia-docker and drivers are correctly installed and that the chosen model fits available GPU memory (or configure model sharding across GPUs).

### Last Update
- 2024-04-09
  - Last push timestamp: 2024-04-09T08:42:23Z (from GitHub API)

## Licensing

### Opensource
- Yes

### License
- MIT

### Free Trial
- N/A
  - Open-source software: freely available under MIT license, not a time-limited trial.
