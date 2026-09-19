import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { location, timeContext, nearbyEvent } = await req.json();
    const key = process.env.GEMINI_API_KEY;

    const prompt = `Generate a short demand-alert headline and action for a parking zone near ${location || 'UG City, Bangalore'} at ${timeContext || 'evening'}. Nearby context: "${nearbyEvent || 'concert at MG Road tonight, historically high evening demand'}". Respond with exactly three lines: HEADLINE: [headline] TIME_RANGE: [time range] SPACES_COUNT: [number] ACTION: [one sentence with count and recommendation].`;

    let headline = `High demand expected near ${location || 'UG City'}, evening`;
    let timeRange = '6:00 pm - 10:00 pm';
    let spacesCount = 3;
    let suggestedAction = `Activate 3 nearby spaces — high evening traffic near venue.`;

    if (key) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 256 },
            }),
            signal: controller.signal,
          }
        );
        clearTimeout(timeout);
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const h = text.match(/HEADLINE:\s*(.+)/i);
        const t = text.match(/TIME_RANGE:\s*(.+)/i);
        const s = text.match(/SPACES_COUNT:\s*(\d+)/i);
        const a = text.match(/ACTION:\s*(.+)/i);
        if (h) headline = h[1].trim();
        if (t) timeRange = t[1].trim();
        if (s) spacesCount = parseInt(s[1], 10);
        if (a) suggestedAction = a[1].trim();
      } catch {
        // fallback preserved below
      }
    }

    return NextResponse.json({ headline, timeRange, spacesCount, suggestedAction });
  } catch {
    return NextResponse.json({
      headline: 'High demand expected near UB City, evening',
      timeRange: '6:00 pm - 10:00 pm',
      spacesCount: 3,
      suggestedAction: 'Activate 3 nearby spaces — high evening traffic near venue (demo fallback).',
    });
  }
}
