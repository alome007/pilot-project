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

export function useAliases() {
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
