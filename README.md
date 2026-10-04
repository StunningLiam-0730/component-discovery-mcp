```
# 🔍 Component Discovery MCP Server

**基於 Model Context Protocol (MCP) 的企業級前端元件智能檢索工具**

## 💡 專案願景 (Overview)
在大型企業前端開發（如 OTA Repo）中，工程師常面臨「找不到現有元件而重複造輪子」的痛點。本專案透過引入 AI 大語言模型與視覺模型，打造具備 **自然語言意圖理解** 與 **UI 截圖比對** 能力的檢索工具。

為符合企業嚴格的資安規範，本專案採用 **「代碼特徵脫敏切片 (Code Slicing)」** 策略。透過抽取元件的介面特徵（Props, Emits, Models）並轉化為中繼 JSON 記憶體，達成 **「零信任 (Zero-Trust) 架構」**——AI 無需讀取任何專案原始碼，即可精準推薦最合適的現有元件，甚至提供架構重構建議。

## ✨ 核心亮點 (Key Features)
- 🛡️ **絕對資安合規**：僅透過 `ota-component-meta.json` 進行特徵比對，真實商業邏輯與原始碼 100% 留存在公司本機內網，無外流風險。
- 👁️ **多模態檢索 (Multi-modal Search)**：
  - **自然語言**：「專案裡有支援多選跟全選的下拉元件嗎？」
  - **視覺辨識**：直接拖曳 Figma / UI 截圖，AI 即可捕捉特徵並匹配現有元件。
- 🎯 **精準架構建議**：不僅回答「有或沒有」，還能針對相似或部分符合的元件給出重構或共用樣式（如功能列）的專家級建議。
- ⚡ **無縫 IDE 整合**：作為全域背景服務掛載於 VS Code，開發者可隨時透過 Copilot / Agent 呼叫，不干擾既有開發流程。

## 🏗️ 系統架構 (Architecture)
1. **Feature Extraction (特徵萃取)**：手動/半自動將 Vue 元件的介面定義檔與 HTML 骨架抽離，建立 `data/ota-component-meta.json`。
2. **MCP Server (伺服器層)**：建構相容於 MCP 協定的 Node.js 伺服器，對接 JSON 記憶體庫。
3. **AI Agent (代理層)**：VS Code 內建 AI 透過 MCP 呼叫檢索工具，結合開發者當下的上下文 (Context) 生成 Top-3 推薦清單與相似度評估。

## 🚀 快速啟動 (Quick Start)
### 系統需求
- Node.js (建議 v20 LTS 以上，使用 NVM 安裝避免權限問題)
- VS Code (並安裝支援 MCP 的 AI Agent 套件)

### 安裝與編譯
```bash
# 1. 安裝依賴套件
npm install

# 2. 編譯 TypeScript 產出執行檔
npm run build

```

### VS Code 掛載設定

請在 VS Code 的 `settings.json` 或 Agent 專屬設定中加入以下配置（路徑請替換為本機絕對路徑）：

```json
"mcpServers": {
  "component-discovery": {
    "command": "node",
    "args": ["/絕對路徑/component-discovery-mcp/dist/index.js"]
  }
}

```

## 📊 效能指標 (KPIs)

* **Top-3 檢索命中率**：≥ 80% (建置中)
* **單次檢索時間**：10 ~ 15 秒 (以運算時間換取高精準度的視覺比對與架構解析)

## 🔜 未來展望 (Roadmap)

* 腳本自動化：開發 AST 掃描腳本，一鍵自動更新 JSON 特徵庫。
* 維度擴充：加入 `styleTokens` (設計系統代幣) 與 `businessContext` (業務場景) 提升模糊搜尋精準度。

```
