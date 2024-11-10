// pages/api/fetchBehance.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

type Project = {
  title: string;
  cover: string;
  url: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = 'https://www.behance.net/6fa1a9c3';

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const projects: Project[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.Project-card')).map((project) => ({
        title: project.querySelector('.Project-title')?.textContent || 'No title',
        cover: project.querySelector('.Project-cover img')?.getAttribute('src') || '',
        url: project.querySelector('a')?.href || '',
      }))
    );

    await browser.close();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}
