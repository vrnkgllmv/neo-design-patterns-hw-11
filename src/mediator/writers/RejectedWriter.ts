import * as fs from "fs/promises";

export class RejectedWriter {
  private records: any[] = [];
  write(record: any, error: string) {
    this.records.push({ record, error });
  }
  async finalize() {
    await fs.mkdir("output", { recursive: true });
    const lines = this.records.map(r => JSON.stringify(r)).join("\n") + "\n";
    await fs.writeFile("output/rejected.jsonl", lines, "utf-8");
  }
}
