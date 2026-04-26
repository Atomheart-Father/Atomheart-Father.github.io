---
title: "Small Factual Updates in LLMs: A LoRA-SFT / LoRA-DPO Evaluation Study"
slug: "small-factual-updates-lora-sft-dpo"
date: 2025-11-08
summary: "A completed technical study of small factual updates in LLMs, comparing LoRA-SFT and LoRA-DPO across targeted update success, hallucination-like side effects, Mean BS scores, and general capability retention on MMLU, HellaSwag, and GSM8K."
status: "published"
type: "technical_note"
featured: false
sortOrder: 60
tags: ["LLM evaluation", "LoRA", "SFT", "DPO", "factual updates", "capability retention", "knowledge editing"]
highlights:
  - "small factual updates"
  - "LoRA-SFT / LoRA-DPO"
  - "hallucination-like side effects"
  - "Mean BS"
  - "MMLU / HellaSwag / GSM8K"
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
<span class="signal">technical study</span> <span class="signal">completed</span> <span class="signal">post-training</span>

> A factual update is also an evaluation boundary.

## 00 / Abstract

Large language models encode a snapshot of the world, while many facts remain time-sensitive. This project studies <mark>small factual updates</mark>: updates that preserve a subject and relation while replacing a single object value, usually a number or date.

The experiment compares two parameter-efficient post-training routes for this setting: <mark>LoRA-SFT</mark>, which directly trains the model to output the updated value, and <mark>LoRA-DPO</mark>, which trains preference pairs where the updated value is preferred over the stale value.

The study evaluates three things together: targeted update success, hallucination-like side effects, and general capability retention. The core result is a trade-off between update aggressiveness and behavioral stability. SFT achieves higher update success, while DPO produces lower side-effect rates and stronger average retention on the selected general benchmarks.

## 01 / Research question

The central question is:

<span class="reverse">Can lightweight post-training insert small numeric or date-like factual updates while preserving surrounding model behavior?</span>

This is a technical question with governance consequences. A model update protocol should be judged by more than whether the new value appears. It also needs an account of side effects, benchmark movement, logging, and reproducibility.

The project therefore treats factual updating as a combined problem of:

- update insertion
- hallucination-like spillover
- benchmark retention
- evaluation design
- auditability of the update process

## 02 / Data and task construction

The update cases are derived from WikiFactDiff-style ReplaceObject entries. Each case keeps the subject and relation fixed while replacing an old object value with a new object value.

The main experimental scope is intentionally literal: numeric and date-like replacements with bounded magnitude. This makes evaluation stricter. A model can sound fluent while still failing the actual update if it returns the old value, introduces multiple numbers, or produces an unparseable answer.

The training pack contains <u>13,326 examples per format</u>:

- SFT examples are chat-style instruction-answer pairs that ask for the up-to-date value.
- DPO examples are preference pairs where the chosen answer contains the updated value and the rejected answer contains the stale value.
- Targeted evaluation uses a relation-stratified held-out set with <u>75 checks per checkpoint</u>.

## 03 / Training protocol

Both methods use `Qwen/Qwen2.5-3B-Instruct` as the base model and share the same LoRA adapter configuration:

- rank `r = 16`
- `lora_alpha = 32`
- dropout `0.05`
- target modules: `q_proj`, `k_proj`, `v_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`
- checkpoints at steps `200 / 400 / 600 / 800 / 834`

The SFT run uses supervised next-token learning over rendered chat examples. The DPO run uses a frozen reference model and preference optimization with `beta = 0.1`.

Inference uses greedy decoding with a concise instruction to return a single value. This matters because the task is literal: extra prose, multiple candidate values, or unparseable outputs are part of the evaluation problem.

## 04 / Evaluation protocol

The evaluation has two layers.

First, the targeted factual update evaluation compares model outputs against the updated value and the base output. It reports:

- **update success**: fraction of held-out instances where the adapted method is judged closer to the updated value than the base model.
- **hallucination-like rate**: fraction judged to increase hallucination-like behavior relative to the base model.
- **Mean BS**: average side-effect severity score from the judge output.

Second, the general capability evaluation checks whether post-training damages broader model behavior. It uses:

- **MMLU** aggregate accuracy
- **HellaSwag** normalized accuracy
- **GSM8K** flexible exact match
- MMLU subcategory outputs retained in the generated result artifacts

## 05 / Headline results

<section class="evidence-grid">
	<div class="evidence-cell">
		<span class="evidence-label">SFT peak update success</span>
		<span class="evidence-value">37.33%</span>
		<span class="evidence-note">step 400 / N=75 targeted checks</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">DPO peak update success</span>
		<span class="evidence-value">22.67%</span>
		<span class="evidence-note">step 400 / N=75 targeted checks</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">Lowest DPO hallucination-like rate</span>
		<span class="evidence-value">17.33%</span>
		<span class="evidence-note">step 200 / targeted judge</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">SFT final hallucination-like rate</span>
		<span class="evidence-value">46.67%</span>
		<span class="evidence-note">step 834 / targeted judge</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">DPO best average benchmark delta</span>
		<span class="evidence-value">+1.39pp</span>
		<span class="evidence-note">step 800 / MMLU, HellaSwag, GSM8K</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">SFT best average benchmark delta</span>
		<span class="evidence-value">+0.77pp</span>
		<span class="evidence-note">step 200 / MMLU, HellaSwag, GSM8K</span>
	</div>
</section>

## 06 / Targeted update results

The targeted evaluation shows the central trade-off. SFT moves more strongly toward the new value, but its hallucination-like rate and Mean BS rise as training continues. DPO produces smaller update gains, while its hallucination-like rate stays lower across all measured checkpoints.

| Step | N | SFT success | DPO success | SFT hallucination-like | DPO hallucination-like | SFT Mean BS | DPO Mean BS |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 200 | 75 | 28.00% | 14.67% | 29.33% | 17.33% | 0.587 | 0.373 |
| 400 | 75 | 37.33% | 22.67% | 32.00% | 21.33% | 0.627 | 0.453 |
| 600 | 75 | 26.67% | 17.33% | 44.00% | 18.67% | 0.733 | 0.413 |
| 800 | 75 | 28.00% | 12.00% | 44.00% | 18.67% | 0.733 | 0.453 |
| 834 | 75 | 33.33% | 12.00% | 46.67% | 22.67% | 0.800 | 0.533 |

The result is asymmetrical. SFT can insert the update more aggressively, especially around step 400. DPO preserves more caution, which appears as lower update success but lower hallucination-like spillover. The comparison is therefore less about a single winner than about how objective choice changes the shape of the update-risk frontier.

## 07 / General capability results

General capability testing checks whether the targeted update process damages broader benchmark behavior. The selected aggregate benchmarks are MMLU, HellaSwag, and GSM8K. Scores are shown in percentage points; deltas are relative to the base checkpoint.

| Method | Step | MMLU | HellaSwag | GSM8K | dMMLU | dHellaSwag | dGSM8K | Avg delta |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Base | 0 | 66.6 +/- 0.6 | 68.0 +/- 4.7 | 67.0 | +0.0 | +0.0 | +0.0 | +0.00 |
| DPO | 200 | 66.4 +/- 0.6 | 65.0 +/- 4.8 | 70.0 | -0.2 | -3.0 | +3.0 | -0.06 |
| DPO | 400 | 66.5 +/- 0.6 | 67.0 +/- 4.7 | 69.0 | -0.1 | -1.0 | +2.0 | +0.29 |
| DPO | 600 | 66.7 +/- 0.6 | 68.0 +/- 4.7 | 69.0 | +0.1 | +0.0 | +2.0 | +0.71 |
| DPO | 800 | 66.8 +/- 0.6 | 68.0 +/- 4.7 | 71.0 | +0.2 | +0.0 | +4.0 | +1.39 |
| DPO | 834 | 66.7 +/- 0.6 | 68.0 +/- 4.7 | 70.0 | +0.1 | +0.0 | +3.0 | +1.04 |
| SFT | 200 | 66.9 +/- 0.6 | 67.0 +/- 4.7 | 70.0 | +0.3 | -1.0 | +3.0 | +0.77 |
| SFT | 400 | 66.5 +/- 0.6 | 67.0 +/- 4.7 | 69.0 | -0.1 | -1.0 | +2.0 | +0.31 |
| SFT | 600 | 66.6 +/- 0.6 | 67.0 +/- 4.7 | 68.0 | -0.0 | -1.0 | +1.0 | -0.01 |
| SFT | 800 | 66.6 +/- 0.6 | 65.0 +/- 4.8 | 70.0 | -0.0 | -3.0 | +3.0 | -0.01 |
| SFT | 834 | 66.7 +/- 0.6 | 65.0 +/- 4.8 | 67.0 | +0.1 | -3.0 | +0.0 | -0.95 |

The general benchmark layer shows limited broad capability damage across these runs. DPO reaches the strongest selected average delta at step 800, mostly driven by GSM8K flexible exact match while MMLU and HellaSwag stay close to base. SFT shows its best selected average delta earlier at step 200, then weakens by step 834 due mainly to HellaSwag and GSM8K movement.

## 08 / Interpretation

The study supports a three-part reading.

<span class="reverse">SFT is the more aggressive update operator.</span> It reaches the highest targeted success rate, but its side-effect indicators rise across later checkpoints. In this setting, direct supervision pushes the model toward the new literal value with a visible spillover cost.

<span class="reverse">DPO is the more conservative update operator.</span> It produces lower targeted update success, but its hallucination-like rate and Mean BS remain lower than SFT at every checkpoint. DPO also gives the best selected average general benchmark delta at step 800.

<span class="reverse">The evaluation boundary determines the conclusion.</span> If the only metric is update success, SFT looks stronger. If the metric set includes hallucination-like side effects and general capability retention, the result becomes a trade-off between edit strength and behavioral stability.

## 09 / Limitations and reproducibility

The study is strongest as a controlled comparison of objectives under a shared base model and adapter mechanism. Its current scope is small numeric/date object replacement, with a held-out targeted evaluation set of 75 items. The LLM judge uses strict JSON fields and deterministic identifiers, but judge dependence remains a methodological constraint.

The reproducibility layer includes deterministic eval identifiers, fixed sampling seed, matched LoRA configuration, generated aggregation tables, checkpoint-level benchmark JSON, and logged targeted outputs. The public repository and Hugging Face artifact page preserve the code and artifact surface for inspection.

## 10 / Materials

- `paper_out/update_eval_table.md` contains the targeted update success, hallucination-like rate, and Mean BS table.
- `paper_out/table_general_eval_main.md` contains the MMLU, HellaSwag, and GSM8K general capability table.
- `paper_out/general_eval_pp.csv` contains percentage-point deltas and selected benchmark averages.
- `eval/*/llm_eval_outputs_*.jsonl` contains targeted judge outputs by checkpoint.
- `results/*.json` contains lm-eval-harness outputs for the general capability runs.
