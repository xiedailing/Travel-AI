# Slide 15 — Prototype Demo 設計規格

## 2026-08-19 改版

### 改版目標

將 QR Code 導向改為三個清楚、可直接點擊的 Prototype 入口，並將登入／註冊定位為進入產品前的必要流程，而非核心產品價值。

### 內容層級

- `FLOW 0 · ONBOARDING`：登入／註冊，以較輕的視覺呈現前置入口。
- `FLOW A · IMPORT`：跨平台匯入收藏。
- `FLOW B + C · PLANNING HUB`：AI 安排，以及自行安排搭配 AI 即時健檢；維持最大區塊。
- 移除兩個 QR Code 與所有掃描提示。
- 每個入口包含簡短說明、3–4 個關鍵步驟與一個 `OPEN PROTOTYPE` 按鈕。

### 版面

採三張不等寬卡片。Flow 0 最精簡、Flow A 為標準任務卡、Flow B+C 取得最多空間，以容納兩條規劃分支並凸顯產品核心互動。標題改為「三個操作入口，體驗完整產品流程」，副標改為「點擊連結，從指定起始畫面開始操作。」

### Prototype 連結

- Flow 0 使用使用者提供的 Figma 起始點 `1010:16597`，頁面為 `1010:16129`。
- Flow A 與 Flow B+C 保留既有連結。

### 排除項目

不顯示 QR Code，不加入候補或備案行程功能。

## 目標

提供老師可直接操作的 Prototype 入口，並清楚說明兩個起始入口如何涵蓋三條核心任務。此頁是 Demo 導覽，不重複 Slide 13 的六張 Mockup。

## 核心訊息

兩個操作入口，完整體驗三條核心任務。

## Prototype 入口

### 入口 A｜跨平台匯入收藏

- 起始 Frame：`B1-empty1_收藏列表_空狀態（0收藏）`
- Starting point：`1010:8563`
- Prototype URL：
  `https://www.figma.com/proto/P8P8AbsbsKqyPCSUFf32wj/%E6%99%BA%E6%85%A7%E6%97%85%E8%A1%8C%E8%A6%8F%E5%8A%83%E6%95%B4%E5%90%88%E5%B9%B3%E5%8F%B0%E5%B0%88%E6%A1%88_Wireframe--Copy-?node-id=1010-8563&t=mexpldVmq1l2kP8p-1&scaling=scale-down&content-scaling=fixed&page-id=1010%3A3506&starting-point-node-id=1010%3A8563&show-proto-sidebar=1`
- 任務：空收藏 → 匯入外部連結 → AI 擷取 → 確認資訊 → 收藏成功。

### 入口 B｜行程規劃中心

- 起始 Frame：`C2 · 行程詳情頁_行程詳情頁`
- Starting point：`850:2335`
- Prototype URL：
  `https://www.figma.com/proto/P8P8AbsbsKqyPCSUFf32wj/%E6%99%BA%E6%85%A7%E6%97%85%E8%A1%8C%E8%A6%8F%E5%8A%83%E6%95%B4%E5%90%88%E5%B9%B3%E5%8F%B0%E5%B0%88%E6%A1%88_Wireframe--Copy-?node-id=850-2335&t=8rzF0aGjN3IgLsdy-1&scaling=scale-down&content-scaling=fixed&page-id=311%3A1462&starting-point-node-id=850%3A2335&show-proto-sidebar=1`
- 從共同入口分為兩條任務：
  - Flow B：AI 根據收藏景點安排行程。
  - Flow C：使用者自行安排，AI 即時提醒衝突。

## 內容結構

### 左側 35%｜入口 A

- Flow A 名稱與一句任務說明。
- 一個可掃描的 QR Code。
- 一個可點擊的 `OPEN PROTOTYPE` 連結。
- 以四個簡短步驟說明操作方向。

### 右側 65%｜入口 B

- 「行程規劃中心」名稱與共用 QR Code。
- QR Code 對應共同起始 Frame，不重複建立兩個相同 QR Code。
- QR Code 旁分成兩條平行路徑：
  - AI 是安排者：選擇景點 → 設定條件 → AI 建議順序 → 套用。
  - AI 是協作者：自行調整 → 即時發現衝突 → 展開建議 → 手動修正。
- 一個可點擊的 `OPEN PROTOTYPE` 連結。

## QR Code 與連結

- 依上述兩個 Prototype URL 產生兩張本地 QR Code PNG，存放於 `assets/slide15/`。
- QR Code 必須使用完整 Prototype URL，不使用設計頁 URL。
- HTML 中的 QR Code 與按鈕都以 `<a>` 連回相同 Prototype URL，並在新分頁開啟。
- QR Code 周圍保留足夠白邊，避免投影或手機掃描失敗。

## 視覺版型

- 延續暖米色背景、Terracotta 與 Indigo 色彩角色。
- 左側入口 A 使用 Terracotta，代表使用者主動匯入。
- 右側行程入口以 Indigo 作為共同核心，內部分流：
  - Flow B 使用 Indigo，代表 AI 主動安排。
  - Flow C 使用 Sage／警示色，代表 AI 輔助檢查。
- 不使用三張等寬卡片，避免重複 QR Code。
- 兩個 QR Code 均需足夠大，現場投影仍可掃描。

## 文案

- Eyebrow：`Interactive Prototype`
- 主標題：`兩個操作入口，完整體驗三條核心任務`
- 補充：`掃描 QR Code 或點擊連結，從指定起始畫面開始操作。`
- Flow A：`跨平台匯入收藏`
- 入口 B：`行程規劃中心`
- Flow B：`交給 AI 安排`
- Flow C：`自己安排，AI 即時健檢`

## 範圍限制

- 不放候補、備案或已移除功能。
- 不重複 Slide 13 的六張 Mockup。
- 不將同一個行程入口複製成兩個 QR Code。
- 不宣稱 Prototype 已經通過 Usability Testing。
- 不修改 Figma Prototype。

## 驗證

- 確認兩個 QR Code 可掃描並開啟正確 Starting point。
- 確認兩個文字連結可點擊並在新分頁開啟。
- 確認 B／C 共用入口的邏輯清楚，不會被誤認為同一流程。
- 確認桌面與直式窄螢幕版不重疊、不溢出。
- 確認插入後 Prototype 為 Slide 15，Validation Plan 順延為 Slide 16。
