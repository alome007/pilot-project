import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, Eye, FileText, Image, File, Loader2 } from 'lucide-react';
import { TestEmail } from '../utils/testEmails';

interface EmailViewerProps {
  email: TestEmail;
  onClose: () => void;
}

interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document' | 'other';
  size: string;
  url: string;
}

const mockAttachments: Attachment[] = [
  {
    id: '1',
    name: 'document.pdf',
    type: 'pdf',
    size: '2.4 MB',
    url: '#'
  },
  {
    id: '2',
    name: 'screenshot.png',
    type: 'image',
    size: '856 KB',
    url: '#'
  }
];

const AttachmentIcon = ({ type }: { type: Attachment['type'] }) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-4 h-4 text-red-500" />;
    case 'image':
      return <Image className="w-4 h-4 text-blue-500" />;
    default:
      return <File className="w-4 h-4 text-gray-500" />;
  }
};

export default function EmailViewer({ email, onClose }: EmailViewerProps) {
  const [downloading, setDownloading] = React.useState<string | null>(null);
  const [previewing, setPreviewing] = React.useState<string | null>(null);

  const handleDownload = async (attachmentId: string) => {
    setDownloading(attachmentId);
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDownloading(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {email.subject}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{email.sender}</p>
              <p className="text-gray-600 dark:text-gray-400">{email.address}</p>
            </div>
            <p className="text-gray-500 dark:text-gray-400">{email.timestamp}</p>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="prose dark:prose-invert max-w-none">
            {email.content}
          </div>

          {mockAttachments.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Attachments ({mockAttachments.length})
              </h4>
              <div className="space-y-2">
                {mockAttachments.map(attachment => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <AttachmentIcon type={attachment.type} />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {attachment.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {attachment.type === 'image' && (
                        <button
                          onClick={() => setPreviewing(attachment.id)}
                          className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                                   dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDownload(attachment.id)}
                        disabled={downloading === attachment.id}
                        className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                                 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloading === attachment.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}