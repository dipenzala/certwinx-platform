export const SITE = {
  name: 'CertWinX',
  fullName: 'CertWinX Private Limited',
  tagline: 'AAPKI TARAKKI KA SAATHI, BHAROSHA APKA, JIMMEDARI HUMARI',
  taglineShort: 'Aapki Tarakki Ka Saathi',
  taglineHindi: 'आपकी तरक्की का साथी, भरोसा आपका, जिम्मेदारी हमारी',
  phone: '+91 81289 31029',
  whatsapp: '918128931029',
  email: 'info@certwinx.com',
  address: '7-A Khodiyar Nagar, Near Shivam Gas Agency, Chandlodia, Ahmedabad – 382481, Gujarat, India',
  hours: 'Monday–Saturday, 9:00 AM–6:00 PM IST',
  website: 'www.certwinx.com',
};

export const getWhatsAppLink = (context = '') => {
  const msg = context
    ? `Hello CertWinX Advisory Team, I would like professional assistance regarding ${context}. Please guide me on eligibility, documentation checklist and execution roadmap.`
    : `Hello CertWinX Advisory Team, I would like professional advisory assistance for my venture. Please guide me regarding available government schemes, DPIIT/80-IAC, and compliance.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
};

/* ============ CONVENIENCE EXPORTS ============ */
export const WHATSAPP_NUMBER = SITE.whatsapp;
export const PHONE_NUMBER = SITE.phone;
export const EMAIL = SITE.email;
export const OFFICE_ADDRESS = SITE.address;
export const WORKING_HOURS = SITE.hours;
export const WEBSITE = SITE.website;
