# H-004 technical implementation review

2026-10-08. A read-only code-review subagent checked the H-004 working tree against `d0e5a30`. This is IMPLEMENTATION verification, not OWNER R-03 acceptance or the independent RED_TEAM R-04 verdict.

The review found missing CMS constraints for required homepage sections/order, rounded conversion rates contradicting the visible calculator equations, fractional visit defaults conflicting with input step=1, and an extreme tiny-rate percentage overflow. All were corrected. Regression checks failed on the original behavior before passing with the fixes.

The actual content schema is now directly testable in `app/src/lib/content-schema.ts`. Homepage section presence, uniqueness and order are validated; default visits must be whole numbers. Equations preserve the entered conversion rate. Non-finite percentage changes receive the editable unavailable-state wording.

Fresh final validation: Astro check of 53 files with zero errors/warnings/hints; 24 tests; static build; 449-link audit; 40 synthetic browser regression checks; focused 1440/390/320px QA including fractional rates, invalid inputs, zero baseline, maximum values, decreased results and disabled intake. All pass. The reviewer additionally inspected 651/900/901/1000/1100px fit and confirmed filled-form Enter sends no POST with JavaScript enabled or disabled.

The review declined to judge commercial wording, visual acceptance, proof permissions, production intake, authenticated CMS save behavior and live publication. These remain with their responsible roles: current generated homepage content is draft; OWNER and RED_TEAM reviews are pending; no proof is rendered; real intake is disabled; CMS configuration is verified without an authenticated save claim; Worker publication is checked separately after repository delivery.

After the corrections, the same reviewer independently verified all fixes with nine targeted tests and 1440/390/320px browser checks. Technical verdict: ready for H-004 static review; no remaining Critical or Important findings. This remains technical QA only.
