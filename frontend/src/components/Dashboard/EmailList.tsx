import React from 'react';
import { Mail, Star, Clock, Shield, Paperclip, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatView from './ChatView';

interface EmailListProps {
  view: string;
}

const mockEmails = [
  {
    id: 1,
    alias: 'shopping@privacy.mail',
    sender: 'Amazon',
    subject: 'Your order has shipped!',
    preview: 'Track your package with the following number...',
    time: '10:30 AM',
    isStarred: true,
    isRead: false,
    hasAttachment: true,
    canReply: false,
    messages: [
      {
        content: "Your order #12345 has been shipped! Track your package with tracking number: ABC123XYZ",
        timestamp: "10:30 AM",
        fromMe: false
      }
    ]
  },
  {
    id: 2,
    alias: 'social@privacy.mail',
    sender: 'Twitter',
    subject: 'Security alert: new login',
    preview: 'We noticed a new login to your account from...',
    time: 'Yesterday',
    isStarred: false,
    isRead: true,
    canReply: true,
    hasAttachment: false,
    messages: [
      {
        content: "We noticed a new login to your account from New York, USA",
        timestamp: "Yesterday",
        fromMe: false
      }
    ]
  },
  {
    id: 3,
    alias: 'work@privacy.mail',
    sender: 'Slack',
    subject: 'New message in #general',
    preview: 'Jane Doe posted a message in #general...',
    time: 'Yesterday',
    isStarred: false,
    isRead: true,
    hasAttachment: true,
    canReply: true,
    messages: [
      {
        content: "Jane Doe posted a message in #general: 'Hey team, check out the new updates!'",
        timestamp: "Yesterday",
        fromMe: false
      }
    ]
  }
];

const spamEmails = [
  {
    id: 1,
    alias: 'shopping@privacy.mail',
    sender: 'Unknown Sender',
    subject: 'You won a prize!',
    preview: 'Congratulations! You have been selected...',
    time: '2 days ago',
    isStarred: false,
    isRead: true,
    canReply: true,
    hasAttachment: false,
    messages: [
      {
        content: "Congratulations! You have been selected as our lucky winner!",
        timestamp: "2 days ago",
        fromMe: false
      }
    ]
  }
];

const archivedEmails = [
  {
    id: 1,
    alias: 'work@privacy.mail',
    sender: 'LinkedIn',
    subject: 'New job opportunities',
    preview: 'Based on your profile, we found...',
    time: 'Last week',
    isStarred: false,
    isRead: true,
    canReply: true,
    hasAttachment: false,
    messages: [
      {
        content: "Based on your profile, we found some job opportunities that might interest you.",
        timestamp: "Last week",
        fromMe: false
      }
    ]
  }
];

export default function EmailList({ view }: EmailListProps) {
  const [selectedEmail, setSelectedEmail] = React.useState<typeof mockEmails[0] | null>(null);
  const getEmails = () => {
    switch (view) {
      case 'spam':
        return spamEmails;
      case 'archive':
        return archivedEmails;
      default:
        return mockEmails;
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'spam':
        return 'Spam';
      case 'archive':
        return 'Archive';
      case 'aliases':
        return 'Aliases';
      default:
        return 'Inbox';
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden flex h-full">
        <motion.div
          className={`h-full overflow-auto ${selectedEmail ? 'hidden lg:block lg:w-2/5' : 'w-full'} border-r dark:border-gray-700`}
        >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">{getTitle()}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Updated just now</span>
              </div>
            </div>
            
            {view === 'aliases' ? (
              <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Your email aliases will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {getEmails().map((email) => (
                    <div
                      key={email.id}
                      className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer
                               transition-colors duration-200
                               ${email.id == selectedEmail?.id ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex-shrink-0">
                        <Mail className={`w-5 h-5 ${email.id == selectedEmail?.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm ${email.id == selectedEmail?.id ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                            {email.sender}
                          </p>
                          <div className="flex items-center gap-2">
                            {email.isStarred && (
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            )}
                            <MessageCircle className={`w-4 h-4 transition-colors ${
                              email.messages?.length > 1 ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                            {email.hasAttachment && (
                              <Paperclip className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-400">{email.time}</span>
                          </div>
                        </div>
                        <p className={`text-sm ${!email.isRead ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {email.subject}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {email.preview}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          via {email.alias}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        {selectedEmail && (
          <ChatView 
            key={`chat-${selectedEmail.id}`}
            email={selectedEmail} 
            onClose={() => setSelectedEmail(null)} 
            className="lg:static lg:flex-1"
          />
        )}

        {!selectedEmail && (<div className="hidden lg:flex lg:w-2/3 flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
            <div className="w-48 h-48 mb-6 text-gray-300 dark:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-3">No conversation selected</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Select an email from the list to view the conversation
            </p>
          </div>)}

        
    </div>
  );
}