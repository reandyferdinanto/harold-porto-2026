import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import dbConnect from '@/lib/mongodb';
import PortfolioData from '@/models/PortfolioData';

// Always fresh — no caching so edits appear immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  try {
    // Query MongoDB directly (server component — no need for HTTP self-fetch)
    await dbConnect();
    const doc = await PortfolioData.findOne().sort({ createdAt: -1 }).lean();
    if (doc) {
      // Serialize the Mongoose document to a plain object
      return JSON.parse(JSON.stringify(doc));
    }
  } catch (error) {
    console.warn('MongoDB unavailable, falling back to static data:', error);
  }

  // Fallback to static data if MongoDB is empty or not connected
  const { siteConfig, aboutData, experienceData, educationData, skillsData, portfolioItems } =
    await import('@/data/portfolio');
  return { siteConfig, aboutData, experienceData, educationData, skillsData, portfolioItems };
}

export default async function Home() {
  const data = await getData();
  return (
    <>
      <Navbar data={data.siteConfig} />
      <Hero data={data.siteConfig} />
      <About data={data.aboutData} />
      <Experience experienceData={data.experienceData} educationData={data.educationData} skillsData={data.skillsData} />
      <Skills skillsData={data.skillsData} />
      <Portfolio items={data.portfolioItems} />
      <Contact siteConfig={data.siteConfig} />
      <Footer data={data.siteConfig} />
    </>
  );
}
