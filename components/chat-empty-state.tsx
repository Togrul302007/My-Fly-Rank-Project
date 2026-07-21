import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const EXAMPLE_PROMPTS = [
  "Explain quantum computing in simple terms",
  "Help me debug a React hydration error",
  "Draft a professional email requesting project status",
];

export function ChatEmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center p-6 space-y-6">
      <div className="rounded-full bg-primary/10 p-4 text-primary">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">How can I help you today?</h2>
        <p className="text-sm text-muted-foreground">
          Select a suggested prompt below or type your own question to start the conversation.
        </p>
      </div>
      <div className="w-full space-y-2">
        {EXAMPLE_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="w-full text-left p-3 text-sm rounded-lg border border-border hover:bg-accent transition-colors duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}