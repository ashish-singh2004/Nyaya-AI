import {
  LegalAskResponse,
  DocumentAnalysisResponse,
  FraudCheckResponse,
  Scheme,
  LegalAidResource,
  LegalSource,
  ChatMessage
} from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/+$/, '');

export const api = {
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable or starting:', err);
      return { status: 'offline', ai_service_configured: false, database_connected: false };
    }
  },

  async askLegal(
    question: string,
    language: string = 'en',
    category: string = 'General',
    conversationHistory: ChatMessage[] = [],
    isDemo: boolean = false
  ): Promise<LegalAskResponse> {
    const res = await fetch(`${API_BASE_URL}/legal/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        language,
        category,
        conversation_history: conversationHistory,
        is_demo: isDemo
      })
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server responded with status ${res.status}`);
    }
    return await res.json();
  },

  async analyzeDocument(
    file: File,
    language: string = 'en',
    isDemo: boolean = false
  ): Promise<DocumentAnalysisResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    formData.append('is_demo', String(isDemo));

    const res = await fetch(`${API_BASE_URL}/documents/analyze`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server responded with status ${res.status}`);
    }
    return await res.json();
  },

  async getSampleDocument(): Promise<{ title: string; content: string; format: string }> {
    const res = await fetch(`${API_BASE_URL}/documents/sample-text`);
    if (!res.ok) throw new Error('Could not fetch sample document');
    return await res.json();
  },

  async analyzeFraud(
    messageText: string,
    messageType: string = 'sms',
    isDemo: boolean = false
  ): Promise<FraudCheckResponse> {
    const res = await fetch(`${API_BASE_URL}/fraud/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message_text: messageText,
        message_type: messageType,
        is_demo: isDemo
      })
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server responded with status ${res.status}`);
    }
    return await res.json();
  },

  async getFraudSamples(): Promise<Array<{ id: string; title: string; type: string; text: string }>> {
    const res = await fetch(`${API_BASE_URL}/fraud/samples`);
    if (!res.ok) throw new Error('Could not fetch fraud samples');
    return await res.json();
  },

  async getSchemes(): Promise<Scheme[]> {
    const res = await fetch(`${API_BASE_URL}/schemes`);
    if (!res.ok) throw new Error('Could not fetch schemes');
    return await res.json();
  },

  async searchSchemes(query?: string, category?: string, stateUt?: string): Promise<Scheme[]> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (category) params.append('category', category);
    if (stateUt) params.append('state_ut', stateUt);

    const res = await fetch(`${API_BASE_URL}/schemes/search?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to search schemes');
    return await res.json();
  },

  async getLegalAid(): Promise<LegalAidResource[]> {
    const res = await fetch(`${API_BASE_URL}/legal-aid`);
    if (!res.ok) throw new Error('Could not fetch legal aid resources');
    return await res.json();
  },

  async searchLegalAid(state?: string, category?: string, query?: string): Promise<LegalAidResource[]> {
    const params = new URLSearchParams();
    if (state) params.append('state', state);
    if (category) params.append('category', category);
    if (query) params.append('query', query);

    const res = await fetch(`${API_BASE_URL}/legal-aid/search?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to search legal aid directory');
    return await res.json();
  },

  async getVerifiedSources(): Promise<LegalSource[]> {
    const res = await fetch(`${API_BASE_URL}/sources`);
    if (!res.ok) throw new Error('Could not fetch sources');
    return await res.json();
  }
};
