# Amazon CodeWhisperer - https://aws.amazon.com/codewhisperer/
Amazon CodeWhisperer is AWS's ML-powered, in-IDE coding assistant that provides context-aware code completions, multi-line code generation, and security/license guidance. 
## Version
vN/A (integrated into Amazon Q Developer on 2024-04-30)
## Rating
- [4] Quality of context-aware suggestions (good for AWS workflows and common languages)
- [3] Security & license awareness (includes reference tracking and license surfacing, but still requires human review)
- [4] IDE and AWS service integration (deep integration with AWS tooling and popular IDEs)
## Repository
- https://aws.amazon.com/codewhisperer/ [service, no public repo]
## Languages
- Python
- JavaScript / TypeScript
- Java
- C#
- C++
## Extensible
- Yes
  - Via the AWS IDE Toolkit / IDE extensions and integrations
## Description
Amazon CodeWhisperer is AWS's ML-powered, in-IDE coding assistant that provides context-aware code completions, multi-line code generation, and security/license guidance. It analyzes project code, comments, and cursor position to suggest code tailored to the current context and common coding styles. CodeWhisperer emphasizes AWS developer workflows by offering snippets and helpers for AWS SDKs, Lambda, S3, EC2, and related services. In April 2024 CodeWhisperer was consolidated into the Amazon Q Developer platform, bringing its features (including security scans and reference tracking) under a unified AWS developer experience.
## BYOK
- No
## LocalOffline
- No
  - Any additional details: CodeWhisperer is a cloud service (runs on AWS infrastructure) and does not provide an official fully-local/offline model runtime for on-prem usage.
## FreeTrial
- Yes
  - AWS offered a free tier for individual developers when CodeWhisperer reached general availability; enterprise/pricing details are governed under Amazon Q Developer offerings.
## GitSupport
- Yes
  - Works with common developer workflows and IDEs; suggestions can be used in repos but developers must verify licensing/security before committing.
## Terminal
- No
  - Primary surface is IDE integrations (VS Code, JetBrains family, Cloud9, etc.).
## Opensource
- No
## License
- Proprietary (AWS service)
## MCPSupport
- No
## Notes
- Reference tracking & license surfacing: when generated code closely matches training examples, CodeWhisperer surfaces links and license information so developers can make informed reuse decisions.
- Security scanning: includes tooling to flag potential security issues in suggestions (now part of Amazon Q Developer's security features).
- Training data: built from a mix of public open-source code, public documentation and forums, and Amazon-internal sources.
- Best fit: teams using AWS services who want in-IDE productivity boosts and tight AWS integration.
- Limitations: no official local/offline model, and generated code still requires human review for security, correctness and licensing compliance.
- Related: functionality and pricing moved under Amazon Q Developer after 2024-04-30; check AWS docs for the most current platform features and enterprise plans.