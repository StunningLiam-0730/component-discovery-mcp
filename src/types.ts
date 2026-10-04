export interface ComponentMeta {
  name: string;
  filePath: string;
  type: string;                    // 如 "select", "date-picker", "modal"
  structure: string[];             // 如 ["dropdown-menu", "checkbox-list"]
  capabilities: string[];          // 如 ["multiple-selection", "select-all"]
  configurableProps?: Record<string, { enablesCapability: string }>;
  props: Record<string, any>;
  emits: string[];
}

export interface MatchQuery {
  type: string;
  requiredCapabilities: string[];
}

export interface MatchResult {
  component: ComponentMeta;
  score: number;                   // 0 ~ 100
  matchedCapabilities: string[];
  missingCapabilities: string[];
  requiredPropsHelp?: Record<string, any>;
}
