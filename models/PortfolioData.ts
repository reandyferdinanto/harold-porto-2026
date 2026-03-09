import mongoose from 'mongoose';

const PortfolioDataSchema = new mongoose.Schema({
  siteConfig: mongoose.Schema.Types.Mixed,
  aboutData: mongoose.Schema.Types.Mixed,
  experienceData: [mongoose.Schema.Types.Mixed],
  educationData: [mongoose.Schema.Types.Mixed],
  skillsData: [mongoose.Schema.Types.Mixed],
  portfolioItems: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

export default mongoose.models.PortfolioData || mongoose.model('PortfolioData', PortfolioDataSchema);
