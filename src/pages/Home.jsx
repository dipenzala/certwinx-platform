import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import TrustStrip from '../components/sections/TrustStrip';
import CertificateTicker from '../components/sections/CertificateTicker';
import BusinessNeeds from '../components/sections/BusinessNeeds';
import FeaturedServices from '../components/sections/FeaturedServices';
import IndiaMapExplorer from '../components/sections/IndiaMapExplorer';
import SchemeComparisonTable from '../components/sections/SchemeComparisonTable';
import WhyCertWinX from '../components/sections/WhyCertWinX';
import Section80IAC from '../components/sections/Section80IAC';
import ProcessPinned from '../components/sections/ProcessPinned';
import StatsCounter from '../components/sections/StatsCounter';
import ClientExperience from '../components/sections/ClientExperience';
import FinalCTA from '../components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CertWinX — #1 Startup India & Section 80-IAC Tax Exemption Advisory | 6+ Years Experience</title>
        <meta
          name="description"
          content="CertWinX brings 6+ years of institutional advisory experience across all 28 Indian states. Secure 100% Section 80-IAC 3-year Tax Holiday, Startup India DPIIT recognition, capital grants, and MSME incentives."
        />
        <meta
          name="keywords"
          content="Section 80-IAC tax exemption, Startup India DPIIT recognition, 3 years 100% tax holiday, capital grant consultant, MSME udyam registration, 6 years startup advisory India, Pan India startup consultant, certwinx"
        />
        <link rel="canonical" href="https://certwinx.com/" />
      </Helmet>

      <Hero />
      <CertificateTicker />
      <TrustStrip />
      <BusinessNeeds />
      <FeaturedServices />
      <IndiaMapExplorer />
      <SchemeComparisonTable />
      <WhyCertWinX />
      <Section80IAC />
      <ProcessPinned />
      <StatsCounter />
      <ClientExperience />
      <FinalCTA />
    </>
  );
}
