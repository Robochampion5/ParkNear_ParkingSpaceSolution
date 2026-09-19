import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { location, type, capacity, nearbyDemandContext } = await req.json();
    const key = process.env.GEMINI_API_KEY;

    const prompt = `Suggest a price per hour (INR) for a parking facility at ${location || 'urban Bangalore'} (${type || 'underground lot'}), capacity ~${capacity || 60} spots, with nearby context: "${nearbyDemandContext || 'high office traffic'}". Respond with exactly two lines: PRICE: [number] REASON: [one sentence tied to demand].`;

    let suggestedPrice = 45;
    let reason = 'Pricing reflects moderate urban demand and available capacity.';

    if (key) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 256 },
            }),
          }
        );
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const priceMatch = text.match(/PRICE:\s*(\d+)/i);
        const reasonMatch = text.match(/REASON:\s*(.+)/i);
        if (priceMatch) suggestedPrice = parseInt(priceMatch[1], 10);
        if (reasonMatch) reason = reasonMatch[1].trim();
      } catch {
        // Fallback handled below
      }
    }

    return NextResponse.json({ suggestedPrice, reason });
  } catch {
    return NextResponse.json({ suggestedPrice: 45, reason: 'Standard pricing for this capacity and area.' });
  }
}
