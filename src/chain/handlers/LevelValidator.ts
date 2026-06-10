import { AbstractHandler } from "../AbstractHandler";
import { SystemErrorRecord } from "../../models/DataRecord";

export class LevelValidator extends AbstractHandler {
  private validLevels = new Set(["info", "warning", "critical"]);

  protected process(record: SystemErrorRecord): SystemErrorRecord {
    if (!record.level || typeof record.level !== "string") {
      throw new Error("Invalid error level");
    }

    const level = record.level.trim().toLowerCase();
    if (!this.validLevels.has(level)) {
      throw new Error("Invalid error level");
    }

    return {
      ...record,
      level: level as "info" | "warning" | "critical",
    };
  }
}
