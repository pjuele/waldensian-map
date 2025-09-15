# /lunch-break-over Command

**Purpose:** Resume agent work after time limit crashes

**Implementation:**
```
/lunch-break-over
```

**Action:** Launch wmp-coordinator with instruction:
"Time limits caused work interruption. Read your latest checkpoint in `.claude/checkpoints/wmp-coordinator-*.md` then scan folder for other agent checkpoints. Resume coordination and relaunch agents with their checkpoint data."

**Coordinator Resume Protocol:**
1. Read own checkpoint: `.claude/checkpoints/wmp-coordinator-*.md` (latest)
2. Scan `.claude/checkpoints/` for other agent files
3. For each agent found, launch with: "Read your checkpoint `.claude/checkpoints/[agent-name]-*.md` and continue work."

**Expected Flow:**
- Coordinator understands orchestration state
- Each agent resumes from their specific checkpoint
- Work continues seamlessly from interruption point