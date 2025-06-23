// app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ExtractTextFromPDF } from '@/app/lib/pdfParser';

function truncateText(text: string, maxLength = 3000): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export async function POST(req: NextRequest) {
  try {
    console.log("▶️ POST request received for /api/analyze");

    const formData = await req.formData();
    const file = formData.get('resume') as File;
    const jobDesc = formData.get('jobDesc') as string;

    console.log("📄 Received file:", file?.name);
    console.log("📝 Received job description:", jobDesc);

    if (!file || !(file instanceof File)) {
      console.warn("⚠️ No file uploaded or invalid file type.");
      return NextResponse.json({ error: 'No resume file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const resumeRawText = await ExtractTextFromPDF(buffer);
    const resumeText = truncateText(resumeRawText, 3000);

    console.log("✅ Extracted and truncated resume text.");

    const prompt = `
You are a resume expert.

Here is the job description:
${jobDesc}

Here is the resume:
${resumeText}

Please analyze the resume and return a JSON object with this exact format:

{
  "score": {
    "title": "Match Score",
    "value": 85
  },
  "missingSkills": {
    "title": "Missing Skills or Experiences",
    "value": ["TypeScript", "GraphQL"]
  },
  "suggestions": {
    "title": "Suggestions to Improve Resume",
    "value": "Add experience with TypeScript and highlight backend project work."
  }
}

⚠️ Important: Your response must ONLY contain raw valid JSON (no comments, no markdown, no explanations).
`;

    console.log("📤 Sending prompt to OpenRouter...");

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert resume advisor.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    console.log("📥 OpenRouter responded with status:", response.status);

    if (!response.ok) {
      const err = await response.json();
      console.error('❌ OpenRouter API error:', err);
      return NextResponse.json({ error: err.error?.message || 'API request failed' }, { status: 500 });
    }

    const data = await response.json();
    let rawContent = data.choices?.[0]?.message?.content || '{}';

    console.log("🧠 Raw AI response content:\n", rawContent);

    // 🔧 Clean markdown formatting (like ```json ... ```)
    rawContent = rawContent.trim().replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '');

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (err) {
      console.error('❌ Failed to parse AI JSON:', rawContent);
      return NextResponse.json({ error: 'Invalid response format from AI.' }, { status: 500 });
    }

    const { score, missingSkills, suggestions } = parsed;

    console.log("✅ Parsed AI response:", { score, missingSkills, suggestions });

    return NextResponse.json(
      {
        modelUsed: 'gpt-4o',
        score,
        missingSkills,
        suggestions,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('🔥 Internal server error during resume analysis:', error);
    return NextResponse.json({ error: 'Server error analyzing resume.' }, { status: 500 });
  }
}
