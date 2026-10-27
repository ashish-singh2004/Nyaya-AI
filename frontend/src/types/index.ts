export type Language = 'en' | 'hi';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface LegalSourceRef {
  title: string;
  issuing_authority: string;
  official_url: string;
  relevant_excerpt: string;
  verified_date: string;
}

export interface LegalAskResponse {
  short_answer: string;
  explanation_simple: string;
  legal_context: string;
  practical_steps: string[];
  official_sources: LegalSourceRef[];
  when_to_seek_lawyer: string;
  clarification_questions?: string[];
  is_demo_fallback: boolean;
  disclaimer: string;
}

export interface ClauseItem {
  title: string;
  summary: string;
  exact_quote: string;
  page_or_section?: string;
}

export interface ObligationItem {
  party: string;
  duty_description: string;
  conditions_or_penalty?: string;
}

export interface DateAmountItem {
  item_type: string;
  value: string;
  description: string;
  original_context?: string;
}

export interface ConcernItem {
  level: string;
  clause_reference: string;
  issue_description: string;
  reason_for_caution: string;
}

export interface DocumentAnalysisResponse {
  document_overview: string;
  plain_summary: string;
  important_clauses: ClauseItem[];
  obligations: ObligationItem[];
  dates_and_amounts: DateAmountItem[];
  potential_concerns: ConcernItem[];
  questions_to_ask_lawyer: string[];
  original_filename: string;
  extracted_char_count: number;
  is_demo: boolean;
  disclaimer: string;
}

export interface FraudPatternDetected {
  pattern_name: string;
  severity: string;
  evidence_found: string;
  explanation: string;
}

export interface OfficialHelpline {
  name: string;
  number: string;
  authority: string;
  portal_url: string;
  purpose: string;
}

export interface FraudCheckResponse {
  risk_level: string;
  risk_score: number;
  has_sensitive_credential_warning: boolean;
  credential_warning_details?: string;
  detected_patterns: FraudPatternDetected[];
  safe_next_steps: string[];
  official_helplines: OfficialHelpline[];
  sanitized_preview: string;
  is_demo: boolean;
  disclaimer: string;
}

export interface Scheme {
  id: number;
  name: string;
  name_hi?: string;
  issuing_department: string;
  issuing_department_hi?: string;
  description: string;
  description_hi?: string;
  beneficiary_category: string;
  eligibility_summary: string;
  eligibility_summary_hi?: string;
  benefits_summary: string;
  benefits_summary_hi?: string;
  required_documents?: string;
  application_url: string;
  official_source_url: string;
  state_ut: string;
  min_age?: number;
  max_age?: number;
  last_verified_at: string;
}

export interface LegalAidResource {
  id: number;
  organization_name: string;
  organization_name_hi?: string;
  jurisdiction_level: string;
  state: string;
  district?: string;
  category: string;
  service_description: string;
  service_description_hi?: string;
  official_phone: string;
  official_address: string;
  official_url: string;
  eligibility_info?: string;
  last_verified_at: string;
}

export interface LegalSource {
  id: number;
  title: string;
  issuing_authority: string;
  source_url: string;
  source_type: string;
  description: string;
  publication_date?: string;
  last_verified_at: string;
}
