import { Menu, Github, Cloud, Zap } from 'lucide-react';

type Page = 'home' | 'docs' | 'transformations' | 'playground' | 'media' | 'ai-generator';

interface HeaderProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  currentPage: Page;
}

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  home: { title: 'Dashboard', subtitle: 'Overview of your media projects' },
  docs: { title: 'AI Docs Assistant', subtitle: 'Ask Cloudinary docs anything' },
  transformations: { title: 'Transformation Studio', subtitle: 'Visual editor for media transformations' },
  playground: { title: 'React SDK Playground', subtitle: 'Live code playground with Cloudinary React SDK' },
  media: { title: 'Media Manager', subtitle: 'Upload and manage your media assets' },
  'ai-generator': { title: 'AI Generator', subtitle: 'Generate images and transformations with AI' },
};

export function Header({ sidebarOpen, onSidebarToggle, currentPage }: HeaderProps) {
  const { title, subtitle } = pageTitles[currentPage];

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-700">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs text-slate-300">Powered by Cloudinary Skills Pack</span>
        </div>
        <a
          href="https://github.com/vedparkasharya/creatorpilot-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/30">
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-cyan-400 font-medium">Cloudinary</span>
        </div>
      </div>
    </header>
  );
}
