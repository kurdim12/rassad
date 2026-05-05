# RASAD | رصد

<p align="center">
  <strong>AI-Powered Arabic News Verification Platform</strong>
</p>

<p align="center">
  Paste a claim, a URL, or upload an image — RASAD runs a 6-agent pipeline and returns an evidence-backed verdict in 10–15 seconds.
</p>

<p align="center">
  <code>VERIFIED</code> ·
  <code>FALSE</code> ·
  <code>MISLEADING</code> ·
  <code>AI_GENERATED</code> ·
  <code>MANIPULATED</code> ·
  <code>OLD_NEWS</code> ·
  <code>UNVERIFIED</code> ·
  <code>DUPLICATE</code> ·
  <code>HIGH_RISK</code>
</p>

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#api">API</a> ·
  <a href="#environment-variables">Environment</a> ·
  <a href="#docker">Docker</a> ·
  <a href="#troubleshooting">Troubleshooting</a>
</p>

---

## Overview

**RASAD | رصد** is an AI-powered Arabic news verification platform.

Users can paste a claim, submit a URL, or upload an image. RASAD then runs a complete verification workflow through a **6-agent AI pipeline**:

1. Arabic NLP  
2. Media authenticity  
3. Reference cross-checking  
4. Fake-news machine learning  
5. Claim tracing  
6. Verdict synthesis  

The platform returns a structured verdict with confidence, Arabic explanation, per-agent breakdown, and supporting sources.

```txt
verdict: VERIFIED | FALSE | MISLEADING | AI_GENERATED | MANIPULATED
         | OLD_NEWS | UNVERIFIED | DUPLICATE | HIGH_RISK

confidence: 0..100

arabic_explanation:
  3-sentence Gemini-synthesized explanation

agent_breakdown:
  Per-agent scores + evidence

sources:
  List of corroborating URLs from RSS + live web search
