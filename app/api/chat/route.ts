import { streamText } from 'ai';
import { aiConfig } from '@/lib/ai-config';

// Server tərəfində işləyən və gizli qalan API sorğumuz
export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: aiConfig.model,
    system: aiConfig.systemPrompt,
    messages,
    temperature: aiConfig.temperature,
  });

  return result.toDataStreamResponse();
}