import { ComponentMeta, MatchQuery, MatchResult } from './types.js';

export function matchComponents(query: MatchQuery, database: ComponentMeta[]): MatchResult[] {
  // 1. 家族過濾 (Family Retrieval)
  const family = database.filter(
    (c) => c.type.toLowerCase() === query.type.toLowerCase()
  );

  // 2. 特徵重疊計算
  const results = family.map((comp) => {
    const directMatched = query.requiredCapabilities.filter((cap) =>
      comp.capabilities.includes(cap)
    );

    // 檢查可透過 Props 開啟之能力 (Configurable Props)
    const propsMatched: string[] = [];
    const neededProps: Record<string, any> = {};

    if (comp.configurableProps) {
      for (const [propName, config] of Object.entries(comp.configurableProps)) {
        if (
          query.requiredCapabilities.includes(config.enablesCapability) &&
          !directMatched.includes(config.enablesCapability)
        ) {
          propsMatched.push(config.enablesCapability);
          neededProps[propName] = true;
        }
      }
    }

    const allMatched = [...new Set([...directMatched, ...propsMatched])];
    const missing = query.requiredCapabilities.filter(
      (cap) => !allMatched.includes(cap)
    );

    const score =
      query.requiredCapabilities.length > 0
        ? Math.round((allMatched.length / query.requiredCapabilities.length) * 100)
        : 0;

    return {
      component: comp,
      score,
      matchedCapabilities: allMatched,
      missingCapabilities: missing,
      requiredPropsHelp:
        Object.keys(neededProps).length > 0 ? neededProps : undefined,
    };
  });

  // 3. 依分數遞減排序，回傳前 3 名
  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}
