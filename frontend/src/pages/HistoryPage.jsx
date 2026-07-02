import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import ArenaResponse from '../components/ArenaResponse';

export default function HistoryPage() {
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/battles');
        setBattles(response.data.battles);
      } catch (error) {
        console.error('Failed to fetch battles', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Battle History</h1>

        {battles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚔️</span>
            </div>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-2">No battles yet</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Head over to the arena and start pitting AI models against each other to build up your history.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {battles.map((battle) => {
              const isExpanded = expandedId === battle._id;
              const date = new Date(battle.createdAt).toLocaleDateString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              });

              return (
                <div key={battle._id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div 
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    onClick={() => setExpandedId(isExpanded ? null : battle._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{date}</p>
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {battle.problem}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 shrinks-0">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-500/20">
                          S1: {battle.judge.solution_1_score}
                        </div>
                        <div className="px-3 py-1 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 rounded-full text-sm font-medium border border-violet-200 dark:border-violet-500/20">
                          S2: {battle.judge.solution_2_score}
                        </div>
                      </div>
                      <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                        <svg className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 p-2 sm:p-6 animate-in slide-in-from-top-2 duration-300">
                      <div className="mb-6 p-4 sm:p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Prompt</h4>
                        <p className="text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">{battle.problem}</p>
                      </div>
                      
                      <div className="-mx-4 sm:mx-0">
                        <ArenaResponse 
                          solution1={battle.solution_1}
                          solution2={battle.solution_2}
                          judge={battle.judge}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
