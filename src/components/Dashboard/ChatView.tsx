import React from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Paperclip, MoreVertical } from 'lucide-react';

interface Message {
  content: string;
  timestamp: string;
  fromMe: boolean;
}

interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  alias: string;
  messages: Message[];
}

interface ChatViewProps {
  email: Email;
  onClose: () => void;
  className?: string;
}

export default function ChatView({ email, onClose, className = '' }: ChatViewProps) {
  const [reply, setReply] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [email.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    
    // Add your send logic here
    console.log('Sending reply:', reply);
    setReply('');
  };

  return (
    <div
      className={`fixed lg:relative inset-0 bg-white dark:bg-gray-800 z-10 flex flex-col h-full ${className}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">{email.subject}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              via {email.alias}
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
                        rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {email.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.fromMe ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'} 
                          rounded-lg px-4 py-2`}>
              <p className={`text-sm ${message.fromMe ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {message.content}
              </p>
              <p className={`text-xs mt-1 ${message.fromMe ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            autoFocus
            placeholder="Type your reply..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white
                     placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2
                     focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={!reply.trim()}
            className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50
                     disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
