import { tool } from 'ai';
import { z } from 'zod';

// Zod sxemimizi ayrıca dəyişənə çıxarırıq ki, TypeScript tipi dəqiq tutsun
const topicSchema = z.object({
  topic: z.string().describe('Analiz ediləcək mövzu və ya sahə'),
  category: z.enum(['performance', 'accessibility', 'seo']).describe('Analiz kateqoriyası'),
});

// Sxemimizdən avtomatik TypeScript tipi çıxarırıq
type TopicInput = z.infer<typeof topicSchema>;

export const topicAnalyzerTool = tool({
  description: 'Verilən mövzunu və ya koda dair göstəriciləri analiz edib skor və tövsiyələr qaytarır.',
  inputSchema: topicSchema,
  execute: async ({ topic, category }: TopicInput) => {
    // Real şəraitdə bura API çağırışı və ya daxili hesablama olur
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 san simulyasiya

    // Error state-i test etmək üçün xüsusi şərt (əgər mövzuda "error" sözü varsa)
    if (topic.toLowerCase().includes('error')) {
      throw new Error('Analiz zamanı xəta baş verdi. Verilən parametri yoxlayın.');
    }

    return {
      topic,
      category,
      score: Math.floor(Math.random() * 25) + 75, // 75-100 arası skor
      metrics: {
        speed: '95ms',
        security: 'A+',
        structure: 'Optimal',
      },
      recommendations: [
        'Semantik HTML teqlərindən istifadəni artırın.',
        'Resursların keşlənməsini optimallaşdırın.',
      ],
    };
  },
});         

