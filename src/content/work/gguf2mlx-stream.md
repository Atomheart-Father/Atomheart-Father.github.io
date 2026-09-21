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
  - "Four built-in architecture configs: qwen3_5, qwen3, llama, gemma3"
  - "Integration matrix: 8/8 real-GGUF conversions PASS"
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

## 02 / Architecture mappings as data

The drift between llama.cpp GGUF conventions and MLX-LM expectations is not handled where you might expect. **The conversion engine contains no model-family branches**; architecture differences live in validated YAML mappings and reusable tensor operators. What looks like "a converter that supports four models" is closer to a small weight-transformation compiler:

| config | family | notable mappings |
|---|---|---|
| `qwen3_5` | Qwen3.5 hybrid | GDN + full attention; grouped v-head reorder for any heads/kv-heads ratio 1–4; NextN/MTP block removal; `A_log = log(−unpermute(ssm_a))`; conv1d `(dim,k) → (dim,k,1)` |
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
| Qwen3.5-0.8B (hybrid) | Q4_K_M | 0.50 | 0.40 | 4.26 | 90.5 |
| Qwen3.5-0.8B (hybrid) | Q6_K | 0.60 | 0.57 | 4.49 | 90.6 |
| Qwen3-0.6B | Q4_K_M | 0.37 | 0.31 | 3.50 | 54.1 |
| Qwen3-0.6B | Q6_K | 0.46 | 0.45 | 3.53 | 55.4 |
| Llama-3.2-1B | Q4_K_M | 0.75 | 0.65 | 4.13 | 34.5 |
| Llama-3.2-1B | Q6_K | 0.95 | 0.94 | 4.37 | 34.7 |
| Gemma-3-270M | Q4_K_M | 0.24 | 0.14 | 3.76 | 55.5 |
| Gemma-3-270M | Q6_K | 0.26 | 0.20 | 3.80 | 55.6 |

Peak RSS includes the mmap'd source page cache, which the OS can evict; it is not live memory. Numbers come from the converter's own statistics and are reproducible via the integration matrix scripts in the repository.

## 04 / Scope and boundaries

The tool is deliberately narrow:

- GGUF → MLX only; there is no reverse direction yet.
- Tokenizer assets are currently supplied separately; rebuilding tokenizer files directly from GGUF metadata is not yet supported.
- Not yet on PyPI — install from the GitHub repository.

## References

- Source and documentation: [Atomheart-Father/gguf2mlx-stream](https://github.com/Atomheart-Father/gguf2mlx-stream)
- `docs/CONFIG_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md` in the repository

<span class="reverse">4 architectures · 8 real-GGUF conversions · 8/8 passing</span>
