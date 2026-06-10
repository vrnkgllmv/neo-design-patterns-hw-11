import { AbstractHandler } from "../AbstractHandler";
import { BaseRecord } from "../../models/DataRecord";

export class TimestampParser extends AbstractHandler {
  protected process(record: BaseRecord): BaseRecord {
    if (!record.timestamp) {
      throw new Error("Timestamp is missing");
    }
    const date = new Date(record.timestamp);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid timestamp");
    }
    // Convert to ISO string and strip milliseconds
    const isoString = date.toISOString().replace(/\.\d{3}Z$/, "Z");
    return {
      ...record,
      timestamp: isoString,
    };
  }
}
