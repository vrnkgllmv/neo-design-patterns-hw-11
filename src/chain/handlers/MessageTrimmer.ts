import { AbstractHandler } from "../AbstractHandler";
import { SystemErrorRecord } from "../../models/DataRecord";

export class MessageTrimmer extends AbstractHandler {
  protected process(record: SystemErrorRecord): SystemErrorRecord {
    if (record.message === undefined || record.message === null || typeof record.message !== "string") {
      throw new Error("Invalid message");
    }

    let message = record.message.trim();
    if (message.length > 255) {
      message = message.substring(0, 255);
    }

    return {
      ...record,
      message,
    };
  }
}
