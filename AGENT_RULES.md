# Component Discovery Assistant - OpenCode 指引

## 專案定位
實作基於 Model Context Protocol (MCP) 的前端元件檢索工具，透過 stdio 與 VS Code Copilot Chat 串接。
核心演算法為 UI 特徵重疊度比對 (Feature Overlap Score)，回傳相符的 Top-3 元件。

## 資安底線 (嚴格遵守)
1. 嚴禁在代碼、註解或測試資料中提及任何特定企業名稱、內部專案名稱或真實路徑。
2. 測試資料一律使用 `data/mock-components.json`，元件名稱一律帶有 `Mock` 前綴。
3. 本專案為純演算法與檢索工程，不涉及任何本機模型訓練或微調。
