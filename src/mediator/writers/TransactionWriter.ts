import * as fs from "fs/promises";

export class TransactionWriter {
  private records: any[] = [];
  write(record: any) {
    this.records.push(record);
  }
  async finalize() {
    await fs.mkdir("output", { recursive: true });
    const headers = "timestamp,amount,currency\n";
    const rows = this.records
      .map(r => `${r.timestamp},${r.amount},${r.currency}`)
      .join("\n");
    await fs.writeFile("output/transactions.csv", headers + rows + "\n", "utf-8");
  }
}
