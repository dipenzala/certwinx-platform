import { Helmet } from 'react-helmet-async';
import LegalShell from './LegalShell';

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy — CertWinX</title>
      </Helmet>
      <LegalShell title="Cookie Policy">
        <p>
          This Cookie Policy describes how CertWinX uses cookies and similar technologies on this
          website.
        </p>
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files placed on your device to help websites function and to
          collect usage information.
        </p>
        <h2>How We Use Cookies</h2>
        <p>
          We may use cookies for essential functionality, analytics and improving user experience.
        </p>
        <h2>Managing Cookies</h2>
        <p>
          You can manage or disable cookies through your browser settings. Disabling some cookies
          may affect website functionality.
        </p>
        <h2>Third-Party Cookies</h2>
        <p>
          Third-party services (such as analytics) may set their own cookies. Please refer to
          their respective policies.
        </p>
        <p className="text-xs text-muted pt-6">
          This is a general template. Please have it reviewed by a qualified legal professional
          before publishing.
        </p>
      </LegalShell>
    </>
  );
}