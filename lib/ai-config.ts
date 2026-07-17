import { anthropic } from '@ai-sdk/anthropic';

// Süni intellektin istifadə edəcəyi model və onun davranış qaydaları
export const aiConfig = {
  model: anthropic('claude-3-5-sonnet-20241022'), // Ən güclü Claude modeli
  temperature: 0.7, // Cavabların yaradıcılıq dərəcəsi
  systemPrompt: `You are an expert AI Assistant designed for Tahir Qahramanov's professional portfolio. 
Your goal is to answer questions about Tahir's skills, his React/Next.js experience, and his Kanban Task Manager project. 
Be concise, helpful, and highly professional.`,
};