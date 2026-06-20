import {
  DEFAULT_TOOL_PLAYBOOK,
  TOOL_AUTOMATION_PLAYBOOK,
} from "./constants";
import type { DetectedTool } from "./types";

export function enrichDetectedTools(tools: DetectedTool[]): DetectedTool[] {
  return tools.map((tool) => {
    const playbook = TOOL_AUTOMATION_PLAYBOOK[tool.id] ?? DEFAULT_TOOL_PLAYBOOK;
    return {
      ...tool,
      automationSuggestion: playbook.automationSuggestion,
      savingsNote: playbook.savingsNote,
    };
  });
}
