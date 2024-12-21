import React, { useEffect, useState } from 'react';
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
import { DashboardStats, getDashboardStats } from '../../services/user.api.service';
import { Alias, createAlias, deleteAlias, getAliases } from '../../services/alias.api.service';
import { useAliasStore } from '../../store/alias/alias.store';

export default function Dashboard() {
  const [isDark, setIsDark] = React.useState(
    document.documentElement.classList.contains('dark')
  );
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNewAliasModalOpen, setIsNewAliasModalOpen] = React.useState(false);
  const [isLoadingCreateAlias, setIsLoadingCreateAlias] = useState(false);
  const { incrementAliasCount, setAliasCount } = useAliasStore();

    const aliasCount = useAliasStore((state) => state.aliasCount);
  
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
  
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsData, aliasesData] = await Promise.all([
          getDashboardStats(),
          getAliases()
        ]);
        setStats(statsData);
        setAliases(aliasesData);
        setAliasCount(statsData?.totalAliases ?? 0)
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);

  const handleCreateAlias = async (alias: string, destination: string) => {
    try {
      setIsLoadingCreateAlias(true)
      const newAlias = await createAlias(alias, destination);
      setIsLoadingCreateAlias(false)
      setAliases(prev => [...prev, newAlias]);
      setIsNewAliasModalOpen(false);
      incrementAliasCount();
      setSuccessModal({
        isOpen: true,
        alias,
        destination
      });
    } catch (err) {
      setIsLoadingCreateAlias(false)
      setError('Failed to create alias');
      console.error('Error creating alias:', err);
    }
  };

  const handleDeleteAlias = async (aliasId: string) => {
    try {
      await deleteAlias(aliasId);
      setAliases(prev => prev.filter(a => a.id !== aliasId));
    } catch (err) {
      setError('Failed to delete alias');
      console.error('Error deleting alias:', err);
    }
  };

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.theme = newIsDark ? 'dark' : 'light';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
      <NewAliasModal
        isOpen={isNewAliasModalOpen}
        isLoading={isLoadingCreateAlias}
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
          <Stats totalAliases={aliasCount ?? 0} />
          <div className="flex-1 overflow-auto">
            {currentView === 'aliases' ? (
              <AliasView
                aliases={aliases}
                onDelete={()=>{}}
                onBlock={()=>{}}
              />
            ) : currentView === 'blocked' ? (
              <BlockedView
                blockedSenders={[]}
                onUnblock={()=>{}}
                onBlock={()=>{}}
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