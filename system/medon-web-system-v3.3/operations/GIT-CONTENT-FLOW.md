# Git Content Flow — v3.3

## Principle

Git is the shared source of truth between content/strategy, implementation and human CMS editing.

## Recommended branch flow

```text
main
  ↑ reviewed PR
content/<task>
implementation/<task>
```

Do not require separate branches for trivial edits when project policy permits direct commits, but keep material content changes reviewable.

## Pages CMS

Pages CMS writes to repository content. It is an editing interface, not a second content database.

Human-friendly CMS fields should map to semantic content. Hide or protect technical SEO/URL/schema fields when accidental edits are risky.

## Agent handoff

Strategy/Content Agent can create/update content files and open a PR when connected repository permissions allow.
Implementation Agent consumes the locked content and may change adapters/schema without changing the commercial meaning.

## Conflict rule

If CMS content, code defaults and an older design mock conflict, use the authority order in `START-HERE.md`. Never let stale hard-coded strings silently override current locked content.
