# Template Canary & Scale Gate

Scaled publishing requires scaled quality control.

Before producing many pages from a new template, when practical:

```text
build 3–5 representative pages
→ QA
→ publish
→ crawl/index observation
→ query/impression observation
→ conversion/utility observation
→ semantic similarity check
→ PASS / STOP
```

## Monitor by template family

- published;
- crawled/indexed where data exists;
- query/impression trend;
- semantic uniqueness;
- conversions/leads;
- failure rate over time;
- index decay/content decay.

If one generator degrades, stop the line and fix the generator before rewriting URLs one by one.

Canary is a routed rule for scaled/programmatic work, not a mandatory wait-state for a normal five-page site.
