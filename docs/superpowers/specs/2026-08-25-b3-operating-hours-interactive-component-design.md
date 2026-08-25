# B3 營業時間 Interactive Component 設計規格

日期：2026-08-25

## 目標

將 B3-01 與 B3-02 之間的整頁 Prototype 跳轉，改為單一畫面內的 Interactive Component 狀態切換，消除展開／收合時的整頁位移、固定 CTA 跳動與捲動位置變化。

## 元件架構

- 元件名稱：`OperatingHours`
- Component Set Variant property：`State`
- Variants：`State=Collapsed`、`State=Expanded`
- 兩個 Variant 沿用 B3-01、B3-02 現有營業時間列與展開內容的視覺樣式。
- 展開內容保持垂直 Auto Layout；元件高度由內容決定。
- 元件放入 B3-01 的 `InfoList`／內容 Auto Layout，展開時由父層自然下推後續區塊。

## Prototype 行為

- `Collapsed` 點擊營業時間列 → `Change to Expanded`
- `Expanded` 點擊營業時間列 → `Change to Collapsed`
- Transition：Smart Animate，Ease Out，0.22 秒。
- 不導航到另一張 Frame，不重設外層捲動位置。

## 畫面處理

- B3-01 作為正式可播放畫面，替換為 `OperatingHours` instance。
- B3-02 保留作為展開狀態的靜態規格展示，不再作為 B3-01 的 Prototype 目的地。
- 移除 B3-01、B3-02 原本營業時間列上的整頁 NAVIGATE reactions，避免雙重觸發。
- 保留 B3-01 既有 Flow 起點、加入行程 CTA、固定底部區與其他 reactions。

## 驗收條件

- 點擊營業時間時只改變該區塊狀態，不切換外層 Frame。
- 展開與收合動畫平順，固定 CTA、Home Indicator 與 Header 不跳動。
- 展開後完整顯示每週營業時間，沒有裁切或重疊。
- 收合後恢復原始高度與箭頭方向。
- B3-01 的 `B3｜加入既有行程` Flow 與其他 Prototype reactions 保持有效。
