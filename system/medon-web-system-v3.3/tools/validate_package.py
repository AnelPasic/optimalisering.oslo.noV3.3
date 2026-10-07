from pathlib import Path
import re, sys, json

root = Path(__file__).resolve().parents[1]
required = [
    'README.md','BLUEPRINT.md','START-NEW-PROJECT.md','START-EXISTING-PROJECT.md',
    'START-HERE.md','AGENTS.md','SiteGrowthSKILL.md','SKILL-seo-aio-hormozi.md',
    'technical/TECHNICAL-PREFLIGHT.md','governance/PROJECT-PROFILES.md',
    'governance/SCORING-GATES.md','proof/PROOF-ROUTER.md','qa/RED-TEAM.md'
]
errors=[]
for rel in required:
    if not (root/rel).is_file(): errors.append(f'MISSING REQUIRED: {rel}')

# Check local markdown links that look like file paths.
pat = re.compile(r'\[[^\]]+\]\(([^)]+\.md)(?:#[^)]+)?\)')
for p in root.rglob('*.md'):
    text=p.read_text(encoding='utf-8', errors='replace')
    for target in pat.findall(text):
        if '://' in target or target.startswith('#'): continue
        dest=(p.parent/target).resolve()
        try: dest.relative_to(root.resolve())
        except ValueError: continue
        if not dest.exists(): errors.append(f'BROKEN LINK: {p.relative_to(root)} -> {target}')

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'OK: {len(list(root.rglob("*")))} package entries; required files and local .md links passed.')
