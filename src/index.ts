import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { matchComponents } from './matcher.js';
import { ComponentMeta } from './types.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 優先載入真實 OTA 資料，若無則降級為 mock 資料
const realDataPath = path.resolve(__dirname, '../data/ota-component-meta.json');
const mockDataPath = path.resolve(__dirname, '../data/mock-components.json');
const dataPath = fs.existsSync(realDataPath) ? realDataPath : mockDataPath;

const componentDb: ComponentMeta[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const server = new Server(
  { name: 'component-discovery-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'find_existing_components',
      description: '依據 UI 家族類型與功能特徵，搜尋專案中既有的 Vue 元件',
      inputSchema: {
        type: 'object',
        properties: {
          type: { type: 'string', description: '元件家族，例如 select' },
          requiredCapabilities: {
            type: 'array',
            items: { type: 'string' },
            description: '功能特徵清單，例如 ["multiple-selection", "select-all"]'
          }
        },
        required: ['type', 'requiredCapabilities']
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'find_existing_components') {
    const args = request.params.arguments as any;
    const matches = matchComponents(args, componentDb);
    return {
      content: [{ type: 'text', text: JSON.stringify(matches, null, 2) }]
    };
  }
  throw new Error(`Tool not found: ${request.params.name}`);
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch(console.error);
