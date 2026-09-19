import { Helmet } from 'react-helmet-async';
import LegalShell from './LegalShell';

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer — CertWinX</title>
      </Helmet>
      <LegalShell title="Disclaimer">
        <p className="text-ink font-medium">
          CertWinX provides professional assistance and consultancy services. Government
          registrations, certifications, approvals, grants, funding, tax benefits and scheme
          benefits are subject to applicable eligibility criteria, documentation, government rules
          and decisions of the relevant authorities. Information provided on this website is for
          general informational purposes and may change.
        </p>
        <h2>No Guarantee of Approval</h2>
        <p>
          CertWinX does not guarantee any government approval, registration, certification,
          funding or benefit. Final decisions rest with the relevant authorities.
        </p>
        <h2>No Government Affiliation</h2>
        <p>
          CertWinX is a private professional services platform. We are not a government body and
          do not claim any government affiliation or partnership.
        </p>
        <h2>Scheme Information</h2>
        <p>
          Scheme information on this website is provided for general informational purposes.
          Always refer to the official source for the latest and authoritative information.
        </p>
      </LegalShell>
    </>
  );
}