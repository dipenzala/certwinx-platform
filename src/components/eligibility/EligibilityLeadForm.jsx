// ============================================================
// EligibilityLeadForm - Mandatory form before results
// User MUST fill this before seeing eligibility results
// ============================================================

import { useState } from 'react';
import { submitLead } from '../../lib/supabase';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function EligibilityLeadForm({ eligibilityData, onSuccess, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-()]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    setSubmitting(true);

    try {
      const result = await submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        subject: 'Eligibility Check - ' + (eligibilityData?.support || 'Business Support'),
        message: `
Eligibility Assessment Request

Profile:
- Business Type: ${eligibilityData?.type || 'Not specified'}
- Business Age: ${eligibilityData?.age || 'Not specified'}
- Support Needed: ${eligibilityData?.support || 'Not specified'}

Contact:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company || 'Not provided'}
        `.trim(),
        source: 'eligibility-flow',
      });

      if (result.success) {
        // Save contact info in localStorage for results page
        localStorage.setItem('eligibility_lead', JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }));
        onSuccess?.();
      } else {
        setApiError(result.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error('Form error:', err);
      setApiError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase">
              One Last Step
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Get Your Eligibility Results
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Fill in your details to unlock personalized eligibility results and recommendations.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8"
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rajesh Kumar"
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              disabled={submitting}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rajesh@company.com"
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              disabled={submitting}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              disabled={submitting}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.phone}
              </p>
            )}
          </div>

          {/* Company (Optional) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Company Name <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. ABC Pvt Ltd"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={submitting}
            />
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                View My Results <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Back */}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={submitting}
              className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              ← Back to options
            </button>
          )}

          {/* Trust note */}
          <p className="mt-4 text-xs text-center text-gray-500">
            🔒 Your information is safe. We'll only use it to provide your results.
          </p>
        </form>
      </div>
    </div>
  );
}
