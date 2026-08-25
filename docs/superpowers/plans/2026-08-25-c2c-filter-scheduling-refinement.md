# C2c Filter and Scheduling Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create protected refined copies of C2c-01 and C2c-02 that reuse the B1-06 filter-panel language and clarify scheduling and comparison actions.

**Architecture:** Work incrementally in the existing Figma file. Inspect the source frames and B1-06 FilterPanel, clone the two C2c sources, then independently update toolbar actions, the filter-open state, scheduled-place badges, and comparison buttons before screenshot and structural verification.

**Tech Stack:** Figma Plugin API through `use_figma`, Figma metadata and screenshot inspection.

**Spec:** `docs/superpowers/specs/2026-08-25-c2c-filter-scheduling-refinement-design.md`

## Global Constraints

- Preserve source frames `3614:13780`, `3614:13832`, B1-06 frame `1010:8792`, and FilterPanel instance `3649:1066` without mutation.
- Create exactly two new 393 × 852px frames using the exact ` · Refined` suffix.
- Preserve current Trova colors, Noto Sans TC typography, card content, navigation, and safe-area structure.
- Remove region and operating-status filtering from refined output.
- Do not build the sorting dropdown screen in this scope.

---

### Task 1: Inspect source properties and create protected copies

**Files:**
- Read: Figma file `P8P8AbsbsKqyPCSUFf32wj`
- Read: C2c-01 `3614:13780`
- Read: C2c-02 `3614:13832`
- Read: B1-06 `1010:8792`

**Interfaces:**
- Consumes: source node IDs and incumbent component/style properties
- Produces: exact refined frame IDs and descendant IDs needed by later tasks

- [ ] **Step 1: Inspect source screenshots and node properties**

  Record C2c toolbar, Header, cards, Bottom Sheet, Scrim, and B1-06 FilterPanel dimensions, component source, fills, strokes, effects, text styles, and option hierarchy.

- [ ] **Step 2: Clone C2c-01 and C2c-02**

  Create `C2c-01 · 收藏檔案夾_景點列表 · Refined` and `C2c-02 · 收藏檔案夾_篩選開啟 · Refined`, place them in clear canvas space with at least 100px separation, and return all created IDs.

- [ ] **Step 3: Validate source protection**

  Confirm all three source frames retain their IDs, names, positions, sizes, and existing FilterPanel instance.

### Task 2: Update toolbar and comparison actions

**Files:**
- Modify: the two refined frame IDs from Task 1

**Interfaces:**
- Consumes: refined Body, `Filter / 分類`, Header, and text/button descendant IDs
- Produces: matching `搜尋｜篩選｜排序` toolbars and secondary comparison buttons

- [ ] **Step 1: Replace the region Chip with sorting**

  Preserve the third Chip instance footprint and component language, update its icon/label to sorting semantics, and retain the downward indicator.

- [ ] **Step 2: Normalize search and filter controls**

  Keep existing 46px control height, three equal widths, 12px gaps, and selected/open styling on the C2c-02 filter Chip.

- [ ] **Step 3: Build the Header comparison button**

  Replace the bare `比較` text in each refined frame with a 72 × 40px visual button inside the existing 44px action area. Use 10px corner radius, pale Terracotta fill, Terracotta text, Noto Sans TC Bold 14px, and retain at least a 44px touch container.

### Task 3: Reuse the B1-06 filter language in C2c-02

**Files:**
- Modify: C2c-02 Refined from Task 1

**Interfaces:**
- Consumes: B1-06 FilterPanel styling and C2c-02 content requirements
- Produces: one anchored C2c filter panel with exact type and scheduling-status options

- [ ] **Step 1: Remove only the refined Bottom Sheet and Scrim**

  Remove `Bottom Sheet / 篩選` and `Overlay / Scrim` from the C2c-02 refined copy; preserve the source frame versions.

- [ ] **Step 2: Create the anchored filter panel**

  Match B1-06 FilterPanel width, corner radius, fill, shadow, spacing, selection treatment, dividers, and reset placement. Position it below the filter Chip without covering the Header.

- [ ] **Step 3: Populate type options**

  Create `全部` selected and `景點`、`餐廳`、`住宿`、`咖啡廳` unselected using the B1-06 row language and existing category icons.

- [ ] **Step 4: Populate scheduling-status options**

  Create `全部` selected and `尚未安排`、`已安排` unselected under `安排狀態`; do not add location or operating-status options.

- [ ] **Step 5: Add reset action**

  Preserve B1-06 placement and styling for the `重置` action.

### Task 4: Add scheduled-place badges

**Files:**
- Modify: both refined frame IDs from Task 1

**Interfaces:**
- Consumes: the Huashan place-card frames in each refined screen
- Produces: matching `第 2 天` badges without content overlap

- [ ] **Step 1: Create badges in both Huashan cards**

  Add a 52 × 28px top-right pill with Sage-tinted surface, deeper Sage text, 999px corner radius, and Noto Sans TC Medium 13px.

- [ ] **Step 2: Protect title layout**

  Reduce or reposition the Huashan title text area only as needed so the badge never overlaps the name, rating, operating information, or action.

- [ ] **Step 3: Confirm unscheduled state**

  Keep the Songshan card free of any day badge in both refined screens.

### Task 5: Verify visual and structural acceptance

**Files:**
- Read: the two refined frames and three protected source nodes

**Interfaces:**
- Consumes: final refined frames
- Produces: screenshot and metadata evidence for every acceptance condition

- [ ] **Step 1: Capture both refined screenshots**

  Inspect toolbar semantics, comparison-button hierarchy, panel alignment, option legibility, badge placement, clipping, and overlap.

- [ ] **Step 2: Run structural checks**

  Confirm unique names, exact 393 × 852px dimensions, source preservation, one filter panel only in C2c-02 Refined, no refined Bottom Sheet or Scrim, expected option labels, and one `第 2 天` badge per refined screen.

- [ ] **Step 3: Apply one bounded correction pass if needed**

  Fix only screenshot or metadata defects, then recapture final proof screenshots and stop.
