import { Helmet } from 'react-helmet-async';
import LegalShell from './LegalShell';

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund Policy — CertWinX</title>
      </Helmet>
      <LegalShell title="Refund Policy">
        <p>
          This Refund Policy describes the general approach to refunds for professional assistance
          services provided by CertWinX.
        </p>
        <h2>Professional Fees</h2>
        <p>
          Professional fees are communicated in advance. Refund eligibility depends on the stage
          of engagement and the nature of the work performed.
        </p>
        <h2>Government/Statutory Charges</h2>
        <p>
          Government/statutory and third-party charges are typically non-refundable once paid to
          the respective authorities or third parties.
        </p>
        <h2>Refund Requests</h2>
        <p>
          Refund requests should be raised in writing. Each request will be reviewed on its
          merits, in line with the engagement terms.
        </p>
        <h2>Outcomes</h2>
        <p>
          Refunds are not linked to outcomes of government applications, as approvals are
          determined by the relevant authorities.
        </p>
        <p className="text-xs text-muted pt-6">
          This is a general template. Please have it reviewed by a qualified legal professional
          before publishing.
        </p>
      </LegalShell>
    </>
  );
}