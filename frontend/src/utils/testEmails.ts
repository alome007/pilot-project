import { v4 as uuidv4 } from 'uuid';

export interface TestEmail {
  id: string;
  address: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  spamScore: number;
}

function generateTimestamp(): string {
  const now = new Date();
  const hours = Math.floor(Math.random() * 24);
  now.setHours(now.getHours() - hours);
  return now.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}

export const testEmails: TestEmail[] = [
  {
    id: uuidv4(),
    address: 'user1@temp.mail',
    sender: 'Netflix',
    subject: 'Confirm your email address',
    preview: 'Welcome to Netflix! Please verify your email address to...',
    content: 'Welcome to Netflix! Please verify your email address to complete your registration and start watching.',
    timestamp: generateTimestamp(),
    isRead: false,
    spamScore: 5
  },
  {
    id: uuidv4(),
    address: 'user2@temp.mail',
    sender: 'Amazon',
    subject: 'Your Amazon order has shipped!',
    preview: 'Your order #12345 has been shipped and will arrive...',
    content: 'Your order #12345 has been shipped and will arrive tomorrow. Track your package with the following number: TRK123456789.',
    timestamp: generateTimestamp(),
    isRead: true,
    spamScore: 2
  },
  {
    id: uuidv4(),
    address: 'user3@temp.mail',
    sender: 'LinkedIn',
    subject: 'New job opportunities matching your profile',
    preview: 'We found 5 new jobs that match your skills and...',
    content: 'We found 5 new jobs that match your skills and experience. Take a look at these opportunities from top companies in your area.',
    timestamp: generateTimestamp(),
    isRead: false,
    spamScore: 15
  },
  {
    id: uuidv4(),
    address: 'user4@temp.mail',
    sender: 'Spotify Premium',
    subject: 'Your free trial is about to end',
    preview: 'Your Spotify Premium trial ends in 3 days. Continue...',
    content: 'Your Spotify Premium trial ends in 3 days. Continue enjoying ad-free music by upgrading to Premium today!',
    timestamp: generateTimestamp(),
    isRead: true,
    spamScore: 8
  },
  {
    id: uuidv4(),
    address: 'user5@temp.mail',
    sender: 'Discord',
    subject: 'Security alert: new login',
    preview: 'We detected a new login to your Discord account from...',
    content: 'We detected a new login to your Discord account from a new device. If this was not you, please secure your account immediately.',
    timestamp: generateTimestamp(),
    isRead: false,
    spamScore: 3
  },
  {
    id: uuidv4(),
    address: 'user6@temp.mail',
    sender: 'Medium Daily Digest',
    subject: 'Top stories for you',
    preview: 'Here are today\'s top stories based on your reading...',
    content: 'Here are today\'s top stories based on your reading history and interests. Featuring articles about technology, programming, and productivity.',
    timestamp: generateTimestamp(),
    isRead: true,
    spamScore: 12
  },
  {
    id: uuidv4(),
    address: 'user7@temp.mail',
    sender: 'TotallyLegit Ltd',
    subject: '🎉 You\'ve won a prize! Claim now!',
    preview: 'Congratulations! You\'ve been selected as our lucky...',
    content: 'Congratulations! You\'ve been selected as our lucky winner! Click here to claim your prize worth $1,000,000!',
    timestamp: generateTimestamp(),
    isRead: false,
    spamScore: 95
  },
  {
    id: uuidv4(),
    address: 'user8@temp.mail',
    sender: 'GitHub',
    subject: 'Security alert: new SSH key added',
    preview: 'A new SSH key was added to your GitHub account...',
    content: 'A new SSH key was added to your GitHub account. If you didn\'t make this change, please review your account security immediately.',
    timestamp: generateTimestamp(),
    isRead: false,
    spamScore: 1
  },
  {
    id: uuidv4(),
    address: 'user9@temp.mail',
    sender: 'Dropbox',
    subject: 'Your storage is almost full',
    preview: 'You\'ve used 90% of your Dropbox storage. Upgrade...',
    content: 'You\'ve used 90% of your Dropbox storage. Upgrade to Dropbox Pro to get more space and keep your files syncing smoothly.',
    timestamp: generateTimestamp(),
    isRead: true,
    spamScore: 6
  },
  {
    id: uuidv4(),
    address: 'user10@temp.mail',
    sender: 'Twitter',
    subject: 'Someone new followed you',
    preview: '@techleader and 5 others followed you on Twitter...',
    content: '@techleader and 5 others followed you on Twitter. Check out their profiles and join the conversation!',
    timestamp: generateTimestamp(),
    isRead: false,
    spamScore: 4
  }
];