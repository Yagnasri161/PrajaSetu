import { CitizenProfile, EligibilityRule, MatchResult, Scheme } from "./types";

export function evaluateSchemeEligibility(
  profile: CitizenProfile,
  scheme: Scheme
): MatchResult {
  const rules = scheme.rules || [];
  const documents = scheme.documents || [];

  if (rules.length === 0) {
    // If no rules are stored, default to general citizen eligibility
    return {
      scheme,
      score: 75,
      status: "possible",
      matchedRules: [],
      failedRules: [],
      missingInformation: [],
      explanationEn: "Scheme criteria is open to general citizens. Detailed verification required.",
      explanationTe: "పథకం నిబంధనలు సాధారణ పౌరులకు వర్తిస్తాయి. మరింత సమాచారం అవసరం.",
      documentReadiness: calculateDocReadiness(profile, documents),
    };
  }

  const matchedRules: { rule: EligibilityRule; reasonEn: string; reasonTe: string }[] = [];
  const failedRules: { rule: EligibilityRule; reasonEn: string; reasonTe: string }[] = [];
  const missingInformation: { rule: EligibilityRule; field: string; questionEn: string; questionTe: string }[] = [];

  let requiredWeight = 0;
  let earnedWeight = 0;
  let hasDisqualifyingFailure = false;

  for (const rule of rules) {
    const weight = rule.required ? 20 : 10;
    requiredWeight += weight;

    const userValue = (profile as any)[rule.field];

    // Case 1: Value is unknown / missing in profile
    if (userValue === null || userValue === undefined) {
      missingInformation.push({
        rule,
        field: rule.field,
        questionEn: `Please provide information about: ${rule.description_en}`,
        questionTe: `దయచేసి ఈ సమాచారాన్ని తెలియజేయండి: ${rule.description_te}`,
      });
      // Partial credit for non-disqualified unknown fields (assumed possible)
      earnedWeight += weight * 0.5;
      continue;
    }

    // Case 2: Evaluate operator
    let isMatch = false;

    switch (rule.operator) {
      case "equals":
        if (rule.value_text !== null && rule.value_text !== undefined) {
          isMatch = String(userValue).trim().toLowerCase() === String(rule.value_text).trim().toLowerCase();
        }
        break;

      case "not_equals":
        if (rule.value_text !== null && rule.value_text !== undefined) {
          isMatch = String(userValue).trim().toLowerCase() !== String(rule.value_text).trim().toLowerCase();
        }
        break;

      case "boolean":
        if (rule.value_boolean !== null && rule.value_boolean !== undefined) {
          isMatch = Boolean(userValue) === Boolean(rule.value_boolean);
        }
        break;

      case "lte":
        if (rule.value_number !== null && rule.value_number !== undefined) {
          isMatch = Number(userValue) <= Number(rule.value_number);
        }
        break;

      case "gte":
        if (rule.value_number !== null && rule.value_number !== undefined) {
          isMatch = Number(userValue) >= Number(rule.value_number);
        }
        break;

      case "lt":
        if (rule.value_number !== null && rule.value_number !== undefined) {
          isMatch = Number(userValue) < Number(rule.value_number);
        }
        break;

      case "gt":
        if (rule.value_number !== null && rule.value_number !== undefined) {
          isMatch = Number(userValue) > Number(rule.value_number);
        }
        break;

      case "in":
        if (rule.value_text) {
          const allowed = rule.value_text.split(",").map((s) => s.trim().toLowerCase());
          isMatch = allowed.includes(String(userValue).trim().toLowerCase());
        }
        break;

      default:
        isMatch = false;
    }

    if (isMatch) {
      matchedRules.push({
        rule,
        reasonEn: `Satisfied: ${rule.description_en}`,
        reasonTe: `సరిపోయింది: ${rule.description_te}`,
      });
      earnedWeight += weight;
    } else {
      failedRules.push({
        rule,
        reasonEn: `Did not meet: ${rule.description_en}`,
        reasonTe: `సరిపోలలేదు: ${rule.description_te}`,
      });
      if (rule.required) {
        hasDisqualifyingFailure = true;
      }
    }
  }

  // Calculate score percentage
  let rawScore = requiredWeight > 0 ? Math.round((earnedWeight / requiredWeight) * 100) : 50;

  // Scoring logic as per guidelines:
  // 100: all known required criteria satisfied with zero missing or failed
  // 90-99: very strong match (all required satisfied, minor secondary missing)
  // 75-89: strong match
  // 50-74: possible / missing information
  // < 50: unlikely / disqualified
  let finalScore: number;
  let status: "excellent" | "good" | "possible" | "unlikely";

  if (hasDisqualifyingFailure) {
    finalScore = Math.min(rawScore, 42); // Below 50
    status = "unlikely";
  } else if (failedRules.length === 0 && missingInformation.length === 0) {
    finalScore = 100;
    status = "excellent";
  } else if (failedRules.length === 0 && missingInformation.length === 1) {
    finalScore = Math.max(90, Math.min(rawScore, 95));
    status = "excellent";
  } else if (failedRules.length === 0) {
    finalScore = Math.max(75, Math.min(rawScore, 88));
    status = "good";
  } else {
    finalScore = Math.max(50, Math.min(rawScore, 72));
    status = "possible";
  }

  // Explanations
  let explanationEn = "";
  let explanationTe = "";

  if (status === "excellent") {
    explanationEn = `You meet all primary criteria for ${scheme.name_en}. Your profile strongly matches official Telangana government requirements.`;
    explanationTe = `${scheme.name_te} కోసం మీ ప్రొఫైల్ ప్రాథమిక అధికారిక నిబంధనలను సంపూర్ణంగా సంతృప్తిపరుస్తుంది.`;
  } else if (status === "good") {
    explanationEn = `Strong potential match. You satisfy the main qualifications for ${scheme.name_en}, with a few non-critical details pending verification.`;
    explanationTe = `${scheme.name_te} కు బలమైన అవకాశం ఉంది. ప్రధాన నిబంధనలు సరిపోయాయి, కొన్ని వివరాలను నిర్ధారించుకోవాల్సి ఉంది.`;
  } else if (status === "possible") {
    explanationEn = `Possible match. We need a few more details to confirm whether you qualify for ${scheme.name_en}.`;
    explanationTe = `అర్హత సాధించే అవకాశం ఉంది. ${scheme.name_te} కోసం మరింత సమాచారాన్ని నిర్ధారించాల్సి ఉంది.`;
  } else {
    explanationEn = `Unlikely match based on known information. One or more mandatory eligibility criteria were not met.`;
    explanationTe = `తెలిసిన సమాచారం ప్రకారం అర్హత సరిపోలడం లేదు. ఒకటి లేదా అంతకంటే ఎక్కువ తప్పనిసరి నిబంధనలు సరిపోలలేదు.`;
  }

  return {
    scheme,
    score: finalScore,
    status,
    matchedRules,
    failedRules,
    missingInformation,
    explanationEn,
    explanationTe,
    documentReadiness: calculateDocReadiness(profile, documents),
  };
}

function calculateDocReadiness(profile: CitizenProfile, documents: Scheme["documents"] = []) {
  if (!documents || documents.length === 0) {
    return { total: 0, ready: 0, missing: [], percentage: 100 };
  }

  const heldSet = new Set((profile.documents_held || []).map((d) => d.toLowerCase()));
  
  // Implicitly held based on profile booleans:
  if (profile.has_aadhaar) heldSet.add("aadhaar");
  if (profile.has_ration_card) {
    heldSet.add("ration card");
    heldSet.add("food security card");
  }
  if (profile.has_income_certificate) heldSet.add("income certificate");
  if (profile.farmer_status && (profile.land_acres || 0) > 0) heldSet.add("land passbook");
  if (profile.student_status) heldSet.add("bonafide");

  let readyCount = 0;
  const missing: string[] = [];

  for (const doc of documents) {
    const docName = doc.document_name_en.toLowerCase();
    const isPresent = Array.from(heldSet).some((h) => docName.includes(h) || h.includes(docName));
    if (isPresent) {
      readyCount++;
    } else {
      missing.push(doc.document_name_en);
    }
  }

  const percentage = Math.round((readyCount / documents.length) * 100);

  return {
    total: documents.length,
    ready: readyCount,
    missing,
    percentage,
  };
}

export function matchAllSchemes(profile: CitizenProfile, schemes: Scheme[]): MatchResult[] {
  const results = schemes.map((scheme) => evaluateSchemeEligibility(profile, scheme));
  // Sort by match percentage descending
  return results.sort((a, b) => b.score - a.score);
}
