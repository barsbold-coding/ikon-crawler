import chalk from 'chalk';
import fs from 'node:fs/promises';
import path from 'node:path';

class Logger {
  private logPath: string;
  constructor({ logPath }: LoggerOption) {
    this.logPath = path.resolve(process.cwd(), logPath);
  }
  public log(str: any) {
    fs.open(this.logPath)
      .then(((pFile) => {
        pFile.appendFile(str);
      }));
  }
  public static warn(str: any) {
    console.log(chalk.yellow("WARN:  " + str));
  }
  public static error(str: any) {
    console.log(chalk.red("ERR: " + str));
  }
  public static info(str: any) {
    console.log(chalk.blue(str));
  }
  public static success(str: any) {
    console.log(chalk.green('SUCCESS: ' + str));
  }
}

export default Logger;
