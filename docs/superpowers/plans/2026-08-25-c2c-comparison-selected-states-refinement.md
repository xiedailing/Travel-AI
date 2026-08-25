# C2c Comparison Selected States Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create polished duplicate versions of the C2c-04 and C2c-05 Figma frames while preserving the original frames and incumbent visual language.

**Architecture:** Work directly in the existing Figma file with incremental Plugin API calls. Discover the two source frames and their visual properties, clone them as adjacent `Refined` frames, apply only targeted state and hierarchy refinements, and visually verify both duplicates against the originals.

**Tech Stack:** Figma Plugin API through `use_figma`, Figma metadata and screenshot inspection.

**Spec:** `docs/superpowers/specs/2026-08-25-c2c-comparison-selected-states-refinement-design.md`

## Global Constraints

- Preserve both original frames without mutation.
- Keep each duplicate at exactly 393 × 852px.
- Preserve existing color, typography, corner-radius, icon, image, component, content, navigation, and brand language.
- Use the exact suffix ` · Refined` for duplicate names.
- Do not delete any node or add new product behavior.
- Keep corresponding elements aligned between the one-selected and two-selected states.

---

### Task 1: Inspect the incumbent frames

**Files:**
- Read: Figma file `P8P8AbsbsKqyPCSUFf32wj`
- Read: source frame `3614:13960`

**Interfaces:**
- Consumes: source frame name `C2c-04 · 收藏檔案夾_比較模式_已選1項`
- Produces: exact node IDs for C2c-04, C2c-05, selected cards, checkbox instances, count labels, and fixed CTA containers

- [ ] **Step 1: Query both source frames and their immediate visual structure**

  Use a read-only `use_figma` call to search the file by the two exact frame names and return node IDs, parent page IDs, size, position, child names, fills, strokes, corner radii, effects, and layout properties.

- [ ] **Step 2: Capture source screenshots**

  Render C2c-04 and C2c-05 at sufficient resolution to inspect card borders, selected controls, type hierarchy, CTA states, clipping, and safe-area spacing.

- [ ] **Step 3: Record refinement targets**

  Compare the two source frames and limit changes to inconsistent or unclear selected-state styling, spacing, alignment, hierarchy, and CTA emphasis.

### Task 2: Create protected duplicate frames

**Files:**
- Modify: Figma file `P8P8AbsbsKqyPCSUFf32wj`

**Interfaces:**
- Consumes: the two exact source frame node IDs from Task 1
- Produces: two duplicate frame node IDs named with the exact ` · Refined` suffix

- [ ] **Step 1: Clone C2c-04 and C2c-05**

  Clone each full source frame so all existing content, component instances, constraints, and prototype-ready structure remain intact.

- [ ] **Step 2: Place the duplicates beside the originals**

  Position each duplicate in clear canvas space to the right of its source group with at least 120px separation and no overlap with existing top-level nodes.

- [ ] **Step 3: Rename and validate the clones**

  Set the names to `C2c-04 · 收藏檔案夾_比較模式_已選1項 · Refined` and `C2c-05 · 收藏檔案夾_比較模式_已選2項 · Refined`; return all created node IDs and confirm both frames remain 393 × 852px.

### Task 3: Refine selected-state hierarchy

**Files:**
- Modify: the two Figma `Refined` frames from Task 2

**Interfaces:**
- Consumes: duplicate frame IDs and descendant IDs discovered by scoped traversal
- Produces: visually consistent one-selected and two-selected frame states

- [ ] **Step 1: Normalize selected-card styling**

  Reuse colors and stroke treatments already present in the file; make selected cards consistently distinguishable through the incumbent border, subtle surface tint, and checkbox state without altering content.

- [ ] **Step 2: Normalize unselected-card styling**

  Ensure unselected cards retain the neutral incumbent surface and do not visually compete with selected cards.

- [ ] **Step 3: Align state indicators**

  Match checkbox placement, selected-count label placement, and relevant card padding between both refined frames.

- [ ] **Step 4: Improve type and spacing rhythm**

  Preserve existing fonts and copy while correcting only inconsistent spacing, vertical rhythm, alignment, and hierarchy between header, list, cards, helper text, and bottom action area.

### Task 4: Refine CTA states and verify

**Files:**
- Modify: the two Figma `Refined` frames from Task 2

**Interfaces:**
- Consumes: refined CTA containers and their text nodes
- Produces: a clearly incomplete C2c-04 state and clearly enabled C2c-05 state

- [ ] **Step 1: Refine the one-selected CTA**

  Keep `再選 1 個景點` visually non-primary using the existing disabled/incomplete treatment and verify sufficient text contrast.

- [ ] **Step 2: Replace the plain selection hint with a two-slot tray**

  In both refined frames, replace the existing centered `已選數量提示` text with a 361 × 40px horizontal auto-layout tray containing two equal-width 176.5px slots separated by 8px. Use 10px corner radii, Noto Sans TC Medium 13px centered single-line labels, selected and pending treatments defined in the spec, and preserve the tray at x=16, y=720 above the fixed CTA.

- [ ] **Step 3: Refine the two-selected CTA**

  Keep `比較 2 個景點` clearly actionable using the existing primary-button treatment; do not introduce a new color.

- [ ] **Step 4: Capture refined screenshots**

  Render both duplicates and compare them side-by-side with their source frames for selection clarity, consistent placement, clipping, overlap, bottom safety, and brand continuity.

- [ ] **Step 5: Run structural acceptance checks**

  Confirm both originals retain their IDs and names, both refined frames exist exactly once, all four frames are 393 × 852px, and no text or node is hidden unintentionally.

- [ ] **Step 6: Apply one bounded correction pass if needed**

  Fix only defects visible in the verification screenshots, then capture one final confirmation screenshot for each refined frame.
