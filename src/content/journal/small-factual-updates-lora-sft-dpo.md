---
title: "Small Factual Updates in LLMs: LoRA-SFT / LoRA-DPO Evaluation Note"
slug: "small-factual-updates-lora-sft-dpo"
date: 2025-11-01
dateLabel: "November 2025"
summary: "A completed technical note on lightweight factual updates in LLMs: LoRA-SFT, LoRA-DPO, targeted factual checks, and the evaluation boundary between update success and side effects."
status: "published"
type: "technical_note"
featured: false
sortOrder: 60
tags: ["LLM evaluation", "LoRA", "SFT", "DPO", "factual updates", "post-training"]
highlights:
  - "small factual updates"
  - "targeted checks"
  - "update / side-effect trade-off"
  - "general benchmark retention"
  - "evaluation boundary"
relatedService: ""
links:
  - label: "GitHub repo"
    href: "https://github.com/Atomheart-Father/LoRA-SFT-vs-LoRA-DPO-A-Comparative-Study-of-Small-Factual-Updates-in-LLMs"
    type: "external"
  - label: "Hugging Face artifacts"
    href: "https://huggingface.co/Atomheart-Father/small_change_sft_dpo/tree/main"
    type: "external"
cover: ""
images: []
---
<span class="signal">technical note</span> <span class="signal">completed</span> <span class="signal">post-training</span>

> A factual update is also an evaluation problem.

## 00 / Question

Small factual updates look simple from the outside: a model should replace one stale value with a newer value while keeping the surrounding relation stable. A legal threshold changes, a date shifts, a numeric value is revised. The harder question is whether lightweight post-training can insert that change without spreading noise into nearby behavior.

This note records a bounded experiment on that question. The comparison is between <mark>LoRA-SFT</mark> and <mark>LoRA-DPO</mark> for numeric and date-like factual replacements.

## 01 / Setup

The experiment uses `Qwen/Qwen2.5-3B-Instruct` as the base model and builds update examples from WikiFactDiff-style ReplaceObject entries. The target cases preserve the subject and relation while replacing the object value.

The two training formats carry the same update intention through different objectives.

- **LoRA-SFT** trains the model to answer with the updated value.
- **LoRA-DPO** trains a preference pair where the updated value is preferred over the stale value.
- The held-out targeted check asks whether the adapted model moves closer to the updated value while controlling for side effects.

## 02 / Evidence

<section class="evidence-grid">
	<div class="evidence-cell">
		<span class="evidence-label">SFT peak update success</span>
		<span class="evidence-value">37.33%</span>
		<span class="evidence-note">step 400 / held-out targeted checks</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">DPO peak update success</span>
		<span class="evidence-value">22.67%</span>
		<span class="evidence-note">step 400 / held-out targeted checks</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">DPO best avg benchmark delta</span>
		<span class="evidence-value">+1.4pp</span>
		<span class="evidence-note">step 800 / MMLU, HellaSwag, GSM8K</span>
	</div>
</section>

The training pack contains <u>13,326 examples per format</u>. The targeted update evaluation uses <u>75 held-out checks per checkpoint</u>. General capability retention is checked with MMLU, HellaSwag, and GSM8K.

The core pattern is clear enough for a method note. SFT pushes harder toward the new literal values. DPO moves more cautiously and shows smaller side-effect rates in the targeted checks. General benchmark movement stays small across the tested checkpoints.

## 03 / Reading

The useful result is the shape of the trade-off.

<span class="reverse">SFT is more forceful.</span> It reaches higher targeted update success, but the side-effect rate grows as training continues.

<span class="reverse">DPO is more conservative.</span> It reaches lower targeted update success, but keeps targeted side effects lower in the measured runs and produces the best average delta across the selected general benchmarks.

The experiment connects technical update behavior to a larger governance question: a model update is never only a parameter change. It also depends on what counts as success, what counts as spillover, and where the evaluation boundary is drawn.

## 04 / Materials

The public materials include code, generated result tables, evaluation outputs, and model artifacts. The PDF draft remains source material for this note rather than a public attachment on the site.

- GitHub records the local code structure, training scripts, aggregation scripts, and generated paper outputs.
- Hugging Face records the published artifact surface for the small-change SFT/DPO experiment.
- The selected numbers above come from the local `paper_out`, `results`, and `eval` artifacts.
