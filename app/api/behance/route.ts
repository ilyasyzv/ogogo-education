import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const url = `https://www.behance.net/${userId}`;

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const projects = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.ContentGrid-gridItem-XZq')).map((project) => ({
        title: project.querySelector('.Title-title-lpJ')?.textContent || 'No title',
        cover: (project.querySelector('.ProjectCoverNeue-image-TFB') as HTMLImageElement)?.src || '',
        url: (project.querySelector('.ProjectCoverNeue-coverLink-U39') as HTMLAnchorElement)?.href || '',
        owner: project.querySelector('.Owners-owner-EEG')?.textContent || 'Unknown',
        appreciations: project.querySelector('.Stats-stats-Q1s span[title]')?.textContent || '0',
        views: project.querySelectorAll('.Stats-stats-Q1s span[title]')[1]?.textContent || '0',
      }))
    );

    await browser.close();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('[GET_FETCH_BEHANCE]', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
