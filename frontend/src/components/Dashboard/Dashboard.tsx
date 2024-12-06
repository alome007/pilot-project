import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import AliasView from './AliasView';
import BlockedView from './BlockedView';
import Stats from './Stats';
import Settings from './Settings';
import Billing from './Billing';
import Notifications from './Notifications';
import Help from './Help';
import NewAliasModal from './NewAliasModal';
import SuccessModal from './SuccessModal';
import { useAliases } from '../../hooks/useAliases';

export default function Dashboard() {
  const [isDark, setIsDark] = React.useState(
    document.documentElement.classList.contains('dark')
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNewAliasModalOpen, setIsNewAliasModalOpen] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState<{
    isOpen: boolean;
    alias: string;
    destination: string;
  }>({
    isOpen: false,
    alias: '',
    destination: ''
  });
  const [currentView, setCurrentView] = React.useState('inbox');
  
  const { aliases, blockedSenders, addAlias, removeAlias, blockSender, unblockSender } = useAliases();

  const handleCreateAlias = (alias: string, destination: string) => {
    addAlias(alias, destination);
    setIsNewAliasModalOpen(false);
    setIsMobileMenuOpen(false);
    setSuccessModal({
      isOpen: true,
      alias,
      destination
    });
  };

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.theme = newIsDark ? 'dark' : 'light';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
      <NewAliasModal
        isOpen={isNewAliasModalOpen}
        onClose={() => setIsNewAliasModalOpen(false)}
        onCreateAlias={handleCreateAlias}
      />
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
        alias={successModal.alias}
        destination={successModal.destination}
      />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Sidebar
          onNewAlias={() => setIsNewAliasModalOpen(true)}
          currentView={currentView}
          onViewChange={setCurrentView}
          aliases={aliases}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <div className="flex-1 overflow-hidden flex flex-col">
          <Stats totalAliases={aliases.length} />
          <div className="flex-1 overflow-auto">
            {currentView === 'aliases' ? (
              <AliasView
                aliases={aliases}
                onDelete={removeAlias}
                onBlock={blockSender}
              />
            ) : currentView === 'blocked' ? (
              <BlockedView
                blockedSenders={blockedSenders}
                onUnblock={unblockSender}
                onBlock={blockSender}
              />
          ) : currentView === 'settings' ? (
            <Settings />
          ) : currentView === 'billing' ? (
            <Billing />
          ) : currentView === 'notifications' ? (
            <Notifications />
          ) : currentView === 'help' ? (
            <Help />
          ) : (
            <EmailList view={currentView} />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}