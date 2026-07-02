import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserMessage({ message }) {
  const { user } = useAuth();

  return (
    <div className="flex justify-end my-6 px-4">
      <div className="flex items-end gap-3 max-w-[85%] sm:max-w-[75%]">
        <div className="bg-gradient-to-br from-blue-600 to-violet-600 text-white px-6 py-4 rounded-3xl shadow-md text-[15px] sm:text-base rounded-br-sm leading-relaxed order-1">
          {message}
        </div>
        {user?.avatar ? (
          <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full order-2 mb-1 shadow-sm border border-white/20" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center order-2 mb-1 shadow-sm">
            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}