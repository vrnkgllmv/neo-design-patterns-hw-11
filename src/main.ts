import * as fs from "fs/promises";
import * as path from "path";
import { buildAccessLogChain } from "./chain/chains/AccessLogChain";
import { buildTransactionChain } from "./chain/chains/TransactionChain";
import { buildSystemErrorChain } from "./chain/chains/SystemErrorChain";
import { ProcessingMediator } from "./mediator/ProcessingMediator";
import { DataRecord } from "./models/DataRecord";

const handlerMap = {
  access_log: buildAccessLogChain,
  transaction: buildTransactionChain,
  system_error: buildSystemErrorChain,
};

async function main() {
  const mediator = new ProcessingMediator();

  let totalRecords = 0;
  let successCount = 0;
  let rejectedCount = 0;

  try {
    const dataPath = path.join(__dirname, "../data/records.json");
    const rawData = await fs.readFile(dataPath, "utf-8");
    const records: DataRecord[] = JSON.parse(rawData);

    totalRecords = records.length;

    for (const record of records) {
      const builder = handlerMap[record.type];
      if (!builder) {
        mediator.onRejected(record, `Unknown record type: ${record.type}`);
        rejectedCount++;
        continue;
      }

      try {
        const chain = builder();
        // Handle a copy to protect original object from partial mutation in chains
        const processed = chain.handle({ ...record });
        mediator.onSuccess(processed);
        successCount++;
      } catch (error: any) {
        mediator.onRejected(record, error.message || "Validation failed");
        rejectedCount++;
      }
    }
  } catch (err: any) {
    console.error("Failed to read or parse input data:", err.message);
    return;
  }

  try {
    await mediator.finalize();
    console.log(`[INFO] Завантажено записів: ${totalRecords}`);
    console.log(`[INFO] Успішно оброблено: ${successCount}`);
    console.log(`[WARN] Відхилено з помилками: ${rejectedCount}`);
    console.log(`[INFO] Звіт збережено у директорії output/`);
  } catch (err: any) {
    console.error("Failed to finalize outputs:", err.message);
  }
}

main();
