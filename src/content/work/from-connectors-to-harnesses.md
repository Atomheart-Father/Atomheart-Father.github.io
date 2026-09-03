---
title: "From Connectors to Harnesses: Runtime Action Spaces, Forensic Readiness, and the Auditability of Agentic AI"
slug: "from-connectors-to-harnesses"
year: 2026
kind: "manuscript"
summary: "A study of how AI agents acquire real-world capability through connectors, skills, permissions, tools, and execution environments — and why auditing them requires reconstructing the runtime that made an action possible."
status: "published"
visibility: "public"
publishedAt: 2026-08-19
publicLabel: "Public preprint"
publicMeta: "2026 / Zenodo preprint / August 2026"
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

<span class="signal">public preprint</span> <span class="signal">agentic AI</span> <span class="signal">AI audit</span>

> The model is only one part of the system that acts. To understand what an AI agent could do — and what it actually did — we also need the runtime around it.

## 00 / The problem

AI governance still often starts with the model: which model was used, how it was evaluated, and what risks its provider disclosed.

That becomes incomplete once an AI system can **act**.

A model connected to a repository can read code. Give it write permissions and it can modify files. Add a skill and it can follow a specialized workflow. Place the same model inside a harness with credentials, memory, shell access, network access, approval rules, and external tools, and it can carry a task across multiple systems.

The underlying model may be unchanged while the system around it has become capable of something materially different.

This paper asks a simple question:

**What exactly has to be reconstructed when such a system performs a consequential action?**

## 01 / From connectors to harnesses

I use three nested layers to follow how operational capability is assembled.

**Connectors expose external operations.**  
They give a model access to tools, services, files, APIs, repositories, databases, or other systems.

**Skills package reusable ways of working.**  
Instructions, scripts, references, and resources can change how an agent approaches a task without changing the model itself.

**Harnesses coordinate sustained execution.**  
They combine tools and skills with orchestration, permissions, credentials, memory, execution environments, approval policies, retries, and event handling.

The point is not that every agent develops through these stages in this order. The progression isolates increasingly integrated parts of the runtime so that changes to capability can be located and audited.

## 02 / What changes when the runtime changes

The paper separates three questions that are easy to collapse into one:

**What actions were available?**  
This depends on the operational configuration: tools, executable skills, permissions, credentials, approval rules, and environment.

**Which path did the agent actually take?**  
This depends on the model, the available action space, and the context it saw while working — including instructions, retrieved material, tool descriptions, intermediate results, retries, and changing state.

**What evidence survived afterwards?**  
This depends on logging, event transformation, retention, integrity, exportability, and access.

These distinctions matter because different changes have different consequences.

A broader credential can make a new action possible.  
A modified skill can redirect behavior without adding a new permission.  
A summary-only logging policy can leave the action unchanged while making the path impossible to reconstruct later.

For audit, these are different failures.

## 03 / Why reconstruction matters

Consider a coding agent that damages a production database.

Knowing the model name is not enough to explain the event.

An investigation may need to recover:

- which environment the agent was operating in;
- which tools and skills were active;
- what permissions and credentials were available;
- what instructions and external information entered the task;
- which commands or API calls were executed;
- what the human reviewer actually approved;
- what low-level events were retained;
- and which external records can corroborate the platform's account.

This changes the role of **forensic readiness**.

For an agentic system, the relevant evidence begins before the incident. Historical runtime configuration is itself part of the evidentiary record because it establishes why an action was available in the first place.

The paper therefore treats audit as reconstruction of both **the conditions that enabled action** and **the trajectory through which action occurred**.

## 04 / Evidence is distributed too

Agentic execution rarely belongs to one technical component.

A single task can cross a model provider, agent platform, connector server, skill source, repository host, CI runner, cloud account, external API, and deploying organization.

The evidence needed to explain the task may be distributed across the same chain.

This creates a governance problem when the system responsible for acting is also the main source of the logs, summaries, dashboards, and traces used to evaluate what happened.

The important question becomes:

**Can a contested account be checked against evidence outside the acting stack?**

This is where execution provenance, forensic readiness, and the existing idea of the **algorithmic supply chain** meet. Accountability depends on retention and logging, but also on who controls those records, who can export them, who can demand access, and whether different sources can be reconciled.

## 05 / The governance direction

The paper develops a reconstruction-oriented approach to consequential agentic systems.

The goal is not maximal logging. Preserving every prompt, command, memory, credential, and user interaction would create its own privacy, security, and surveillance risks.

The target is **minimum sufficient evidence**: enough information to reconstruct and test a consequential action, retained proportionately and protected appropriately.

In practice, this points toward:

- versioned records of material runtime configuration;
- execution provenance linked to the configuration that enabled it;
- preserved context for consequential human approvals;
- links from summaries and dashboards back to recoverable events;
- independent corroboration outside the immediately acting harness;
- and clear retention, export, interoperability, and access responsibilities across the supply chain.

The broader argument is that increasingly capable agents do not only create a model-safety problem. They create an **auditability problem**: capability can be reconfigured quickly, while the evidence needed to understand that capability is slower and more expensive to preserve.

The full paper develops this argument through current agent architectures, security research, digital-forensics literature, execution-provenance work, and documented cases.

**Published as a public preprint on Zenodo, August 2026.**