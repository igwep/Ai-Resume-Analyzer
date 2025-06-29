// app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ExtractTextFromPDF } from '@/app/lib/pdfParser';
import { jsonrepair } from 'jsonrepair';

function truncateText(text: string, maxLength = 3000): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function safeParseJSON(raw: string): any | null {
  try {
    return JSON.parse(raw);
  } catch (err1) {
    try {
      const repaired = jsonrepair(raw);
      return JSON.parse(repaired);
    } catch (err2) {
      console.error('Failed to repair and parse JSON:', err2);
      return null;
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File;
    const jobDesc = formData.get('jobDesc') as string;

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No resume file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const resumeRawText = await ExtractTextFromPDF(buffer);
    const resumeText = truncateText(resumeRawText, 3000);

    const prompt = `
You are a professional resume analyst.

Here is the job description:
${jobDesc}

Here is the resume:
${resumeText}

Please return a JSON object that includes a resume analysis based on the job description. Make sure to strictly follow this structure:

{
  "score": {
    "title": "Match Score",
    "value": 85
  },
  "missingSkills": {
    "title": "Missing Skills or Experiences",
    "value": [
      {
        "name": "TypeScript",
        "importance": "high",
        "note": "Job requires TypeScript experience, but resume only mentions JavaScript."
      },
      {
        "name": "GraphQL",
        "importance": "medium",
        "note": "Job prefers GraphQL experience, but resume does not mention it."
      }
    ]
  },
  "suggestions": {
    "title": "Suggestions to Improve Resume",
    "value": "Add experience with TypeScript and highlight backend project work."
  },
  "skills": [
    {
      "name": "React",
      "importance": "high",
      "note": "Frequently mentioned in job description but missing or under-emphasized."
    }
  ],
  "detailedSuggestions": [
    {
      "title": "Include more measurable achievements",
      "status": "improvement",
      "note": "Quantifying your results (e.g., 'improved load speed by 40%') makes your resume more compelling."
    },
    {
      "title": "Highlight relevant backend experience",
      "status": "critical",
      "note": "The job emphasizes full-stack skills, but your backend experience is limited or unclear."
    },
    {
      "title": "Tailor your summary to the job",
      "status": "success",
      "note": "Your summary already aligns well with the job’s core requirements."
    }
  ]
}

Instructions:
- Populate every field.
- Do not leave 'skills' or 'detailedSuggestions' empty.
- Use realistic skill names and suggestion titles.
- Respond ONLY with valid raw JSON (no comments, no markdown, no explanation).
`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat:free',
        messages: [
          { role: 'system', content: 'You are an expert resume advisor.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error('OpenRouter API error:', err);
      return NextResponse.json(
        { error: err?.error?.message || 'server_fail' },
        { status: 502 }
      );
    }

    const data = await response.json();
    let rawContent = data.choices?.[0]?.message?.content || '{}';
    console.log('Raw AI response:', rawContent);

    rawContent = rawContent.trim()
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '');

    const parsed = safeParseJSON(rawContent);
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid response format from AI.' }, { status: 500 });
    }

    const {
      score = null,
      missingSkills = null,
      suggestions = null,
      detailedSuggestions = null,
    } = parsed || {};

    if (!score || !missingSkills || !suggestions || !detailedSuggestions) {
      console.error('One or more required fields are missing from the parsed response:', parsed);
      return NextResponse.json(
        { error: 'Incomplete analysis data returned from AI.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        modelUsed: 'deepseek/deepseek-chat:free',
        score,
        missingSkills,
        suggestions,
        detailedSuggestions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Internal server error during resume analysis:', error);
    return NextResponse.json({ error: 'server_fail' }, { status: 500 });
  }
}
