import React, { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ArenaResponse from './ArenaResponse';
import axios from "axios";
import Navbar from './Navbar';

const MOCK_RESPONSE = {
  solution_1: "Here is a clean Python solution using modern syntax:\n\n```python\ndef fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n```\n\nThis approach has O(n) time complexity and O(1) space.",
  solution_2: "A recursive solution can be elegant but less efficient:\n\n```python\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n```\n\nNote: this has O(2^n) time complexity.",
  judge: {
    solution_1_score: 10,
    solution_2_score: 5,
    solution_1_reasoning: "Excellent, optimal solution. Space complexity is O(1) which is perfect for this problem.",
    solution_2_reasoning: "The recursive approach without memoization is extremely slow for large inputs."
  }
};

export default function ChatInterface() {
  const [ messages, setMessages ] = useState([]);
  const [ inputValue, setInputValue ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ loadingProblem, setLoadingProblem ] = useState('');
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ messages ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const problemText = inputValue;
    setInputValue('');
    setLoadingProblem(problemText);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/invoke", {
        input: problemText
      });

      const data = response.data;

      const newMessage = {
        id: Date.now(),
        problem: problemText,
        ...data.result
      };

      setMessages(prev => [ ...prev, newMessage ]);
    } catch (error) {
      console.error('Failed to get AI response', error);
      // Fallback or error message could be handled here
    } finally {
      setIsLoading(false);
      setLoadingProblem('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <Navbar />

      <main className="flex-1 overflow-y-auto scrollbar-hide px-4 md:px-8 py-4 md:py-8 w-full max-w-6xl mx-auto flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Welcome to the Arena</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Type a problem below to see two AI solutions go head-to-head.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              <UserMessage message={msg.problem} />
              <ArenaResponse
                solution1={msg.solution_1}
                solution2={msg.solution_2}
                judge={msg.judge}
              />
            </div>
          ))
        )}

        {isLoading && (
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4">
            <UserMessage message={loadingProblem || "Processing..."} />
            <div className="flex flex-col gap-8 my-8 px-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mb-8 animate-pulse"></div>
                    <div className="space-y-4">
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 animate-pulse"></div>
                      <div className="h-32 bg-zinc-100 dark:bg-zinc-950 rounded-xl w-full animate-pulse mt-6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </main>

      <div className="p-4 sm:p-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a coding question..."
              disabled={isLoading}
              className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-full py-3 sm:py-4 pl-5 sm:pl-6 pr-14 sm:pr-16 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-zinc-400 transition-all shadow-sm group-hover:shadow-md text-base sm:text-lg disabled:opacity-50"
            />
            <button
              type="submit"
              className="absolute right-1.5 sm:right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-2.5 rounded-full transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-md shadow-blue-500/20"
              disabled={!inputValue.trim() || isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}