// ============================================================
// CERTWINX SCHEMES ELIGIBILITY ENGINE
// Comprehensive Evaluation Architecture for Indian Startups & MSMEs
// ============================================================

import { SCHEMES } from './schemes';

export const ELIGIBILITY_RULES = [
  // 1. Startup India Seed Fund Scheme (SISFS)
  { id: 101, scheme_id: 'startup-india-seed-fund', field: 'businessType', operator: 'in', value: ['private-limited', 'llp', 'pvt-ltd'], logic_group: 'AND', active: true },
  { id: 102, scheme_id: 'startup-india-seed-fund', field: 'businessAge', operator: 'in', value: ['less-than-2', 'not-registered'], logic_group: 'AND', active: true },
  { id: 103, scheme_id: 'startup-india-seed-fund', field: 'dpiit', operator: 'in', value: ['yes', 'in-progress', 'planning'], logic_group: 'AND', active: true },

  // 2. Section 80-IAC Tax Exemption
  { id: 201, scheme_id: 'section-80-iac', field: 'businessType', operator: 'in', value: ['private-limited', 'llp', 'pvt-ltd'], logic_group: 'AND', active: true },
  { id: 202, scheme_id: 'section-80-iac', field: 'businessAge', operator: 'in', value: ['less-than-2', '2-5', '5-plus'], logic_group: 'AND', active: true },
  { id: 203, scheme_id: 'section-80-iac', field: 'dpiit', operator: 'in', value: ['yes', 'in-progress'], logic_group: 'AND', active: true },
  { id: 204, scheme_id: 'section-80-iac', field: 'turnover', operator: 'in', value: ['pre-revenue', 'below-1cr', '1cr-10cr', '10cr-50cr', 'below-100cr'], logic_group: 'AND', active: true },

  // 3. Credit Guarantee Scheme for Startups (CGSS)
  { id: 301, scheme_id: 'cgss', field: 'businessType', operator: 'in', value: ['private-limited', 'llp', 'partnership'], logic_group: 'AND', active: true },
  { id: 302, scheme_id: 'cgss', field: 'dpiit', operator: 'in', value: ['yes', 'in-progress'], logic_group: 'AND', active: true },

  // 4. Fund of Funds for Startups (FFS - SIDBI)
  { id: 401, scheme_id: 'ffs-sidbi', field: 'businessType', operator: 'in', value: ['private-limited', 'pvt-ltd'], logic_group: 'AND', active: true },
  { id: 402, scheme_id: 'ffs-sidbi', field: 'dpiit', operator: 'in', value: ['yes', 'in-progress'], logic_group: 'AND', active: true },

  // 5. SAMRIDH Accelerator Scheme (MeitY)
  { id: 501, scheme_id: 'samridh-meity', field: 'industry', operator: 'in', value: ['technology', 'software', 'saas', 'ai', 'all', 'cross-sector'], logic_group: 'AND', active: true },
  { id: 502, scheme_id: 'samridh-meity', field: 'businessType', operator: 'in', value: ['private-limited', 'llp'], logic_group: 'AND', active: true },

  // 6. NIDHI-PRAYAS (DST Hardware/Prototype Grant)
  { id: 601, scheme_id: 'nidhi-prayas', field: 'businessAge', operator: 'in', value: ['not-registered', 'less-than-2', '2-5'], logic_group: 'AND', active: true },
  { id: 602, scheme_id: 'nidhi-prayas', field: 'industry', operator: 'in', value: ['technology', 'hardware', 'deeptech', 'all', 'cross-sector'], logic_group: 'AND', active: true },

  // 7. NIDHI-EIR (DST Fellowship)
  { id: 701, scheme_id: 'nidhi-eir', field: 'businessAge', operator: 'in', value: ['not-registered', 'less-than-2'], logic_group: 'AND', active: true },

  // 8. TIDE 2.0 (MeitY)
  { id: 801, scheme_id: 'tide-2', field: 'industry', operator: 'in', value: ['technology', 'ai', 'iot', 'software', 'all', 'cross-sector'], logic_group: 'AND', active: true },

  // 9. BIRAC Biotechnology Ignition Grant (BIG)
  { id: 901, scheme_id: 'birac-big', field: 'industry', operator: 'in', value: ['healthcare', 'biotech', 'pharma', 'medtech'], logic_group: 'AND', active: true },
  { id: 902, scheme_id: 'birac-big', field: 'businessAge', operator: 'in', value: ['not-registered', 'less-than-2', '2-5'], logic_group: 'AND', active: true },

  // 10. Prime Minister Employment Generation Programme (PMEGP)
  { id: 1001, scheme_id: 'pmegp', field: 'businessType', operator: 'in', value: ['proprietorship', 'partnership', 'private-limited', 'llp', 'not-registered'], logic_group: 'AND', active: true },
  { id: 1002, scheme_id: 'pmegp', field: 'businessAge', operator: 'in', value: ['not-registered', 'less-than-2'], logic_group: 'AND', active: true },

  // 11. CGTMSE (MSME Collateral-Free Loans)
  { id: 1101, scheme_id: 'cgtmse', field: 'businessType', operator: 'in', value: ['proprietorship', 'partnership', 'private-limited', 'llp'], logic_group: 'AND', active: true },

  // 12. MSME ZED Certification Scheme
  { id: 1201, scheme_id: 'msme-zed-scheme', field: 'businessType', operator: 'in', value: ['proprietorship', 'partnership', 'private-limited', 'llp'], logic_group: 'AND', active: true },

  // 13. MSME Lean Manufacturing Scheme
  { id: 1301, scheme_id: 'msme-lean-scheme', field: 'businessType', operator: 'in', value: ['proprietorship', 'partnership', 'private-limited', 'llp'], logic_group: 'AND', active: true },

  // 14. Stand-Up India (Women & SC/ST)
  { id: 1401, scheme_id: 'stand-up-india', field: 'womanEntrepreneur', operator: 'in', value: ['yes', true], logic_group: 'OR', active: true },
  { id: 1402, scheme_id: 'stand-up-india', field: 'businessAge', operator: 'in', value: ['not-registered', 'less-than-2'], logic_group: 'AND', active: true },

  // 15. PM Mudra Yojana
  { id: 1501, scheme_id: 'pm-mudra-yojana', field: 'businessType', operator: 'in', value: ['proprietorship', 'partnership', 'private-limited', 'llp', 'not-registered'], logic_group: 'AND', active: true },

  // 16. RKVY-RAFTAAR (AgriTech)
  { id: 1601, scheme_id: 'rkvy-raftaar', field: 'industry', operator: 'in', value: ['agriculture', 'agritech', 'food-processing'], logic_group: 'AND', active: true },

  // 17. Atal Innovation Mission (AIM)
  { id: 1701, scheme_id: 'aim-atal-incubation', field: 'businessAge', operator: 'in', value: ['not-registered', 'less-than-2', '2-5'], logic_group: 'AND', active: true },

  // 18. Gujarat State Startup Scheme
  { id: 1801, scheme_id: 'gujarat-startup-policy', field: 'businessAge', operator: 'in', value: ['not-registered', 'less-than-2', '2-5'], logic_group: 'AND', active: true },
];

export function evaluateEligibility(userProfile = {}) {
  const results = {
    potentialMatches: [],
    needsMoreInfo: [],
    likelyNotMatch: [],
  };

  SCHEMES.forEach((scheme) => {
    const rules = ELIGIBILITY_RULES.filter((r) => r.scheme_id === scheme.slug && r.active);

    // If no specific rules defined, put in needsMoreInfo
    if (rules.length === 0) {
      results.needsMoreInfo.push({
        scheme,
        missing: ['Detailed profile verification required'],
        matchedCriteria: [],
      });
      return;
    }

    let hasFailed = false;
    let hasMissing = false;
    const missingFields = [];
    const matchedCriteria = [];
    const failedCriteria = [];

    // Group rules by AND / OR
    const groups = { AND: [], OR: [] };
    rules.forEach((rule) => {
      const g = rule.logic_group || 'AND';
      if (!groups[g]) groups[g] = [];
      groups[g].push(rule);
    });

    // Check AND rules: all must pass
    if (groups.AND && groups.AND.length > 0) {
      for (const rule of groups.AND) {
        const userValue = userProfile[rule.field];
        if (userValue === undefined || userValue === null || userValue === '') {
          hasMissing = true;
          if (!missingFields.includes(rule.field)) missingFields.push(rule.field);
          continue;
        }

        const passes = evaluateRule(rule, userValue);
        if (passes) {
          matchedCriteria.push({ field: rule.field, value: userValue, expected: rule.value });
        } else {
          failedCriteria.push({ field: rule.field, value: userValue, expected: rule.value });
          hasFailed = true;
        }
      }
    }

    // Check OR rules: at least one must pass if present
    if (groups.OR && groups.OR.length > 0) {
      let orPassed = false;
      let orMissing = false;

      for (const rule of groups.OR) {
        const userValue = userProfile[rule.field];
        if (userValue === undefined || userValue === null || userValue === '') {
          orMissing = true;
          continue;
        }
        if (evaluateRule(rule, userValue)) {
          orPassed = true;
          matchedCriteria.push({ field: rule.field, value: userValue, expected: rule.value });
        }
      }

      if (!orPassed) {
        if (orMissing) {
          hasMissing = true;
        } else {
          hasFailed = true;
          failedCriteria.push({ field: 'Demographic Criterion', value: 'Not met', expected: 'Woman or SC/ST led' });
        }
      }
    }

    // Categorize
    if (hasFailed && !hasMissing) {
      results.likelyNotMatch.push({ scheme, failedCriteria, matchedCriteria });
    } else if (hasMissing && !hasFailed) {
      results.needsMoreInfo.push({ scheme, missing: missingFields, matchedCriteria });
    } else if (!hasFailed && matchedCriteria.length > 0) {
      results.potentialMatches.push({ scheme, matchedCriteria });
    } else {
      results.needsMoreInfo.push({ scheme, missing: missingFields, matchedCriteria });
    }
  });

  return results;
}

function evaluateRule(rule, userValue) {
  const ruleValue = rule.value;
  const valStr = String(userValue).toLowerCase().trim();

  switch (rule.operator) {
    case 'equals':
      return valStr === String(ruleValue).toLowerCase().trim();
    case 'not_equals':
      return valStr !== String(ruleValue).toLowerCase().trim();
    case 'contains':
      if (Array.isArray(ruleValue)) {
        return ruleValue.some((v) => valStr.includes(String(v).toLowerCase()));
      }
      return valStr.includes(String(ruleValue).toLowerCase());
    case 'in':
      if (Array.isArray(ruleValue)) {
        return ruleValue.some((v) => String(v).toLowerCase() === valStr);
      }
      return valStr === String(ruleValue).toLowerCase();
    case 'greater_than':
      return Number(userValue) > Number(ruleValue);
    case 'less_than':
      return Number(userValue) < Number(ruleValue);
    default:
      return false;
  }
}
