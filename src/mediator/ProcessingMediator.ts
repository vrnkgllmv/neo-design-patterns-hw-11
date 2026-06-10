import { DataRecord } from "../models/DataRecord";
import { AccessLogWriter } from "./writers/AccessLogWriter";
import { TransactionWriter } from "./writers/TransactionWriter";
import { ErrorLogWriter } from "./writers/ErrorLogWriter";
import { RejectedWriter } from "./writers/RejectedWriter";

export class ProcessingMediator {
  private accessLogWriter = new AccessLogWriter();
  private transactionWriter = new TransactionWriter();
  private errorLogWriter = new ErrorLogWriter();
  private rejectedWriter = new RejectedWriter();

  onSuccess(record: DataRecord): void {
    switch (record.type) {
      case "access_log":
        this.accessLogWriter.write(record);
        break;
      case "transaction":
        this.transactionWriter.write(record);
        break;
      case "system_error":
        this.errorLogWriter.write(record);
        break;
      default:
        throw new Error(`Unknown record type: ${(record as any).type}`);
    }
  }

  onRejected(original: DataRecord, error: string): void {
    this.rejectedWriter.write(original, error);
  }

  async finalize(): Promise<void> {
    await Promise.all([
      this.accessLogWriter.finalize(),
      this.transactionWriter.finalize(),
      this.errorLogWriter.finalize(),
      this.rejectedWriter.finalize(),
    ]);
  }
}
