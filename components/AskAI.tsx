"use client";
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AskAI() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    setAnswer('');
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer || data.error);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={ask} className="flex gap-2 relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-red-600 rounded-full opacity-75 blur-sm"></div>
        <div className="relative flex w-full gap-2 bg-black/50 rounded-full p-1">
          <Input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask about your syllabus..."
            className="flex-1 bg-gray-900/50 border-none text-white placeholder:text-gray-500 rounded-full px-4 py-3 font-mono text-sm focus:ring-0 focus:outline-none"
          />
          <Button
            type="submit"
            disabled={loading || !question}
            size="icon"
            className="rounded-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {answer && (
        <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-900/40 to-blue-900/20 border border-blue-500/30 text-white">
          {answer}
          <p className="text-xs text-gray-400 mt-2 text-right">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      )}
    </div>
  );
}