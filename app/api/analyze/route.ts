// app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ExtractTextFromPDF } from '@/app/lib/pdfParser';

// Truncate long resume text to stay within token limits
function truncateText(text: string, maxLength = 3000): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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
    const resumeText = truncateText(resumeRawText, 3000); // truncate long resumes

    const prompt = `
You are a resume expert.

Here is the job description:
${jobDesc}

Here is the resume:
${resumeText}

Please provide:
- A match score (0-100)
- Missing skills or experiences
- Suggestions to tailor the resume to this job.
`;

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
        max_tokens: 1000, // within free credit limits
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('OpenRouter API error:', err);
      return NextResponse.json({ error: err.error?.message || 'API request failed' }, { status: 500 });
    }

    const data = await response.json();
    const suggestions = data.choices?.[0]?.message?.content || 'No suggestions returned.';
    return NextResponse.json({ suggestions, modelUsed: 'gpt-4o' }, { status: 200 });

  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json({ error: 'Server error analyzing resume.' }, { status: 500 });
  }
}
