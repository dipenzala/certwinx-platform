import { Helmet } from 'react-helmet-async';
import LegalShell from './LegalShell';
export default function PrivacyPolicy() {
  return (
    <>
      <Helmet><title>Privacy Policy — CertWinX</title></Helmet>
      <LegalShell title="Privacy Policy">
        <p>This Privacy Policy describes how CertWinX Private Limited collects, uses and protects information provided by users of this website.</p>
        <h2>Information We Collect</h2>
        <p>We may collect information you provide through enquiry forms, consultation requests and other interactions, such as name, mobile number, email, company details and business information.</p>
        <h2>How We Use Information</h2>
        <p>Information is used to respond to enquiries, provide assistance, communicate about services and improve our offerings.</p>
        <h2>Data Security</h2>
        <p>We take reasonable measures to protect information. No method of transmission or storage is completely secure.</p>
        <h2>Contact</h2>
        <p>For questions about this policy, please contact us through the details on our Contact page.</p>
        <p className="text-xs text-muted pt-6">This is a general template. Please have it reviewed by a qualified legal professional before publishing.</p>
      </LegalShell>
    </>
  );
}