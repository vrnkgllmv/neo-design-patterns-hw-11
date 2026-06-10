import { AbstractHandler } from "../AbstractHandler";
import { AccessLogRecord } from "../../models/DataRecord";

export class IpValidator extends AbstractHandler {
  protected process(record: AccessLogRecord): AccessLogRecord {
    if (!record.ip || typeof record.ip !== "string") {
      throw new Error("Invalid IP address");
    }

    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = record.ip.match(ipv4Regex);
    if (!match) {
      throw new Error("Invalid IP address");
    }

    for (let i = 1; i <= 4; i++) {
      const octet = parseInt(match[i], 10);
      if (octet < 0 || octet > 255) {
        throw new Error("Invalid IP address");
      }
    }

    return record;
  }
}
