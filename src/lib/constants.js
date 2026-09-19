export const SITE = {
  name: 'CertWinX',
  fullName: 'CertWinX Private Limited',
  tagline: 'Aapki Tarakki Ka Saathi',
  tagline2: 'Bharosa Aapka, Jimmedari Humari',
  phone: '+91 81289 31029',
  whatsapp: '918128931029',
  email: 'info@certwinx.com',
  address: '7-A Khodiyar Nagar, Near Shivam Gas Agency, Chandlodia, Ahmedabad – 382481, Gujarat, India',
  hours: 'Monday–Saturday, 9:00 AM–6:00 PM',
  website: 'www.certwinx.com',
};

export const getWhatsAppLink = (context = '') => {
  const msg = context
    ? `Hello CertWinX Team, I would like professional assistance regarding ${context}. Please guide me about eligibility, documents and process.`
    : `Hello CertWinX Team, I would like professional assistance regarding your services. Please guide me about eligibility, documents and process.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
};

/* ============ CONVENIENCE EXPORTS ============ */
/* Direct access shortcuts — so components can import individually */

export const WHATSAPP_NUMBER = SITE.whatsapp;
export const PHONE_NUMBER = SITE.phone;
export const EMAIL = SITE.email;
export const OFFICE_ADDRESS = SITE.address;
export const WORKING_HOURS = SITE.hours;
export const WEBSITE = SITE.website;