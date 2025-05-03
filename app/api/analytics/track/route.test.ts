import { POST } from './route';

describe('POST /api/analytics/track', () => {
  it('should return 400 for invalid event', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ eventName: '' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  // Add more tests for valid events, error cases, etc.
}); 