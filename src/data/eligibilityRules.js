import { SCHEMES } from './schemes';

export const ELIGIBILITY_RULES = [
  { id: 1, scheme_id: 'startup-india-seed-fund', field: 'dpiit', operator: 'equals', value: 'yes', logic_group: 'AND', priority: 1, active: true },
  { id: 2, scheme_id: 'startup-india-seed-fund', field: 'businessAge', operator: 'in', value: ['less-than-2', 'not-incorporated'], logic_group: 'AND', priority: 2, active: true },
  { id: 3, scheme_id: 'startup-india-seed-fund', field: 'businessType', operator: 'contains', value: ['private-limited', 'llp'], logic_group: 'AND', priority: 3, active: true },
  { id: 4, scheme_id: 'cgss', field: 'dpiit', operator: 'equals', value: 'yes', logic_group: 'AND', priority: 1, active: true },
  { id: 5, scheme_id: 'cgss', field: 'businessType', operator: 'contains', value: ['private-limited', 'llp'], logic_group: 'AND', priority: 2, active: true },
  { id: 6, scheme_id: 'pmegp', field: 'businessType', operator: 'in', value: ['proprietorship', 'partnership', 'private-limited', 'llp'], logic_group: 'AND', priority: 1, active: true },
  { id: 7, scheme_id: 'pmegp', field: 'businessAge', operator: 'in', value: ['not-incorporated', 'less-than-2'], logic_group: 'AND', priority: 2, active: true },
  { id: 9, scheme_id: 'stand-up-india', field: 'womanEntrepreneur', operator: 'equals', value: 'yes', logic_group: 'OR', priority: 1, active: true },
  { id: 10, scheme_id: 'stand-up-india', field: 'businessAge', operator: 'equals', value: 'not-incorporated', logic_group: 'AND', priority: 2, active: true },
  { id: 11, scheme_id: 'cgtmse', field: 'businessType', operator: 'contains', value: ['proprietorship', 'partnership', 'private-limited', 'llp'], logic_group: 'AND', priority: 1, active: true },
  { id: 12, scheme_id: 'nidhi', field: 'industry', operator: 'equals', value: 'technology', logic_group: 'AND', priority: 1, active: true },
  { id: 13, scheme_id: 'tide-2', field: 'industry', operator: 'equals', value: 'technology', logic_group: 'AND', priority: 1, active: true },
  { id: 14, scheme_id: 'rkvy-raftaar', field: 'industry', operator: 'equals', value: 'agriculture', logic_group: 'AND', priority: 1, active: true },
];

export function evaluateEligibility(userProfile) {
  const results = { potentialMatches: [], needsMoreInfo: [], likelyNotMatch: [] };

  SCHEMES.forEach((scheme) => {
    const rules = ELIGIBILITY_RULES.filter((r) => r.scheme_id === scheme.slug && r.active);
    if (rules.length === 0) {
      results.needsMoreInfo.push({ scheme, missing: ['Eligibility criteria not defined in database'] });
      return;
    }

    let hasFailed = false;
    let hasMissing = false;
    const missingFields = [];
    const matchedCriteria = [];
    const failedCriteria = [];

    const groups = {};
    rules.forEach((rule) => {
      if (!groups[rule.logic_group]) groups[rule.logic_group] = [];
      groups[rule.logic_group].push(rule);
    });

    Object.entries(groups).forEach(([groupName, groupRules]) => {
      let groupResult = groupName === 'AND';

      groupRules.forEach((rule) => {
        const userValue = userProfile[rule.field];
        if (userValue === undefined || userValue === null || userValue === '') {
          hasMissing = true;
          if (!missingFields.includes(rule.field)) missingFields.push(rule.field);
          return;
        }
        const passes = evaluateRule(rule, userValue);
        if (passes) matchedCriteria.push({ field: rule.field, value: rule.value });
        else failedCriteria.push({ field: rule.field, value: rule.value });

        if (groupName === 'AND') groupResult = groupResult && passes;
        else groupResult = groupResult || passes;
      });

      if (groupName === 'AND' && !groupResult) hasFailed = true;
      if (groupName === 'OR' && !groupResult && !hasMissing) hasFailed = true;
    });

    if (hasFailed && !hasMissing) {
      results.likelyNotMatch.push({ scheme, failedCriteria, matchedCriteria });
    } else if (hasMissing) {
      results.needsMoreInfo.push({ scheme, missing: missingFields, matchedCriteria });
    } else {
      results.potentialMatches.push({ scheme, matchedCriteria });
    }
  });

  return results;
}

function evaluateRule(rule, userValue) {
  const ruleValue = rule.value;
  switch (rule.operator) {
    case 'equals':
      return String(userValue).toLowerCase() === String(ruleValue).toLowerCase();
    case 'not_equals':
      return String(userValue).toLowerCase() !== String(ruleValue).toLowerCase();
    case 'contains':
      if (Array.isArray(ruleValue)) {
        return ruleValue.some((v) => String(userValue).toLowerCase().includes(String(v).toLowerCase()));
      }
      return String(userValue).toLowerCase().includes(String(ruleValue).toLowerCase());
    case 'greater_than':
      return Number(userValue) > Number(ruleValue);
    case 'less_than':
      return Number(userValue) < Number(ruleValue);
    case 'between':
      return Number(userValue) >= Number(ruleValue[0]) && Number(userValue) <= Number(ruleValue[1]);
    case 'in':
      return Array.isArray(ruleValue) && ruleValue.some((v) => String(userValue).toLowerCase() === String(v).toLowerCase());
    default:
      return false;
  }
}