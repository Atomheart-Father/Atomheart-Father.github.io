---
title: "Small Factual Updates in LLMs: LoRA-SFT / LoRA-DPO Evaluation Study"
slug: "small-factual-updates-lora-sft-dpo"
date: 2025-11-08
summary: "A completed experimental study of small factual updates in LLMs, comparing LoRA-SFT and LoRA-DPO across update insertion, hallucination-like side effects, Mean BS scores, and general capability retention."
status: "published"
type: "research_study"
featured: false
sortOrder: 60
tags: ["LLM evaluation", "LoRA", "SFT", "DPO", "factual updates", "capability retention", "knowledge editing"]
highlights:
  - "small factual updates"
  - "LoRA-SFT / LoRA-DPO"
  - "update-risk frontier"
  - "hallucination-like side effects"
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
<span class="signal">research study</span> <span class="signal">completed</span> <span class="signal">post-training</span>

> A small fact is small only at the surface. In a model, the update becomes a question of where the edit ends.

## 00 / Research problem

Many model-update discussions treat factual correction as a simple insertion problem: an old value is wrong, a new value is available, and the model should return the new value. This experiment starts from a narrower but harder premise. The edited fact is deliberately small: same subject, same relation, one changed object value, usually a number or date.

That narrowness is the point. It removes many excuses. If the task is only to replace one value, then the real research question becomes sharper:

<span class="reverse">Can lightweight post-training absorb a corrected value without scattering uncertainty into adjacent behavior?</span>

The study compares two LoRA-based post-training routes on that question. <mark>LoRA-SFT</mark> receives supervised examples that point directly to the updated value. <mark>LoRA-DPO</mark> receives preference pairs where the updated value is preferred over the stale value. Both methods share the same base model family, adapter mechanism, and checkpoint schedule. The difference under inspection is the training objective.

<figure class="study-figure">
	<img src="/journal/small-factual-updates-lora-sft-dpo/fig-01-evaluation-stack.svg" alt="Evaluation stack for small factual updates: targeted success, side-effect rate, and general capability retention." />
	<figcaption class="study-caption"><span>Figure 01</span><span>Evaluation is treated as a stack. A factual correction has to pass targeted insertion, side-effect, and general-retention checks before it can be read as a stable update.</span></figcaption>
</figure>

## 01 / Experimental design

The update cases are derived from WikiFactDiff-style ReplaceObject entries. Each case keeps the subject and relation fixed while replacing an old object value with a new one. The public version focuses on numeric and date-like replacements with bounded magnitude, because those cases make the output easy to falsify.

The model under study is `Qwen/Qwen2.5-3B-Instruct`. Both training routes use the same LoRA configuration: rank `16`, alpha `32`, dropout `0.05`, and target modules covering attention and MLP projection layers. Checkpoints are evaluated at steps `200 / 400 / 600 / 800 / 834`.

The training surface contains <u>13,326 examples per format</u>. SFT uses chat-style instruction-answer examples. DPO uses chosen/rejected preference pairs, with the updated value as the preferred answer and the stale value as the rejected answer. Targeted evaluation uses a held-out, relation-stratified set of <u>75 checks per checkpoint</u>.

This setup makes the comparison narrow on purpose. The adapter mechanism is held constant; the update objective changes.

<section class="argument-strip">
	<div class="argument-step">
		<span>01 / Insert</span>
		<p>Does the model move toward the new literal value?</p>
	</div>
	<div class="argument-step">
		<span>02 / Disturb</span>
		<p>Does the same move increase hallucination-like behavior?</p>
	</div>
	<div class="argument-step">
		<span>03 / Retain</span>
		<p>Does broader benchmark behavior stay near the base model?</p>
	</div>
</section>

## 02 / Evaluation logic

The experiment has one central rule: update success alone is insufficient. A method can move toward the updated value while also making the model more willing to produce unsupported or unstable answers. A method can also look weaker on targeted insertion while preserving broader behavior.

The targeted layer reports three values:

- **Update success**: the adapted output is judged closer to the updated value than the base model output.
- **Hallucination-like rate**: the adapted output is judged to increase hallucination-like behavior relative to the base output.
- **Mean BS**: the average side-effect severity score from the judge output.

The general layer then asks whether the update procedure perturbs broader model ability. It uses MMLU aggregate accuracy, HellaSwag normalized accuracy, and GSM8K flexible exact match, reported as percentage-point deltas against the base checkpoint.

The logical order matters. If the first metric improves while the second metric worsens, the update has become a risk frontier rather than a clean edit.

<section class="evidence-grid">
	<div class="evidence-cell">
		<span class="evidence-label">Training examples</span>
		<span class="evidence-value">13,326</span>
		<span class="evidence-note">per SFT / DPO format</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">Targeted checks</span>
		<span class="evidence-value">75</span>
		<span class="evidence-note">per checkpoint / relation-stratified</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">SFT peak update success</span>
		<span class="evidence-value">37.33%</span>
		<span class="evidence-note">step 400</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">DPO peak update success</span>
		<span class="evidence-value">22.67%</span>
		<span class="evidence-note">step 400</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">SFT final side-effect rate</span>
		<span class="evidence-value">46.67%</span>
		<span class="evidence-note">step 834</span>
	</div>
	<div class="evidence-cell">
		<span class="evidence-label">DPO best average retention delta</span>
		<span class="evidence-value">+1.39pp</span>
		<span class="evidence-note">step 800 / selected benchmarks</span>
	</div>
</section>

## 03 / Targeted result: the update-risk frontier

The targeted evaluation shows a clear split between the two objectives. SFT reaches higher update success, but it also moves into a higher side-effect region as training continues. DPO reaches lower update success, but its hallucination-like rate stays lower across all measured checkpoints.

<figure class="study-figure">
	<img src="/journal/small-factual-updates-lora-sft-dpo/fig-02-targeted-risk-frontier.svg" alt="Risk frontier chart comparing SFT and DPO update success against hallucination-like rate across checkpoints." />
	<figcaption class="study-caption"><span>Figure 02</span><span>SFT moves farther toward insertion but climbs upward on side-effect pressure. DPO stays in a lower-risk region while accepting weaker targeted insertion.</span></figcaption>
</figure>

| Step | N | SFT success | DPO success | SFT hallucination-like | DPO hallucination-like | SFT Mean BS | DPO Mean BS |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 200 | 75 | 28.00% | 14.67% | 29.33% | 17.33% | 0.587 | 0.373 |
| 400 | 75 | 37.33% | 22.67% | 32.00% | 21.33% | 0.627 | 0.453 |
| 600 | 75 | 26.67% | 17.33% | 44.00% | 18.67% | 0.733 | 0.413 |
| 800 | 75 | 28.00% | 12.00% | 44.00% | 18.67% | 0.733 | 0.453 |
| 834 | 75 | 33.33% | 12.00% | 46.67% | 22.67% | 0.800 | 0.533 |

The most important checkpoint is step 400. SFT reaches its peak targeted update success at <mark>37.33%</mark>; DPO also reaches its peak there, but at <mark>22.67%</mark>. The same checkpoint shows the cost of that difference: SFT's hallucination-like rate is <u>32.00%</u>, while DPO's is <u>21.33%</u>.

Later checkpoints sharpen the pattern. SFT's targeted success fluctuates while its hallucination-like rate rises to <mark>46.67%</mark> by step 834. DPO remains more conservative: lower insertion, lower side-effect pressure, lower Mean BS at every measured checkpoint.

## 04 / General result: retention is a second test

The targeted result would be easy to over-read without the general benchmark layer. A factual edit can appear successful inside the narrow update set while still deforming broader behavior. The selected general benchmarks therefore act as a retention check: MMLU for broad knowledge, HellaSwag for commonsense continuation, and GSM8K for arithmetic reasoning under flexible extraction.

<figure class="study-figure">
	<img src="/journal/small-factual-updates-lora-sft-dpo/fig-03-general-retention.svg" alt="General capability retention chart showing average benchmark delta for DPO and SFT across checkpoints." />
	<figcaption class="study-caption"><span>Figure 03</span><span>General benchmark movement is limited in magnitude, but it has method-specific shape. DPO peaks later on selected average delta, while SFT weakens at the final checkpoint.</span></figcaption>
</figure>

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

DPO reaches the best selected average benchmark delta at step 800: <mark>+1.39 pp</mark>, driven mainly by GSM8K while MMLU and HellaSwag remain close to base. SFT reaches its best selected average earlier at step 200: <mark>+0.77 pp</mark>. By step 834, SFT falls to <mark>-0.95 pp</mark>, mainly because HellaSwag remains down and GSM8K returns to base.

The general benchmark layer leaves the targeted result intact and changes what it means. SFT remains the stronger insertion operator. DPO remains the more conservative operator. The broader evaluation shows why those labels are incomplete without retention and side-effect measurement.

## 05 / What the experiment says

The cleanest reading is this:

<span class="reverse">SFT behaves like a stronger edit instrument.</span> It pushes harder toward the updated literal value. That makes it attractive if the only target is insertion. The cost appears in side-effect pressure: later SFT checkpoints show rising hallucination-like rate and rising Mean BS.

<span class="reverse">DPO behaves like a more conservative preference instrument.</span> It does less targeted insertion. It also stays lower on hallucination-like rate and Mean BS across the checkpoint series, and it reaches the strongest selected average retention score in the general benchmark layer.

The mechanism-level reading is that the two objectives apply different pressure to the same adapter surface. SFT trains direct completions and can make the corrected literal value easier to retrieve. DPO trains a contrast between preferred and rejected completions, which appears to regularize against aggressive overwrite but also undershoots exact insertion. The experiment therefore makes objective choice visible as a behavioral shape rather than a training detail.

The result is therefore a map of the update-risk frontier. The same intervention can be judged differently depending on whether the evaluator asks for literal correction, behavioral stability, or retention under broader tasks.

That is the governance relevance of the experiment. Factual updating is often described as maintenance. In practice, it is also an audit problem. A responsible update pipeline needs to say what changed, what remained stable, and what new failure surface appeared after the correction.

## 06 / Reproducibility boundary

The current study is strongest as a controlled comparison of objectives under a shared base model and adapter mechanism. Its targeted held-out set contains 75 relation-stratified checks per checkpoint. The judge layer uses strict JSON fields and deterministic identifiers, but judge dependence remains a methodological constraint.

The public artifacts preserve the code, dataset construction surface, training scripts, evaluation scripts, benchmark outputs, generated tables, and result summaries. The page above presents the research reading; the external repositories provide the inspectable material layer.

## 07 / Materials

- [GitHub repo](https://github.com/Atomheart-Father/LoRA-SFT-vs-LoRA-DPO-A-Comparative-Study-of-Small-Factual-Updates-in-LLMs) for code, data-processing scripts, training/evaluation scripts, generated result tables, and summaries.
- [Hugging Face artifacts](https://huggingface.co/Atomheart-Father/small_change_sft_dpo/tree/main) for the published artifact surface of the small-change SFT/DPO experiment.
