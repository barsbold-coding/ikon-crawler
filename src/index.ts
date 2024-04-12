import Crawler from './crawler';

async function bootstrap() {
  const baseUrl = 'https://ikon.mn/n/';
  const urls: any[] = [];

  for (let i = 2000; i < 3122; i++) {
    urls.push(`${baseUrl}${i}`);
  }

  const crawler = new Crawler({ urls, dest: './storage/data.json' });
  await crawler.crawl();
}

bootstrap();
