import { Helmet } from 'react-helmet-async';
import LegalShell from './LegalShell';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — CertWinX</title>
      </Helmet>
      <LegalShell title="Terms & Conditions">
        <p>
          By using this website, you agree to these Terms. If you do not agree, please do not use
          the website.
        </p>
        <h2>Nature of Services</h2>
        <p>
          CertWinX provides professional assistance and consultancy services. We do not guarantee
          any government registration, certification, approval, grant, funding, tax benefit or
          scheme benefit. Such outcomes are subject to applicable eligibility criteria,
          documentation, government rules and decisions of the relevant authorities.
        </p>
        <h2>Information on Website</h2>
        <p>
          Information on this website is for general informational purposes and may change. While
          we aim to keep it current, we make no warranties about its completeness or accuracy.
        </p>
        <h2>Professional Fees</h2>
        <p>
          Where applicable, professional fees are communicated separately. Government/statutory
          and third-party charges may be separate.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          To the extent permitted by law, CertWinX shall not be liable for any indirect or
          consequential loss arising from use of this website or services.
        </p>
        <h2>Governing Law</h2>
        <p>These Terms are governed by the laws of India.</p>
        <p className="text-xs text-muted pt-6">
          This is a general template. Please have it reviewed by a qualified legal professional
          before publishing.
        </p>
      </LegalShell>
    </>
  );
}