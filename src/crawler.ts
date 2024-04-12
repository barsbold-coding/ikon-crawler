import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import Logger from './logger';

class Crawler {
  private urls;
  private path;
  constructor({ urls, dest }: CrawlerOptions) {
    if (Array.isArray(urls))
      this.urls = urls;
    else this.urls = [urls];

    this.path = path.resolve(process.cwd(), dest);
  }

  private async write(obj: any) {
    await fs.writeFile(this.path, JSON.stringify(obj));
    Logger.success('written into ' + this.path);
  }

  public async crawl() {
    const browser = await puppeteer.launch({ headless: false });
    try {
      const page = await browser.newPage();
      const data: any[] = [];
      
      for (const url of this.urls) {
        await page.goto(url);
        const text = await page.evaluate(() => {
          console.log('hello');
          const element = document.querySelector('.icontent');
          if (element) {
            console.log('return');
            return element.textContent;
          } else {
            console.log('failed');
          }
        });
        console.log(text);
        data.push({
          url,
          content: text,
          date: new Date(),
        });
        Logger.info('crawled ' + url + ' page');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      await this.write(data);
    } catch (err) {
      Logger.error("Error occured while opening url");
      Logger.error(err);
    } finally {
      await browser.close();
    }
  }
}

export default Crawler;
