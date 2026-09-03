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

## 00 / The problem begins after the model

AI governance still often starts with the model.

Which model was used?  
How was it evaluated?  
What risks did its provider disclose?  
What did the model output?

Those questions become incomplete once an AI system can **act**.

A model connected to a repository may be able to read code. Give the same system write permission and it can modify files. Add a skill and it can follow a reusable workflow. Place it inside a harness with credentials, memory, shell access, network access, approval rules, and external tools, and it can carry a task across multiple systems.

The underlying model may remain unchanged while the operational system around it becomes capable of something materially different.

That creates a different audit question:

<span class="reverse">What has to be reconstructed when an AI system performs a consequential action?</span>

The answer cannot be recovered from the model name alone.

---

## 01 / From connectors to harnesses

The paper follows three nested layers through which operational capability becomes increasingly integrated.

<div class="argument-strip">
  <div class="argument-step">
    <span>01 / Connector</span>
    <p>
      External operations become available through tools, APIs, repositories,
      databases, files, and other connected systems.
    </p>
  </div>

  <div class="argument-step">
    <span>02 / Skill</span>
    <p>
      Instructions, scripts, references, and resources package reusable ways
      of carrying out a task.
    </p>
  </div>

  <div class="argument-step">
    <span>03 / Harness</span>
    <p>
      Tools and procedures are coordinated with permissions, credentials,
      state, orchestration, execution environments, and approval logic.
    </p>
  </div>
</div>

These are analytical layers, not a universal history of how every agent is built.

The progression matters because each layer adds something that may change what the operational system can actually do.

A connector can expose a new external operation.

A skill can redirect how an existing operation is used.

A harness can coordinate those operations across time, state, authority, and multiple systems.

<figure class="study-figure">
  <img
    src="/work/from-connectors-to-harnesses/runtime-audit-model.png"
    alt="Analytical progression from connectors, skills, and harnesses to action-enabling configuration, model-visible context, execution trajectory, surviving evidence, and forensic reconstruction."
    loading="lazy"
  />
  <figcaption class="study-caption">
    <span>FIG. 01</span>
    <span>
      The paper separates runtime capability, action selection, execution, and
      surviving evidence. Auditing a consequential agentic action therefore
      requires recovering both the conditions that enabled it and the trajectory
      through which it occurred.
    </span>
  </figcaption>
</figure>

---

## 02 / Three different questions hide inside one “agent”

Descriptions of an AI system often flatten several different states into a single account of what the agent can do.

For audit, they have to be separated.

<div class="argument-strip">
  <div class="argument-step">
    <span>01 / Available</span>
    <p>
      What operations were technically available under the active tools,
      skills, permissions, credentials, approval rules, and environment?
    </p>
  </div>

  <div class="argument-step">
    <span>02 / Executed</span>
    <p>
      Which trajectory did the system actually take under the context,
      intermediate results, retries, routing, and state it encountered?
    </p>
  </div>

  <div class="argument-step">
    <span>03 / Recorded</span>
    <p>
      Which parts of that trajectory survived logging, event transformation,
      retention, export, integrity, and access controls?
    </p>
  </div>
</div>

The distinction changes how runtime changes should be interpreted.

A broader credential can make a previously unavailable operation possible.

A modified tool description or skill can redirect behaviour while permissions remain unchanged.

A summary-only logging policy can leave the action itself unchanged while destroying the evidence needed to reconstruct it later.

<span class="reverse">Capability, execution, and evidence can change independently.</span>

That is why a current system snapshot is not enough to explain a historical action.

---

## 03 / Why reconstruction matters

Consider a coding agent that damages a production database.

Knowing which model generated the commands tells us very little by itself.

An investigation may need to recover:

- which environment the agent was operating in;
- which connectors, tools, and skills were active;
- what permissions and credential scopes were available;
- what instructions and retrieved information entered the task;
- which commands or API calls were executed;
- what retries, routing, or intermediate state changed the path;
- what a human reviewer actually saw and approved;
- what low-level events were retained;
- and which external records can independently corroborate the platform's account.

The important evidence therefore begins **before** the damaging command.

Historical runtime configuration establishes why an operation was available in the first place. Execution provenance establishes how the system moved from that available operation to the action that actually occurred.

This shifts the role of forensic readiness.

<span class="reverse">For an agentic system, runtime history is itself evidentiary material.</span>

The audit object is no longer only the output or final action. It is the historical configuration, the executed trajectory, and the surviving record connecting the two.

---

## 04 / The evidence follows a supply chain

Agentic execution rarely belongs to one technical component or one organisation.

A single task can cross:

**model provider → agent platform → skill source → connector server → repository → CI runner → cloud account → external API → deploying organisation**

The records needed to explain that task may be divided across the same chain.

One party may retain model events.

Another may hold connector logs.

A cloud provider may hold network or resource records.

The deploying organisation may hold approval context.

A repository or external API may provide the only independent evidence that a disputed operation actually occurred.

The governance problem therefore goes beyond whether logs exist.

It includes:

**who retains them → who can export them → who can demand access → which records can be reconciled → which claims can be independently tested**

When the acting stack is also the principal source of the evidence used to assess its own conduct, audit becomes dependent on that stack's recordkeeping choices.

This is where forensic readiness meets the existing idea of the **algorithmic supply chain**.

---

## 05 / Human oversight also depends on the record

Human oversight is often represented by the presence of an approval step.

But an approval button alone says little about whether oversight was meaningful.

A reviewer needs enough information to understand the action being authorised and enough authority to stop, redirect, or escalate it.

That means oversight depends on the same runtime and evidentiary architecture as later audit.

If the interface hides credential scope, compresses an action sequence into a summary, omits earlier retries, or presents an automatically generated interpretation of what is about to happen, the human may technically remain “in the loop” while possessing very limited epistemic access to the actual operation.

<span class="reverse">Human presence acquires governance value through information and intervention power.</span>

For long-running agents, this also makes organisational conditions relevant: expertise, workload, escalation routes, authority, and incentives affect whether a nominal reviewer can intervene in practice.

---

## 06 / The governance direction

The paper develops a reconstruction-oriented approach to consequential agentic systems.

The answer is not to preserve everything.

Keeping every prompt, memory, command, credential, network event, and user interaction indefinitely would create a new surveillance and security problem.

The target is **minimum sufficient evidence**: enough retained material to reconstruct and test a consequential action, with retention and access proportionate to the risk.

In practice, this points toward:

- historical identities for materially different runtime configurations;
- execution provenance linked to the configuration that enabled the action;
- preserved context for consequential human approvals;
- links from dashboards and summaries back to recoverable lower-level events;
- independent corroboration outside the immediately acting harness;
- separation and protection of sensitive material;
- and clear retention, export, interoperability, and access responsibilities across the supply chain.

The broader problem is one of timing.

Agent capability can be changed quickly through connectors, permissions, skills, credentials, and orchestration rules.

The infrastructure needed to preserve, reconcile, and govern evidence usually changes more slowly.

<span class="reverse">Agentic AI therefore creates an auditability problem as much as a model-safety problem.</span>

The full preprint develops this argument through contemporary agent architectures, security studies, digital-forensics research, execution-provenance work, accountability scholarship, and documented operational cases.

**Published as a public preprint on Zenodo, August 2026.**