const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
const SAFE_ID = /^[a-zA-Z0-9_-]+$/;

function validateId(id: string, label: string): string {
  if (!SAFE_ID.test(id)) throw new Error(`Invalid ${label}`);
  return id;
}

export async function createSession(petCategory: string, petName: string, petBreed?: string) {
  const res = await fetch(`${API_BASE}/api/v1/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pet_category: petCategory, pet_name: petName, pet_breed: petBreed || null }),
  });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

export async function submitResponses(sessionId: string, responses: { question_id: string; choice_id?: string; free_text?: string }[]) {
  validateId(sessionId, 'sessionId');
  const res = await fetch(`${API_BASE}/api/v1/sessions/${sessionId}/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ responses }),
  });
  if (!res.ok) throw new Error('Failed to submit responses');
  return res.json();
}

export async function runDiagnosis(sessionId: string) {
  validateId(sessionId, 'sessionId');
  const res = await fetch(`${API_BASE}/api/v1/sessions/${sessionId}/diagnose`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to run diagnosis');
  return res.json();
}

export async function getResult(shareToken: string) {
  validateId(shareToken, 'shareToken');
  const res = await fetch(`${API_BASE}/api/v1/diagnoses/${shareToken}`);
  if (!res.ok) throw new Error('Failed to get result');
  return res.json();
}
