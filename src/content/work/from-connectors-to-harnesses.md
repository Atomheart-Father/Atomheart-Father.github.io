---
title: "From Connectors to Harnesses: Runtime Action Spaces, Forensic Readiness, and the Auditability of Agentic AI"
slug: "from-connectors-to-harnesses"
year: 2026
kind: "manuscript"
summary: "A conceptual mechanism study of agentic runtime architecture: how connectors, skills, harnesses, and observability shape available operations, execution paths, and the evidence available for later audit."
status: "published"
visibility: "public"
featured: true
sortOrder: 20
stage: "Zenodo preprint / August 2026"
access: "public_materials"
themes:
  - agentic AI
  - AI audit
  - forensic readiness
  - execution provenance
  - algorithmic supply chain
publicMaterials:
  - "Zenodo preprint / version 1.0"
  - "DOI: 10.5281/zenodo.22018604"
  - "17-page PDF / 19 August 2026"
questionnaire:
  status: "not_public"
  label: ""
  note: ""
links:
  - label: "Read on Zenodo"
    href: "https://zenodo.org/records/22018604"
    type: "external"
  - label: "DOI: 10.5281/zenodo.22018604"
    href: "https://doi.org/10.5281/zenodo.22018604"
    type: "external"
---

<span class="signal">public preprint</span> <span class="signal">agentic runtime</span> <span class="signal">forensic readiness</span>

> Consequential agentic action must remain reconstructable from the conditions that enabled it, through the trajectory that produced it, to the evidence through which it can be scrutinized.

## 00 / Runtime action

Agentic AI acts through runtime infrastructure rather than model output alone. A connector exposes operations against an external system. A skill packages reusable procedure, instructions, scripts, and resources. A harness coordinates these components with memory, permissions, credentials, environments, approval logic, orchestration, and event handling.

The paper reads these as nested layers of increasing integration: **connectors** add external affordance; **skills** make procedure reusable; **harnesses** coordinate sustained execution. The relevant object of audit is therefore the historical runtime that assembled the action.

## 01 / Audit index

The argument separates three states that are often flattened into one system description:

- **Operational action space**: the operations enabled by connectors, executable skills, permissions, credentials, approval rules, and environment.
- **Execution trajectory**: the path selected through that space under model-visible context, including instructions, retrieved material, tool descriptions, results, retries, and state.
- **Evidentiary record**: the trace that survives under instrumentation, transformation, export, integrity, and retention settings.

This separation identifies where a consequential change occurs. A new connector or broadened credential changes what can be attempted. A tool description or skill revision can redirect action through an unchanged space. A summary-only retention policy can leave the action unchanged while making later reconstruction impossible.

## 02 / Forensic readiness

Forensic readiness begins before an incident. It requires versioned runtime configuration, execution provenance, approval context, and evidence that can survive changes to the live system. Configuration history is not incidental metadata: it is part of the evidence needed to establish why an operation was available at a particular moment.

The practical unit is **minimum sufficient evidence**: enough retained material to test a contested account without turning the audit layer into unrestricted surveillance. That requires proportionate retention, protected access, and clear links from visible summaries back to recoverable events.

## 03 / Supply-chain evidence

One agentic action can cross a model provider, harness provider, skill source, connector server, repository host, CI runner, cloud account, external API, and deploying organization. The required evidence may be divided across all of them.

Accountability depends on more than whether logs exist. It depends on who controls retention, whether raw and summarized records remain connected, whether records can be exported, and whether decisive claims can be checked against independent observation. The paper calls attention to the resulting condition of **evidentiary dependence**: the acting stack is also the principal source of evidence used to assess its own conduct.

## 04 / Governance direction

The paper develops a reconstruction-oriented agenda for consequential agentic systems:

- preserve historical configuration identity alongside execution provenance;
- retain approval context where human review is relied upon;
- connect summaries and dashboards to the lower-level evidence that generated them;
- build independent corroboration points outside the immediately acting harness;
- establish retention, export, interoperability, and access duties across the supply chain.

The full preprint, citations, and versioned publication record are available through Zenodo.
