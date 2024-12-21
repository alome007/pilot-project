import { useState } from 'react';

interface Alias {
  alias: string;
  destination: string;
  blockedSenders: string[];
}

interface BlockedSender {
  email: string;
  alias: string;
  blockedAt: string;
}

export function useAliases () {
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [blockedSenders, setBlockedSenders] = useState<BlockedSender[]>([]);

  const addAlias = (alias: string, destination: string) => {
    setAliases(prev => [...prev, { alias, destination, blockedSenders: [] }]);
  };

  const removeAlias = (aliasToRemove: string) => {
    setAliases(prev => prev.filter(a => a.alias !== aliasToRemove));
  };

  const blockSender = (senderEmail: string) => {
    setAliases(prev => prev.map(a => {
      return {
        ...a,
        blockedSenders: [...a.blockedSenders, senderEmail]
      };
    }));

    setBlockedSenders(prev => [...prev, {
      email: senderEmail,
      alias: 'All aliases',
      blockedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }]);
  };

  const unblockSender = (email: string) => {
    setBlockedSenders(prev => prev.filter(sender => sender.email !== email));
    setAliases(prev => prev.map(alias => ({
      ...alias,
      blockedSenders: alias.blockedSenders.filter(blocked => blocked !== email)
    })));
  };

  return {
    aliases,
    blockedSenders,
    addAlias,
    removeAlias,
    blockSender,
    unblockSender
  };
}

export function generateRandomAlias (prefix?: string): string {
  // Array of random adjectives and nouns to create interesting aliases
  const adjectives = [
    'clever', 'quick', 'silly', 'smart', 'brave', 'cool',
    'wild', 'funky', 'smooth', 'zen', 'epic', 'ninja'
  ];

  const nouns = [
    'fox', 'wolf', 'eagle', 'shark', 'tiger', 'hawk',
    'lion', 'bear', 'dragon', 'phoenix', 'cobra', 'raven'
  ];

  // Generate a random string
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 9999).toString().padStart(4, '0');

  // Combine parts
  const alias = prefix
    ? `${prefix}_${randomAdjective}_${randomNoun}_${randomNumber}`
    : `${randomAdjective}_${randomNoun}_${randomNumber}`;

  // Append domain
  return `${alias.toLowerCase()}`;
}