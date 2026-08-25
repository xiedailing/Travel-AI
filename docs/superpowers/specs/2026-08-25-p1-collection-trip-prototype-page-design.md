# P1 收藏與行程 Prototype Page 設計規格

## 目標

建立獨立的 `P1 · 收藏與行程 Prototype` Figma Page，讓 B3 景點加入行程與 C2c 收藏景點比較可在同一個 Prototype Flow 中連續播放，同時保留原本 `B. 收藏`、`C. 行程` Page 作為完整設計稿與狀態庫。

## 畫面範圍

Prototype Page 僅收錄正式展示所需畫面：

1. B3 景點詳情與營業時間狀態
2. B3 選擇／建立行程 Sheet
3. B3 加入成功 Toast
4. C2c 收藏景點列表
5. C2c 篩選 Sheet
6. C2c 比較模式：未選、已選 1 項、已選 2 項
7. C2c 景點比較結果

錯誤狀態、探索版本與非展示分支繼續留在原功能 Page，不複製到 P1。

## Page 與命名

- Page：`P1 · 收藏與行程 Prototype`
- Flow：`P1｜收藏景點加入行程與比較`
- 畫面名稱保留原 B3／C2c 編號，前綴不另改，方便回查來源。
- 畫面依流程由左至右排列，分成「加入行程」與「收藏比較」兩個區段。

## Prototype 流程

主要 Happy Path：

`景點詳情 → 加入行程 → 選擇／建立行程 → 加入成功 → 查看收藏 → 收藏列表 → 比較模式 → 選取兩個景點 → 比較結果`

附帶互動：

- 營業時間維持 Interactive Component 開合，不新增額外跳頁。
- 收藏列表可開啟與關閉篩選 Sheet。
- 比較模式可取消，並可在 0／1／2 個選取狀態間切換。
- 比較結果可返回已選 2 項狀態。
- 成功 Toast 的「查看」直接導向同 Page 的 C2c 收藏列表。

## 複製與維護規則

- 原始 B、C Page 不移動、不刪除、不改名。
- P1 使用受控 Frame 副本；所有指向原 Page 的 Frame Navigation 都改為 P1 內對應副本。
- 共用 Component Instance 保持連結主元件，避免完全扁平化。
- 後續修改正式畫面時，先修改原稿，再同步 P1；P1 不作為唯一設計來源。

## 驗證標準

- 所有展示畫面維持 393 × 852。
- Flow 起點與名稱正確。
- P1 內沒有指向 B／C Page Frame 的 Navigate 連線。
- Toast「查看」可連續進入收藏列表。
- 主要 Happy Path 可從頭播放至比較結果，不需離開目前 Page。
- 原 B、C Page 的 Frame 數量、名稱與位置不被修改。

