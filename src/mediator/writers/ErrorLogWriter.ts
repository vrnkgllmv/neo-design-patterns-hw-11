import * as fs from "fs/promises";

export class ErrorLogWriter {
  private records: any[] = [];
  write(record: any) {
    const { type, ...rest } = record;
    this.records.push(rest);
  }
  async finalize() {
    await fs.mkdir("output", { recursive: true });
    const lines = this.records.map(r => JSON.stringify(r)).join("\n") + "\n";
    await fs.writeFile("output/errors.jsonl", lines, "utf-8");
  }
}
