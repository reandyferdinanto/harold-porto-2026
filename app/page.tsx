import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';

// Always fresh — no caching so edits appear immediately
export const dynamic = 'force-dynamic';

async function getData() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${base}/api/data`, { cache: 'no-store' });
    return res.json();
  } catch {
    // fallback to static data if API unavailable (e.g. during build)
    const { siteConfig, aboutData, experienceData, educationData, skillsData, portfolioItems } =
      await import('@/data/portfolio');
    return { siteConfig, aboutData, experienceData, educationData, skillsData, portfolioItems };
  }
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
