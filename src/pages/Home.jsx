import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import TrustStrip from '../components/sections/TrustStrip';
import CertificateTicker from '../components/sections/CertificateTicker';
import BusinessNeeds from '../components/sections/BusinessNeeds';
import FeaturedServices from '../components/sections/FeaturedServices';
import SchemeFinder from '../components/sections/SchemeFinder';
import WhyCertWinX from '../components/sections/WhyCertWinX';
import Section80IAC from '../components/sections/Section80IAC';
import ProcessPinned from '../components/sections/ProcessPinned';
import StatsCounter from '../components/sections/StatsCounter';
import FinalCTA from '../components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CertWinX — Build Your Business. Unlock Government Benefits.</title>
        <meta
          name="description"
          content="CertWinX provides professional assistance for business registration, DPIIT, Section 80-IAC, Udyam/MSME, GST, FSSAI, ISO, IEC, GeM, government schemes, funding and business compliance."
        />
        <link rel="canonical" href="https://www.certwinx.com/" />
      </Helmet>

      <Hero />
      <CertificateTicker />
      <TrustStrip />
      <BusinessNeeds />
      <FeaturedServices />
      <SchemeFinder />
      <WhyCertWinX />
      <Section80IAC />
      <ProcessPinned />
      <StatsCounter />
      <FinalCTA />
    </>
  );
}