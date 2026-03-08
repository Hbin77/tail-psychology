const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function createSession(petCategory: string, petName: string) {
  const res = await fetch(`${API_BASE}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pet_category: petCategory, pet_name: petName }),
  });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

export async function getQuestions(petCategory: string) {
  const res = await fetch(`${API_BASE}/api/questions/${petCategory}`);
  if (!res.ok) throw new Error('Failed to get questions');
  return res.json();
}

export async function submitResponses(sessionId: string, responses: { question_id: string; choice_id?: string; free_text?: string }[]) {
  const res = await fetch(`${API_BASE}/api/sessions/${sessionId}/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ responses }),
  });
  if (!res.ok) throw new Error('Failed to submit responses');
  return res.json();
}

export async function runDiagnosis(sessionId: string) {
  const res = await fetch(`${API_BASE}/api/sessions/${sessionId}/diagnose`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to run diagnosis');
  return res.json();
}

export async function getResult(shareToken: string) {
  const res = await fetch(`${API_BASE}/api/results/${shareToken}`);
  if (!res.ok) throw new Error('Failed to get result');
  return res.json();
}
