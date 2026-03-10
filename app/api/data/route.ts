import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readData as readFallbackData } from '@/lib/data';
import dbConnect from '@/lib/mongodb';
import PortfolioData from '@/models/PortfolioData';

export async function GET() {
  try {
    // Attempt to connect to MongoDB and read data
    await dbConnect();
    const doc = await PortfolioData.findOne().sort({ createdAt: -1 }).lean();

    // If we have saved data in MongoDB, return it
    if (doc) {
      return NextResponse.json(doc);
    }
  } catch (error) {
    console.warn('MongoDB not configured or connection failed. Falling back to local data.');
  }

  // Fallback to local JSON if MongoDB is empty or not connected
  const data = readFallbackData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await dbConnect();

    // Extract only the content fields (strip out MongoDB internal fields)
    const contentFields = {
      siteConfig: body.siteConfig,
      aboutData: body.aboutData,
      experienceData: body.experienceData,
      educationData: body.educationData,
      skillsData: body.skillsData,
      portfolioItems: body.portfolioItems,
    };

    // Check if any portfolio data document exists
    const doc = await PortfolioData.findOne();
    if (doc) {
      // Overwrite the entire document content (not partial $set)
      await PortfolioData.findByIdAndUpdate(
        doc._id,
        { $set: contentFields },
        { new: true, overwrite: false }
      );
    } else {
      // Create new document for the first time
      await PortfolioData.create(contentFields);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
