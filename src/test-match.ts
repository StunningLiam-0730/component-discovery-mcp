import { matchComponents } from './matcher.js';
import { ComponentMeta } from './types.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockDataPath = path.resolve(__dirname, '../data/mock-components.json');
const database: ComponentMeta[] = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));

console.log('=== 測試案例：搜尋多選與全選下拉選單 ===');
const query = {
  type: 'select',
  requiredCapabilities: ['multiple-selection', 'select-all']
};

const results = matchComponents(query, database);
console.log(JSON.stringify(results, null, 2));

if (results[0]?.component.name === 'MockSpecialSelect' && results[0].score === 100) {
  console.log('\n[PASS] 演算法成功優先推薦 MockSpecialSelect (匹配度 100%)');
} else {
  console.error('\n[FAIL] 演算法比對結果不符預期');
  process.exit(1);
}
