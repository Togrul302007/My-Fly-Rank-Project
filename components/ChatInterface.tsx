'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Ağıllı Auto-Scroll: Əgər istifadəçi özü yuxarı qalxıbsa, ekranı məcburi aşağı çəkmir
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
    setShouldAutoScroll(isAtBottom);
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, shouldAutoScroll]);

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-sm">
      {/* Çat Mesajları Bölməsi */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-900 border border-slate-100 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Düşünmə Animasiyası (Thinking Indicator) */}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex space-x-1.5 items-center">
              <span className="text-xs text-slate-500 font-medium">Thinking</span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* "Yuxarıdakı köhnə mesajları oxuyuram, məni ən son mesaja apar" düyməsi */}
      {!shouldAutoScroll && (
        <button 
          onClick={() => { setShouldAutoScroll(true); messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
          className="mx-auto my-2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-slate-700 transition"
        >
          ⬇️ Jump to latest
        </button>
      )}

      {/* Yazı yazma və Göndərmə/Dayandırma bölməsi (Mobil ölçülərə tam uyğun) */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-full px-4 py-2.5 transition"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-full px-4 py-2.5 transition"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}