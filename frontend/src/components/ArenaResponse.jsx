import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default function ArenaResponse({ solution1, solution2, judge }) {
  useEffect(() => {
    hljs.highlightAll();
  }, [solution1, solution2]);

  const winner = judge 
    ? (judge.solution_1_score > judge.solution_2_score ? 1 : (judge.solution_2_score > judge.solution_1_score ? 2 : 0))
    : null;

  return (
    <div className="flex flex-col gap-8 my-8 px-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Solution 1 */}
        <div className={`relative bg-white dark:bg-zinc-900 border ${winner === 1 ? 'border-emerald-500/50 shadow-emerald-500/10' : 'border-zinc-200 dark:border-zinc-800'} rounded-3xl p-8 shadow-sm flex flex-col transition-all hover:shadow-md`}>
          {winner === 1 && (
             <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white text-xl animate-bounce">
               👑
             </div>
          )}
          <h3 className="text-sm font-bold tracking-wide uppercase text-zinc-500 mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Solution 1
          </h3>
          <div className="text-zinc-700 dark:text-zinc-300">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-zinc-900 dark:text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-zinc-900 dark:text-white" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-white" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-500 underline" {...props} />,
                code: ({node, inline, className, children, ...props}) => {
                  return !inline ? (
                    <div className="rounded-xl overflow-hidden my-4 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                       <pre className="p-4 bg-zinc-950 overflow-x-auto text-sm text-zinc-100">
                         <code className={className} {...props}>
                           {children}
                         </code>
                       </pre>
                    </div>
                  ) : (
                    <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >{solution1}</ReactMarkdown>
          </div>
        </div>

        {/* Solution 2 */}
        <div className={`relative bg-white dark:bg-zinc-900 border ${winner === 2 ? 'border-violet-500/50 shadow-violet-500/10' : 'border-zinc-200 dark:border-zinc-800'} rounded-3xl p-8 shadow-sm flex flex-col transition-all hover:shadow-md`}>
          {winner === 2 && (
             <div className="absolute -top-4 -right-4 w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30 text-white text-xl animate-bounce">
               👑
             </div>
          )}
          <h3 className="text-sm font-bold tracking-wide uppercase text-zinc-500 mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse"></span> Solution 2
          </h3>
          <div className="text-zinc-700 dark:text-zinc-300">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-zinc-900 dark:text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-zinc-900 dark:text-white" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-white" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-500 underline" {...props} />,
                code: ({node, inline, className, children, ...props}) => {
                  return !inline ? (
                    <div className="rounded-xl overflow-hidden my-4 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                       <pre className="p-4 bg-zinc-950 overflow-x-auto text-sm text-zinc-100">
                         <code className={className} {...props}>
                           {children}
                         </code>
                       </pre>
                    </div>
                  ) : (
                    <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >{solution2}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Judge Panel */}
      {judge && (
        <div className="mt-4 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 mb-8 relative z-10">
            <span className="text-2xl">⚖️</span> Judge's Verdict
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-4">
              <div className="flex flex-col bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">Solution 1 Score</span>
                  <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{judge.solution_1_score}/10</span>
                </div>
                {/* Score Bar */}
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(judge.solution_1_score / 10) * 100}%` }}></div>
                </div>
              </div>
              <div className="px-4 py-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                 <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                   {judge.solution_1_reasoning}
                 </p>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex flex-col bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-5 rounded-2xl border border-violet-100 dark:border-violet-500/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-violet-700 dark:text-violet-400">Solution 2 Score</span>
                  <span className="text-3xl font-bold text-violet-600 dark:text-violet-400">{judge.solution_2_score}/10</span>
                </div>
                {/* Score Bar */}
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div className="bg-violet-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(judge.solution_2_score / 10) * 100}%` }}></div>
                </div>
              </div>
              <div className="px-4 py-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                  {judge.solution_2_reasoning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}