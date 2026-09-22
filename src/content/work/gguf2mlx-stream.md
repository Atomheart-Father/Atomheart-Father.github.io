---
title: "gguf2mlx-stream: Bounded-Memory GGUF to MLX Checkpoint Transcoding"
slug: "gguf2mlx-stream"
year: 2026
kind: "tool"
summary: "Convert GGUF models to native MLX without ever expanding the full model to FP16. A declarative, bounded-memory transcoder for llama.cpp GGUF → standard MLX-LM checkpoints on Apple Silicon."
status: "published"
visibility: "public"
publishedAt: 2026-09-21
publicLabel: "Alpha release"
publicMeta: "2026 / v0.1.0a1 · Alpha / MIT"
featured: true
sortOrder: 10
stage: "v0.1.0a1 · MIT"
access: "public_materials"
themes:
  - LLM systems
  - quantization
  - Apple Silicon
  - MLX
  - bounded memory
publicMaterials:
  - "GitHub repository / source, configs, docs"
  - "Five built-in architecture configs: qwen3_5, qwen35moe, qwen3, llama, gemma3"
  - "Integration matrix: 8/8 real-GGUF conversions PASS"
  - "Nyx-RP-9B case study: 9.2B Q4_K_M to MLX 4-bit, peak RSS 9.56 GiB"
questionnaire:
  status: "not_public"
  label: ""
  note: ""
links:
  - label: "Source on GitHub"
    href: "https://github.com/Atomheart-Father/gguf2mlx-stream"
    type: "external"
---

<span class="signal">public release</span> <span class="signal">gguf2mlx-stream</span> <span class="signal">bounded memory</span>

> A converter that needs the whole model in memory fails exactly on the machines people actually own.

## 00 / The intermediate copy is the problem

Converting a llama.cpp GGUF model into an MLX-LM checkpoint has an obvious naive path: load the GGUF, dequantize it to FP16/BF16, quantize the result with MLX, write the output. That path requires the source bytes, a full-precision copy, and the quantized output to coexist in memory at the same time.

For a 9B model on a 24 GB Apple Silicon machine, the weights alone are roughly 18 GiB before the output is written. The result is swap, and usually an out-of-memory kill. The failure is not in the quantization arithmetic; it is in the <u>intermediate full-precision checkpoint that never needed to exist</u>.

`gguf2mlx-stream` is a declarative, bounded-memory transcoder built around one rule: **never materialize the complete FP16/BF16 checkpoint**.

## 01 / Tensor-bounded streaming

"Streaming" here means bounded-memory *tensor* streaming, not token-level streaming. Per tensor — or per row-chunk of a tensor too large to hold — the pipeline does:

- mmap the quantized GGUF tensor
- dequantize in bounded chunks (float32)
- apply a declarative transform pipeline
- quantize with MLX affine quantization (packed uint32 + f16 scales/biases)
- write to a safetensors shard, flushing at a size limit
- release

Memory stays bounded by the largest single tensor plus the current shard buffer (~4 GiB default). Huge vocab-embedding jobs are processed in 512 MiB float32 row chunks. The output contract is `mlx_lm.load(path)` — a standard MLX-LM checkpoint directory. Conversion is transactional: a failed run never replaces an existing output.

The target bit width defaults to `--bits auto`: the MLX target magnitude matches the source GGUF's byte-dominant quant family (Q4 → 4, Q6 → 6, and so on), and an explicit `--bits` always wins. Auto-derived 3-bit targets convert normally but print a fidelity warning; the evidence behind it is in §03.

## 02 / Architecture mappings as data

The drift between llama.cpp GGUF conventions and MLX-LM expectations is not handled where you might expect. **The conversion engine contains no model-family branches**; architecture differences live in validated YAML mappings and reusable tensor operators. What looks like "a converter that supports five architectures" is closer to a small weight-transformation compiler:

| config | family | notable mappings |
|---|---|---|
| `qwen3_5` | Qwen3.5 hybrid | GDN + full attention; grouped v-head reorder for any heads/kv-heads ratio 1–4; NextN/MTP block removal; `A_log = log(−unpermute(ssm_a))`; conv1d `(dim,k) → (dim,k,1)` |
| `qwen35moe` | Qwen3.5 MoE hybrid | everything from `qwen3_5` plus 256-expert sparse MoE; N-D (3-D expert) quantization with chunk-safe row streaming; config-declared per-rule bits/group-size overrides, holding the router and shared-expert gates at 8 bits |
| `qwen3` | Qwen3 dense | tied-embedding awareness derived from `output.weight` presence; q/k-norm pass-through |
| `llama` | Llama | undoes the llama.cpp q/k out-axis storage permutation; drops the derived `rope_freqs.weight` buffer |
| `gemma3` | Gemma 3 text | subtracts the llama.cpp-baked `+1` from RMSNorm weights (mlx-lm re-adds 1.0 at runtime) |

A dry-run mode prints the full conversion plan — every job, drop, and estimate — before any weight moves. With no config specified, the mapping is auto-detected from the GGUF's `general.architecture` when exactly one built-in config accepts it.

## 03 / Verification and measured results

`verify` recomputes every quantized tensor from the source and compares it against the output: shapes, finiteness, index/shard parity, and the recorded quantization parameters.

Release validation ran the full pipeline — convert → structural checks → verify → `mlx_lm.load` → chat generation (temp 0) → llama.cpp source comparison — for **8 real-GGUF conversions (4 families × Q4_K_M + Q6_K), all PASS**. Every converted output was discovered by an isolated oMLX server with working `/v1/chat/completions`.

Measured on Apple M4 Pro (24 GB unified memory), mlx-lm 0.31.3:

| model | quant | source GiB | output GiB | peak RSS GiB | convert s |
|---|---|---|---|---|---|
| Qwen3.5-0.8B (hybrid) | Q4_K_M | 0.50 | 0.40 | 4.22 | 90.4 |
| Qwen3.5-0.8B (hybrid) | Q6_K | 0.60 | 0.57 | 4.45 | 92.8 |
| Qwen3-0.6B | Q4_K_M | 0.37 | 0.31 | 3.40 | 55.2 |
| Qwen3-0.6B | Q6_K | 0.46 | 0.45 | 3.48 | 54.3 |
| Llama-3.2-1B | Q4_K_M | 0.75 | 0.65 | 4.20 | 34.6 |
| Llama-3.2-1B | Q6_K | 0.95 | 0.94 | 4.29 | 35.4 |
| Gemma-3-270M | Q4_K_M | 0.24 | 0.14 | 3.49 | 56.4 |
| Gemma-3-270M | Q6_K | 0.26 | 0.20 | 3.54 | 56.5 |

Peak RSS includes the mmap'd source page cache, which the OS can evict; it is not live memory. Numbers come from the converter's own statistics and are reproducible via the integration matrix scripts in the repository.

Since the v0.1.0a1 tag, `main` has added the case §00 argued about at full scale: Nyx-RP-9B-Instruct (9.2B, Qwen3.5 hybrid GDN), converted from its official Q4_K_M GGUF with `--bits auto` to MLX affine 4-bit. <u>Peak RSS 9.56 GiB</u> on the same M4 Pro — against the ~18 GiB full-precision intermediate §00 ruled out. Conversion took 149 s into 4.69 GiB across 2 shards; verify returned ALL OK across 427 tensors.

A 45-question capability evaluation against the llama.cpp source (identical protocol, temp 0, strict anomaly gating) scored **70.0% source vs 60.0% MLX**, with 90% verdict agreement and 31.2 vs 31.8 tok/s. The −10 pp is anomaly-gating at the shared 1536-token thinking budget, not knowledge loss: all four remaining flips are MLX-side truncation or repetition-loop blocks on answers whose content was actually correct.

The unquantized path is proven exact, separately from the quantized one. Converting the same pinned BF16 GGUF the official MLX exports were built from matches every reference tensor — **320/320 for Qwen3.5-0.8B, 146/146 bit-equal for Llama-3.2-1B** — covering the mappings, the GDN v-head reorder, and the config semantics before quantization is involved. At matched settings, the converter's MLX quantization also reproduces mlx-lm's own requantization error profile to 4+ significant digits; the residual fidelity question belongs to the quantization grid, not the conversion.

The grid has a measured edge: paired-oracle calibration on Qwen3.5-0.8B found a **3-bit cliff**. Uniform 3-bit costs +1.007 nats/token over the BF16 reference against +0.213 for uniform 4-bit, and no mixed 3/4 or 3/6 profile recovered the gap — hence the recommendation of 4-bit or higher, and the fidelity warning printed on auto-derived 3-bit targets, which now states the observed capability-gate cost: ARC clean accuracy 48% → 29–31% on the 1B calibration, 90% → 55% on Qwen3.6-35B-A3B — whose IQ3_M → 3-bit auto conversion (14.14 GiB / 4 shards, verify ALL OK) failed that gate.

## 04 / Scope and boundaries

The tool is deliberately narrow:

- GGUF → MLX only; there is no reverse direction yet.
- Text-only by design; vision towers in multimodal exports are out of scope.
- Tokenizer assets are currently supplied separately; rebuilding tokenizer files directly from GGUF metadata is not yet supported.
- Not yet on PyPI — install from the GitHub repository. Apple Silicon is the primary target; Linux runs through the CPU mlx wheel (`mlx[cpu]`) and is covered in CI.

## References

- Source and documentation: [Atomheart-Father/gguf2mlx-stream](https://github.com/Atomheart-Father/gguf2mlx-stream)
- `CHANGELOG.md`, `docs/CONFIG_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md` in the repository
- `eval/reports/nyx9b-q4km/report.md` — the 9B end-to-end evaluation report
- `research/paired_oracle/REPORT_BF16_ORACLE.md` in the repository

<span class="reverse">5 architecture configs · 8/8 integration matrix · 9.2B proven end-to-end</span>
