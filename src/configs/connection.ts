import mongoose, { ConnectOptions } from "mongoose";

const options = {
  serverSelectionTimeoutMS: 3000,
};

class dbInit {
  private readonly log: any;
  constructor(log: any) {
    this.log = log;
  }
  public connect(DB_URL: string) {
    const log = this.log;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(DB_URL, options)
      .then(async () => {
        log.info("Successfully connected to " + DB_URL);
      })
      .catch((err: any) => {
        log.error(`There was a database connection error`, err);
        process.exit(0);
      });

    mongoose.connection.once("disconnected", () => {
      log.error("Sucessfully disconnected from" + DB_URL);
    });
    process.on("SIGINT", () => {
      mongoose.connection.close().then(() => {
        log.error("database connection closed due to app termination");
        process.exit(0);
      });
    });
  }
}

export default dbInit;
