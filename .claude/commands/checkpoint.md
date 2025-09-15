# /checkpoint Command

**Purpose:** Force immediate checkpoint save during active work

**Implementation:**
```
/checkpoint
```

**Action:** Claude-main MUST immediately save current work state to checkpoint file.

**Mandatory Response:**
1. Save checkpoint to `.claude/checkpoints/claude-main-[YYYYMMDD-HHMM].md`
2. Use standard checkpoint format:
   ```markdown
   # claude-main Checkpoint
   **Time:** [timestamp]
   **Task:** [user's original request]
   **Status:** [current work phase]
   **Completed:** [work finished so far]
   **Current:** [what you're actively working on]
   **Next:** [planned next steps]
   **Context:** [key decisions, findings, or state]
   ```
3. Confirm to user: "Checkpoint saved to `claude-main-[timestamp].md`"

**When User Should Use:**
- Before complex work sessions
- When worried about time limits
- Before launching agents
- At natural break points in work

**Critical:** This command overrides any resistance to checkpointing - it's MANDATORY when invoked.