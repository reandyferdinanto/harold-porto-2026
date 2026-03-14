import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { put } from '@vercel/blob';
import path from 'path';

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    // Sanitize filename
    const ext = path.extname(file.name);
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}_${base}${ext}`;

    // Upload directly to Vercel Blob
    const blob = await put(`uploads/${filename}`, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error('Vercel Blob Upload Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error occurred while uploading to Vercel Blob.' },
      { status: 500 }
    );
  }
}
