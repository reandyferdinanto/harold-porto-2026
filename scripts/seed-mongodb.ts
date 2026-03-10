/**
 * Seed script — pushes data/content.json into MongoDB Atlas.
 *
 * Usage:
 *   npx tsx scripts/seed-mongodb.ts
 *
 * Make sure .env.local has a valid MONGODB_URI before running.
 */

import dns from 'dns';
// Use public DNS to resolve MongoDB Atlas SRV records reliably
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually (without dotenv dependency)
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        const key = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim();
        if (!process.env[key]) {
            process.env[key] = value;
        }
    }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

// Read content.json
const contentPath = path.join(process.cwd(), 'data', 'content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

// Define the schema (same as models/PortfolioData.ts)
const PortfolioDataSchema = new mongoose.Schema({
    siteConfig: mongoose.Schema.Types.Mixed,
    aboutData: mongoose.Schema.Types.Mixed,
    experienceData: [mongoose.Schema.Types.Mixed],
    educationData: [mongoose.Schema.Types.Mixed],
    skillsData: [mongoose.Schema.Types.Mixed],
    portfolioItems: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

const PortfolioData = mongoose.models.PortfolioData || mongoose.model('PortfolioData', PortfolioDataSchema);

async function seed() {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI as string, {
        serverSelectionTimeoutMS: 15000,
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Check if data already exists
    const existing = await PortfolioData.findOne();
    if (existing) {
        console.log('⚠️  Data already exists in MongoDB. Updating...');
        await PortfolioData.findByIdAndUpdate(existing._id, content);
        console.log('✅ Existing document updated with content.json data');
    } else {
        await PortfolioData.create(content);
        console.log('✅ Seeded MongoDB with content.json data');
    }

    // Verify
    const doc = await PortfolioData.findOne();
    console.log(`📦 Document ID: ${doc?._id}`);
    console.log(`📦 Portfolio Items: ${doc?.portfolioItems?.length || 0}`);
    console.log(`📦 Skills: ${doc?.skillsData?.length || 0}`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
