# Codeium Enterprise - https://codeium.com/
Secure, enterprise-grade AI coding assistant with on-prem and air-gapped deployment options

## General Info

### Classification
- AIE/Agent

### Version
- Latest (January 2026)

### Repo
<!-- Associated Github repositories (public components) -->
- https://github.com/exafunction/codeium.el
- https://github.com/exafunction/codeium-react-code-editor
- Note: The core Codeium Enterprise server and model infrastructure are proprietary; no public GitHub repo for the full enterprise/server distribution is published by the vendor.

### Rating
- [4] Strong enterprise deployment options (air-gapped, self-hosted VPC)
- [4] Broad language & IDE support (70+ languages, major IDEs)
- [3] Proprietary product — some key compliance details (e.g. BYOK) require vendor confirmation

### Short Description
Commercial enterprise edition of Codeium providing SaaS, self-hosted VPC, and fully air-gapped on-prem deployments with enterprise security controls, audit logging, admin analytics, and private-code personalization.

### Description
Codeium Enterprise is the commercial, enterprise-oriented edition of Codeium that focuses on security, privacy, and deployment flexibility for organizations. It supports SaaS, self-hosted VPC, and fully air-gapped on-premises deployments, enabling customers to keep code and model inference inside their network perimeter while delivering AI-assisted code completion, multi-file editing, and contextual suggestions informed by private codebases.

### Languages
- Any

### Notes
- Deployments: Offers SaaS, self-hosted VPC, and fully air-gapped on-premises deployment models to meet strict data-sovereignty and compliance needs. Typical enterprise installations use containerized deployments (Helm/Kubernetes or Docker Compose) and can be run on infrastructure with GPU acceleration where required.
- Security: Enterprise features include end-to-end encryption, indexing access controls, audit logging, and administrative analytics. Air-gapped deployments ensure no code or telemetry leaves the customer environment.
- Platform & infra: Enterprise installs may require NVIDIA drivers and the NVIDIA Container Toolkit for GPU-accelerated deployments and access to enterprise container images (licensed by Codeium).
- Features: Personalization/finetuning on private codebases, subteam analytics, audit trails, priority enterprise support (dedicated Slack channels / support portal), and one-click installers for simplified deployment.
- Impact: Vendor materials and case studies report developer productivity gains (reduced PR cycle time, faster debugging and testing) when teams adopt the enterprise product.
- Gaps / vendor follow-up: Public-facing documentation does not clearly document Bring-Your-Own-Key (BYOK) key management options or the exact key management integration workflow. Organizations with strict KMS/BYOK requirements should request detailed security architecture and KMS integration docs from Codeium sales/enterprise support.

- 2025-2026 Update: Expanded model access to GPT-5.2, Claude Opus 4.5, and Cognition SWE-1.5 agent model alongside proprietary LLMs. Cascade agentic feature added with deep codebase understanding and auto-fix on linter failures. WWT enterprise testing showed 30-50% efficiency gains for repetitive tasks. Industry shifting toward private self-hosted and fine-tuned LLMs for enterprise. Pricing: Teams $30/user/mo, Enterprise $45/user/mo.

References & further reading
- https://codeium.com/
- https://codeium.com/enterprise (vendor enterprise overview)

### Last Update
- 2026-01-30

## Licensing

### Opensource
- No

### License
- Proprietary

### Free Trial
- Yes
