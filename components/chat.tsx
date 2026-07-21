"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { AlertCircle, RotateCcw, Send, Square } from "lucide-react";
import { ChatEmptyState } from "./chat-empty-state";
import { ChatSkeleton } from "./chat-skeleton";

export function Chat() {
  const [isRetrying, setIsRetrying] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
    append,
  } = useChat({
    api: "/api/chat",
    onError: (err:Error) => {
      console.error("Chat Stream Error:", err);
    },
  });

  const handleRetry = async () => {
    if (isRetrying || isLoading) return;
    try {
      setIsRetrying(true);
      await reload();
    } catch (e) {
      console.error("Retry failed:", e);
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-3xl mx-auto w-full border-x border-border">
      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
        {messages.length === 0 && (
          <ChatEmptyState
            onSelectPrompt={(prompt) => append({ role: "user", content: prompt })}
          />
        )}

        {messages.map((m:any) => (
          <div
            key={m.id}
            className={`flex gap-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-foreground rounded-bl-none"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <ChatSkeleton />
        )}

        {/* Mid-Stream / API Error State */}
        {error && (
          <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm my-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {error.message || "An error occurred while generating the response."}
              </span>
            </div>
            <button
              onClick={handleRetry}
              disabled={isRetrying || isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-all"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`} />
              {isRetrying ? "Retrying..." : "Retry"}
            </button>
          </div>
        )}
      </div>

      {/* Input Area - Mobile Safari Friendly */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-border bg-background sticky bottom-0"
      >
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="w-full py-3 pl-4 pr-12 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="absolute right-2 p-2 text-muted-foreground hover:text-foreground"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 p-2 text-primary hover:opacity-80 disabled:opacity-30"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}