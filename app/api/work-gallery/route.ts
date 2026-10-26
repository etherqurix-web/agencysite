import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

// Resolved at build time so it also works on hosts where /public is not readable at runtime.
export const dynamic = 'force-static';

const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

export async function GET() {
  const directory = path.join(process.cwd(), 'public', 'work-gallery');
  try {
    const files = await readdir(directory, { withFileTypes: true });
    const images = files
      .filter((file) => file.isFile() && allowed.has(path.extname(file.name).toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }))
      .map((file) => ({ src: `/work-gallery/${encodeURIComponent(file.name)}`, name: file.name }));
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
