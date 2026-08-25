# B. 收藏：852px Viewport 與固定操作區設計規格

日期：2026-08-25

## 目標

將 Figma `B. 收藏` Page 中所有正式 B1、B3、B4 畫面統一為 393 × 852px 的手機 viewport，讓長內容可捲動，同時使 Header、Bottom Sheet、底部 CTA 與 Home Indicator 維持在可視範圍的固定位置。解決內容滑過透明 CTA 區、Sheet 位於長頁底端而非螢幕底端，以及 Prototype 還原度不足的問題。

## 修改範圍

- `B. 收藏` Page 中名稱以 `B1-`、`B3-`、`B4-` 開頭的正式畫面。
- 不修改 `NOTE-` 註記、元件主檔與其他 Page。
- 保留現有畫面名稱、元件實例、內容、狀態與 Prototype 目的地。

## 統一 Viewport

- 所有目標外層 Frame 尺寸統一為 393 × 852px。
- 外層 Frame 開啟 `Clip content`。
- 需要瀏覽超過 852px 的畫面設定為 Vertical scrolling。
- 原始長內容保留，不以刪除或壓縮內容方式配合新高度。
- 不需要捲動的短畫面仍維持 852px 外層高度，但不強制產生捲動。

## 固定區域

### Header

- 已有固定導覽 Header 的畫面，Header 設為 `Fix position when scrolling`。
- constraints 使用 `Left + Right + Top`。

### Bottom Sheet 與遮罩

- B3 加入行程與建立新行程相關 Bottom Sheet 固定於 viewport 底部。
- constraints 使用 `Left + Right + Bottom`。
- 遮罩覆蓋完整 393 × 852px viewport，並與 Sheet 一起固定。
- Sheet 內部內容與元件結構保持不變；若 Sheet 高度大於可視空間，僅 Sheet 內容區可捲動，Header 與主要 CTA 維持固定。

### 底部 CTA

- `CTA Bar` 與同類底部操作區固定於 viewport 底部。
- constraints 使用 `Left + Right + Bottom`。
- CTA 容器背景設定為 100% 不透明白色。
- Divider 納入同一個白色固定容器，避免背景內容捲動時從 Divider 或按鈕後方穿出。
- CTA 容器需覆蓋按鈕至畫面底部的完整區域，不只覆蓋按鈕本身。

### Home Indicator

- Home Indicator 固定於 viewport 底部。
- 指示條下緣距外層 Frame 底部 8px。
- 水平置中，沿用既有寬度、圓角與顏色。
- Home Indicator 位於 CTA／Sheet 白色背景之上，不直接疊在捲動內容上。

## Prototype 與轉場

- 保留既有 Prototype reactions 與目的地。
- 852px 調整後重新驗證 B3 主流程：`B3-03 → B3-06 → B3-07 → B3-08 → B3-09 → B3-10 → B3-11`。
- Smart Animate 的 Sheet 在所有相關畫面使用一致的底部位置，避免轉場跳動。
- 關閉 Sheet 後回到既有父層畫面，捲動位置依目前 reaction 設定重置。

## 實施策略

1. 先以一張 B3 Bottom Sheet 畫面建立基準結構並驗證固定、捲動與遮罩。
2. 將同一規則套用到其餘 B3 畫面，驗證 Prototype。
3. 批次調整 B1、B4 外層 viewport 與各自固定 Header／CTA。
4. 逐張檢查白色 CTA 背景、Divider、Home Indicator 8px、文字裁切與內容捲動。

## 驗收條件

- 所有目標正式畫面外層均為 393 × 852px，且名稱唯一。
- 長內容可以垂直捲動，沒有被永久裁掉。
- Bottom Sheet 永遠貼齊可視畫面底部。
- CTA 與 Divider 後方為不透明白色，捲動內容不會穿透顯示。
- 所有 Home Indicator 下緣距畫面底部為 8px。
- Header、CTA、Sheet、遮罩在捲動時維持固定。
- B3 Prototype 每條 reaction 仍指向正確畫面，Smart Animate 無明顯位移跳動。
- 不更改 `NOTE-`、Component Page 或其他非 B. 收藏畫面。

## 風險與處理

- 部分既有畫面使用長 Frame 直接承載內容，改成 viewport 後可能需要調整 scroll behavior；先以 B3 基準畫面確認可行結構，再批次套用。
- 固定子層若位於 Auto Layout 中，可能無法直接設定固定滾動；必要時只調整其直接父層結構，不 detach 元件實例。
- 不同畫面的 CTA 命名可能不一致；以位置、元件類型與內容交叉辨識，避免誤改正文容器。
