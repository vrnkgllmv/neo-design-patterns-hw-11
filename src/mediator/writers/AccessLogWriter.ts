import * as fs from "fs/promises";

export class AccessLogWriter {
  private records: any[] = [];
  write(record: any) {
    const { type, ...rest } = record;
    this.records.push(rest);
  }
  async finalize() {
    await fs.mkdir("output", { recursive: true });
    await fs.writeFile("output/access_logs.json", JSON.stringify(this.records, null, 2), "utf-8");
  }
}
