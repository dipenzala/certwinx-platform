export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918128931029';
export const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER || '+91 81289 31029';
export const EMAIL = import.meta.env.VITE_EMAIL || 'info@certwinx.com';
export const OFFICE_ADDRESS =
  import.meta.env.VITE_OFFICE_ADDRESS ||
  '7-A Khodiyar Nagar, Near Shivam Gas Agency, Chandlodia, Ahmedabad – 382481, Gujarat, India';
export const WORKING_HOURS = import.meta.env.VITE_WORKING_HOURS || 'Monday–Saturday, 9:00 AM–6:00 PM';
export const WEBSITE = import.meta.env.VITE_WEBSITE || 'www.certwinx.com';

export const getWhatsAppLink = (context = '') => {
  const msg = context
    ? `Hello CertWinX Team, I would like professional assistance regarding ${context}. Please guide me about eligibility, documents and process.`
    : `Hello CertWinX Team, I would like professional assistance regarding your services. Please guide me about eligibility, documents and process.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}; 