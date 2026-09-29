export interface CitizenProfile {
  age?: number | null;
  gender?: "male" | "female" | "transgender" | "other" | null;
  state?: string | null;
  district?: string | null;
  annual_income?: number | null;
  occupation?: string | null;
  category?: "SC" | "ST" | "BC" | "EBC" | "Minority" | "General" | null;
  marital_status?: "unmarried" | "married" | "widow" | "divorced" | null;
  student_status?: boolean | null;
  farmer_status?: boolean | null;
  land_acres?: number | null;
  owns_house?: boolean | null;
  electricity_units?: number | null;
  has_ration_card?: boolean | null;
  has_aadhaar?: boolean | null;
  has_income_certificate?: boolean | null;
  disability?: boolean | null;
  children?: number | null;
  senior_citizen?: boolean | null;
  seeking_marriage_aid?: boolean | null;
  documents_held?: string[];
  other_relevant_fields?: Record<string, any>;
}

export type RuleOperator = "lte" | "gte" | "equals" | "not_equals" | "boolean" | "in" | "lt" | "gt";

export interface EligibilityRule {
  id: string;
  scheme_id: string;
  field: string;
  operator: RuleOperator;
  value_text?: string | null;
  value_number?: number | null;
  value_boolean?: boolean | null;
  description_en: string;
  description_te: string;
  required: boolean;
}

export interface SchemeDocument {
  id: string;
  scheme_id: string;
  document_name_en: string;
  document_name_te: string;
  required: boolean;
}

export interface Scheme {
  id: string;
  name_en: string;
  name_te: string;
  short_description_en: string;
  short_description_te: string;
  category: "Housing" | "Education" | "Agriculture" | "Women & Child" | "Healthcare" | "Social Security" | "Employment" | "Energy";
  department: string;
  benefit_en: string;
  benefit_te: string;
  eligibility_summary_en: string;
  eligibility_summary_te: string;
  application_process_en: string;
  application_process_te: string;
  official_source_url: string;
  official_application_url: string;
  last_verified: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  rules?: EligibilityRule[];
  documents?: SchemeDocument[];
}

export interface MatchResult {
  scheme: Scheme;
  score: number;
  status: "excellent" | "good" | "possible" | "unlikely";
  matchedRules: {
    rule: EligibilityRule;
    reasonEn: string;
    reasonTe: string;
  }[];
  failedRules: {
    rule: EligibilityRule;
    reasonEn: string;
    reasonTe: string;
  }[];
  missingInformation: {
    rule: EligibilityRule;
    field: string;
    questionEn: string;
    questionTe: string;
  }[];
  explanationEn: string;
  explanationTe: string;
  documentReadiness: {
    total: number;
    ready: number;
    missing: string[];
    percentage: number;
  };
}

export interface DemoProfile {
  id: string;
  nameEn: string;
  nameTe: string;
  titleEn: string;
  titleTe: string;
  icon: string;
  queryEn: string;
  queryTe: string;
  profile: CitizenProfile;
}
