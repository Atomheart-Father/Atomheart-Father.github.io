---
title: "When AI Becomes the First Pass: Source Selection, Conflict Retention, and Novel-Case Classification in AI-Mediated Interpretive Pipelines"
slug: "when-ai-becomes-the-first-pass"
year: 2026
kind: "manuscript"
summary: "An empirical study of what happens before an AI answer reaches the user: which sources survive selection, which disagreements remain visible, and whether materially new cases can escape existing classifications."
status: "published"
visibility: "public"
publishedAt: 2026-08-27
publicLabel: "Public preprint"
publicMeta: "2026 / Zenodo preprint / August 2026"
featured: true
sortOrder: 10
stage: "Zenodo preprint / August 2026"
access: "public_materials"
themes:
  - AI interpretation
  - retrieval and ranking
  - conflict retention
  - classification
  - auditability
publicMaterials:
  - "Zenodo preprint / version 1.0"
  - "DOI: 10.5281/zenodo.22129433"
  - "24-page PDF / 27 August 2026"
questionnaire:
  status: "not_public"
  label: ""
  note: ""
links:
  - label: "Read on Zenodo"
    href: "https://zenodo.org/records/22129433"
    type: "external"
  - label: "DOI: 10.5281/zenodo.22129433"
    href: "https://doi.org/10.5281/zenodo.22129433"
    type: "external"
---

<span class="signal">public preprint</span> <span class="signal">AI-mediated interpretation</span> <span class="signal">empirical pipeline study</span>

> An answer can be fully traceable to its sources and still give the user a narrower account than the evidence available to the system.

## 00 / The problem begins before the answer

Most evaluations of generative AI begin with the final output.

Was the answer factual?  
Did it cite a source?  
Did the model hallucinate?  
Was the recommendation biased?

Those questions matter, but they miss an earlier part of the process.

In retrieval-augmented systems, search assistants, and decision-support pipelines, the model often does not see the documentary field directly. A retrieval system first decides what is relevant. A ranking system decides what deserves priority. A limited set of sources is assembled into context. Only then does the model produce a summary, explanation, or recommendation.

By the time the user reads the answer, several interpretive decisions have already happened.

A competing source may never survive selection.  
A disagreement present in the evidence may disappear during synthesis.  
A materially new case may be acknowledged and still be assigned to an existing category.

This project studies those transitions.

The question is not simply whether an AI answer is wrong.

It is whether an AI-mediated **first pass** can make a contested documentary field look more settled than it was before the pipeline processed it.

---

## 01 / From source field to first-pass account

The study follows a deliberately simple pipeline:

**source field → retrieval → ranking → model-visible evidence → structured synthesis → category or action**

<figure class="study-figure">
  <img
    src="/journal/when-ai-becomes-the-first-pass/pipeline.png"
    alt="Diagram of the experimental pipeline from source field through retrieval, ranking, model-visible evidence, synthesis, and classification."
    loading="lazy"
  />
  <figcaption class="study-caption">
    <span>FIG. 01</span>
    <span>
      The auditable first-pass pipeline. Each stage is evaluated separately so that
      source availability, selection, synthesis, and classification are not collapsed
      into a single output measure.
    </span>
  </figcaption>
</figure>

Each stage changes the problem inherited by the next one.

<div class="argument-strip">
  <div class="argument-step">
    <span>01 / Selection</span>
    <p>
      Evidence can be available to the system without surviving retrieval,
      ranking, or context construction.
    </p>
  </div>

  <div class="argument-step">
    <span>02 / Synthesis</span>
    <p>
      Evidence can survive selection while the disagreement it contains
      disappears from the first-pass account.
    </p>
  </div>

  <div class="argument-step">
    <span>03 / Classification</span>
    <p>
      Disagreement can remain visible without changing the category or
      action route assigned to a materially new case.
    </p>
  </div>
</div>

That distinction became the central organising idea of the paper.

Rather than build a single score for whether a pipeline is “biased,” I measure different properties at the stage where they can actually fail:

- **source availability**
- **source selection and concentration**
- **conflict retention**
- **classification of materially new cases**
- **source attribution**

The point is to locate narrowing rather than observe only its final output.

---

## 02 / Why a controlled experiment comes first

Real documentary fields are difficult to use for causal diagnosis.

If a system repeatedly surfaces the same institutional account, several explanations are possible at once:

- the corpus may already contain more of it;
- the source may have greater institutional authority;
- the retriever may favour its language;
- the ranker may favour its position in the source ecology;
- or the synthesiser may prefer a cleaner, more familiar interpretation.

A real-world result alone cannot easily separate those explanations.

The study therefore begins with two controlled donor-derived corpora.

The original fictional source worlds are not analysed as cultural objects and their copyrighted text is not released. Instead, their structural properties are abstracted into de-identified experimental documents containing institutions, roles, authority cues, document genres, conflicts, exceptions, and relations.

For each donor-derived corpus, I also construct a **neutralised control** from the same broad document skeleton while weakening the subject-role-authority mappings and other institutional signals used in the experiment.

This comparison is only a manipulation check.

It does **not** show that one fictional world is inherently more ordered than another society or corpus.

Its purpose is narrower: verify that the experimental source structure can be changed deliberately before asking what retrieval, ranking, and synthesis do with that structure.

The main controlled corpus contains:

- 960 donor-derived documents;
- a 960-document neutralised control;
- 64 novelty documents;
- 36 queries.

A second donor provides a smaller robustness check with 240 donor-derived documents and 12 queries.

---

## 03 / The first transition: structure becomes exposure

Once the controlled source field is established, the next question is whether retrieval and ranking change what the model is likely to see.

They do.

In the main controlled corpus, adding the explicit ranking stage raises source-structure amplification by:

**+0.0047**

over centrality-aware retrieval.

The 95% paired bootstrap interval is:

**[0.0009, 0.0089]**

A second donor produces the same direction:

**+0.0049**

with a 95% interval of:

**[0.0005, 0.0101]**

The effect is intentionally interpreted narrowly.

The ranker explicitly uses relevance, institutional standing, agreement within the candidate set, and prior uptake. It is therefore not evidence that every real search system will behave the same way.

What it demonstrates is the mechanism:

> a source field with unequal institutional structure can be converted into unequal exposure by an explicit first-pass ranking system.

Ranking does not create the source ecology.

It decides which part of that ecology becomes the evidence for the next stage.

---

## 04 / A grounded answer can still lose the disagreement

The next transition is more important.

The structured summaries in the controlled experiment retain source identifiers for the evaluated claims. In the main baseline, every evaluated output tuple can be traced to supporting source material.

Yet the same outputs lose most of the conflict encoded in the selected source pack.

Baseline conflict loss is:

**0.9375**

This is why I stopped treating source attribution as a sufficient measure of interpretive quality.

A citation answers:

**Where did this retained claim come from?**

It does not answer:

**Which relevant claims disappeared?**

It does not tell us whether the source field contained unresolved disagreement.

And it does not tell us whether an alternative interpretation remained consequential in the final account.

A response can therefore be locally grounded while still being structurally incomplete.

That distinction is one of the central results of the project.

---

## 05 / Two interventions, two different mechanisms

The controlled experiments make it possible to intervene at different points in the pipeline.

The first intervention changes ranking.

It reduces the influence of institutional authority and penalises repeated concentration of the same source or institution.

This works on the property it was designed to change:

- institutional concentration decreases;
- source entropy increases;
- source-structure amplification decreases.

But classification of novel cases does not improve.

The second intervention leaves source selection unchanged and changes only synthesis.

The model is explicitly required to retain counterevidence, unresolved disagreement, lower-centrality evidence, and the difference between a new case and the existing frame.

This policy reduces conflict loss:

**0.9375 → 0.8125**

But it does not reliably relax the classification boundary in the controlled donor study.

The result is a useful negative one.

More diverse sources do not automatically produce a different classification.

Better conflict retention does not automatically produce a different classification either.

These are different properties of the pipeline.

---

## 06 / Moving into a real documentary domain

Controlled corpora provide attribution.

They do not tell us whether the same relationships appear in a recognisable public-document environment.

For that, I built a bounded automated-hiring anchor using dated United States materials.

The source registry contains 14 public source cards.

One side contains official or reference materials from organisations including:

- the U.S. Equal Employment Opportunity Commission;
- New York City authorities;
- Illinois legislation;
- NIST.

The other contains competing rights, labour, privacy, and audit perspectives from organisations including:

- the Center for Democracy & Technology;
- EPIC;
- the National Employment Law Project;
- AI Now Institute.

The experiment does not assume that one pool is correct and the other is wrong.

They have different institutional positions and emphasise different aspects of the same decision environment.

The question is procedural:

> when several relevant frames are available, which ones survive the AI-mediated first pass?

The rendered hiring experiment contains:

- 96 primary-derived documents;
- 64 competing-derived documents;
- 32 novelty documents;
- 32 balanced novelty queries.

The new cases cover four forms of novelty:

- new subjects;
- new relations;
- new styles of evidence;
- new events.

---

## 07 / The hiring anchor reveals where narrowing can happen

The free pipeline produces a very narrow result.

Across the 32 protocol-defined new cases:

<div class="evidence-grid">
  <div class="evidence-cell">
    <span class="evidence-label">Qwen / Reclassification</span>
    <span class="evidence-value">32 / 32</span>
    <span class="evidence-note">Protocol-defined new cases</span>
  </div>

  <div class="evidence-cell">
    <span class="evidence-label">Gemma / Reclassification</span>
    <span class="evidence-value">31 / 32</span>
    <span class="evidence-note">Protocol-defined new cases</span>
  </div>

  <div class="evidence-cell">
    <span class="evidence-label">External-source share</span>
    <span class="evidence-value">0</span>
    <span class="evidence-note">Final selected / cited evidence</span>
  </div>
</div>

But this baseline cannot tell us whether narrowing comes from source selection or synthesis.

So the experiment changes one stage at a time.

### Hold the sources fixed

The exact selected sources are kept unchanged.

Only the synthesis instruction changes.

Under the conflict-retention policy:

<div class="evidence-grid">
  <div class="evidence-cell">
    <span class="evidence-label">Qwen / Conflict loss</span>
    <span class="evidence-value">.83 → .46</span>
    <span class="evidence-note">Same sources / synthesis changed</span>
  </div>

  <div class="evidence-cell">
    <span class="evidence-label">Gemma / Conflict loss</span>
    <span class="evidence-value">.82 → .46</span>
    <span class="evidence-note">Same sources / synthesis changed</span>
  </div>

  <div class="evidence-cell">
    <span class="evidence-label">Reclassification</span>
    <span class="evidence-value">.53</span>
    <span class="evidence-note">Both model families</span>
  </div>
</div>

This isolates a synthesis-policy effect.

The model can produce a materially different first-pass account from the same evidence when it is required to keep disagreement consequential.

### Hold the summariser fixed

Next, the synthesis policy stays unchanged while official and competing materials enter the same candidate environment.

The competing materials still fail to survive into the final source set.

Final external-source share remains:

**0**

for both Qwen and Gemma.

This identifies an upstream narrowing process before synthesis.

The important distinction is therefore not simply:

**good source vs bad source**

or:

**biased model vs unbiased model**

It is:

**availability → selection → synthesis → classification**

and narrowing can occur at more than one transition.

<figure class="study-figure">
  <img
    src="/journal/when-ai-becomes-the-first-pass/hiring-mechanism-split.png"
    alt="Comparison of the free hiring pipeline and the fixed-source conflict-retention intervention."
    loading="lazy"
  />
  <figcaption class="study-caption">
    <span>FIG. 02</span>
    <span>
      Mechanism separation in the 32-query hiring anchor. Holding the selected
      evidence fixed while changing synthesis substantially reduces conflict loss
      and changes many novel-case classifications.
    </span>
  </figcaption>
</figure>

---

## 08 / Conflict retention and classification are not the same capability

The most interesting result appears when the controlled and hiring experiments are read together.

In both domains, the conflict-retention policy consistently preserves more disagreement.

But its effect on classification is domain-dependent.

In the hiring anchor, reclassification drops substantially.

In the controlled donor study, the same policy does not reliably relax category boundaries.

This means the intervention is not learning a universal “better” classification rule.

Its stable effect is more specific:

> it changes how much conflict survives synthesis.

Whether that surviving conflict is strong enough to alter classification depends on the evidence and task.

That distinction matters because many AI interventions are described using broad terms such as fairness, debiasing, diversity, or transparency.

The experiments here suggest a more useful approach:

evaluate an intervention against the stage it actually changes.

A ranking intervention should be judged on exposure.

A synthesis intervention should be judged on conflict retention.

A classification intervention must be tested on classification itself.

Improvement should not be assumed to transfer automatically between them.

---

## 09 / The pattern is more stable in the pipeline than in the prose

The main experiments use two open model families:

- Qwen3-4B-Thinking-2507;
- Gemma 3 4B IT.

They are not identical.

In the expanded controlled novelty test, Gemma preserves slightly more donor-only novelty than Qwen.

Their generated language also differs substantially.

Qwen tends to use more explicit institutional or authority-related language under the study's text-level measure, while Gemma is consistently lower.

But several source-based pipeline effects remain similar.

In particular:

- competing material disappears under the shared upstream selector;
- explicit conflict-retention instructions preserve more disagreement;
- surface tone can differ even when the same source-level narrowing has occurred.

That makes an important robustness point.

A softer-sounding answer is not necessarily a less concentrated interpretation.

The infrastructure producing the evidence set and the language used to describe that evidence are different layers.

Smaller fixed-subset checks with DeepSeek Chat and Gemini 2.5 Flash reproduce the same source-based direction, although they are supplementary checks rather than equal-scale replications of the Qwen/Gemma experiments.

A separate eight-query platform-document anchor provides a small domain-transfer check and shows the same directional pattern.

---

## 10 / A small human-reading check

I also ran a small anonymous Chinese-language reading study to ask whether some differences in model outputs were perceptible without exposing the experimental labels.

Seventeen respondents completed the study.

Because one archived source-mix condition did not survive the final implementation audit, the reported analysis retains 51 card-level judgements across nine cards.

The human study is deliberately not used as headline validation.

Agreement is low for questions about whether disagreement was fully explained and whether a secondary account materially affected the recommendation.

Only the perceived next-action question reaches the study's exploratory calibration range.

The useful observation is modest:

conflict-retention outputs are more often read as review-oriented, while several baseline outputs are more often read as continuing the ordinary process.

The module is therefore supporting evidence about how the outputs are perceived, not proof that the automatic metric suite captures human judgement in general.

---

## 11 / What the study actually shows

The project began with a concern about AI-generated answers.

It ended with a more specific conclusion about the pipeline producing them.

<mark>Source diversity, conflict retention, and classificatory revision are distinct properties of an AI-mediated interpretive pipeline.</mark>

A source can be available without being selected.

A source can be selected without its disagreement surviving synthesis.

A disagreement can survive synthesis without changing the final category.

And an answer can remain traceable to retained evidence while presenting a narrower account than the evidence available to the system.

This is why the paper argues for stage-by-stage evaluation.

Instead of asking only whether the final answer has a citation, an audit can ask:

1. **What evidence was available?**
2. **What survived retrieval and selection?**
3. **What was actually made visible to synthesis?**
4. **Which conflicts remained consequential?**
5. **Did a materially new distinction alter the final category or action route?**

Those questions do not determine which source or classification is normatively correct.

They make the interpretive process visible enough to audit.

---

## 12 / What I am not claiming

The study is intentionally bounded.

It does not show that every RAG system behaves this way.

It does not show that institutional or official sources are inherently wrong.

It does not show that competing or advocacy sources should always receive equal weight.

It does not establish that centralisation itself causes narrowing.

It does not prove that any specific social order is inevitably reproduced by generative AI.

The neutralised controls are internal experimental ablations, not representative external corpora.

The hiring anchor is a curated documentary environment, not a census of U.S. employment law or hiring practice.

The human-reading module is exploratory.

And the one-step feedback experiment does not provide evidence for an inevitable self-reinforcing loop.

The claim is narrower:

> under the tested retrieval-ranking-synthesis pipelines, narrowing can occur at multiple stages before the user encounters the final answer, and those stages need to be evaluated separately.

---

## 13 / Why this matters

As AI systems move from answering isolated prompts to mediating search, research, policy documents, technical documentation, and decision support, they increasingly determine the first account a user encounters.

That first account does not need to be false to matter.

It only needs to be easier to accept than reconstructing the documentary field underneath it.

The risk is therefore not limited to hallucination.

A system can cite its evidence, remain locally grounded, and still remove enough disagreement that a provisional interpretation begins to look complete.

For AI systems that increasingly sit between people and complex bodies of evidence, the quality of the answer is only part of the evaluation problem.

The path by which the answer became possible matters too.