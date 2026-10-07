# Decision Locks & Change Control — v3.3

Lock decisions at the **right granularity**.

## Material lock classes
- `D-TECH-*` — architecture/ownership/deploy/data;
- `D-COMM-*` — audience/service/offer/pricing/conversion;
- `D-SEARCH-*` — material page-role/URL/search decisions;
- `D-CONTENT-*` — complete-page meaning/content lock when needed;
- `D-DESIGN-*` — visual identity/system/representative-page lock;
- `D-LAUNCH-*` — launch/deploy exceptions.

Do **not** create permanent owner decision IDs for every eyebrow, section heading, button label, spacing value or routine implementation choice.

## Record

```text
ID:
Decision:
State: APPROVED / REJECTED / PENDING
Owner/role:
Reason:
Evidence:
Date:
Reopen trigger:
```

## Change request

```text
CR-ID:
Decision affected:
Current lock:
Observed problem:
Can it be solved without reopening? yes/no
Proposed change:
Evidence:
Downstream impact:
Recommendation:
Material owner approval required? yes/no
```

First solve within existing locks. Reopen only when evidence or owner instruction justifies it.

## Stop-loss

If 2–3 controlled attempts fail, reopen the underlying assumption instead of generating variants D–K.
