import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { Home } from '@/pages/Home';
import { DocsAssistant } from '@/pages/DocsAssistant';
import { TransformationStudio } from '@/pages/TransformationStudio';
import { ReactPlayground } from '@/pages/ReactPlayground';
import { MediaManager } from '@/pages/MediaManager';
import { AIGenerator } from '@/pages/AIGenerator';

type Page = 'home' | 'docs' | 'transformations' | 'playground' | 'media' | 'ai-generator';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'docs':
        return <DocsAssistant />;
      case 'transformations':
        return <TransformationStudio />;
      case 'playground':
        return <ReactPlayground />;
      case 'media':
        return <MediaManager />;
      case 'ai-generator':
        return <AIGenerator />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
        />
        <main className="flex-1 overflow-auto bg-slate-950">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
