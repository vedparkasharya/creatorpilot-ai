import {
  Home,
  BookOpen,
  Wand2,
  Code2,
  Image,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Cloud,
} from 'lucide-react';
type Page = 'home' | 'docs' | 'transformations' | 'playground' | 'media' | 'ai-generator';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'home' as Page, label: 'Dashboard', icon: Home },
  { id: 'docs' as Page, label: 'AI Docs Assistant', icon: BookOpen },
  { id: 'transformations' as Page, label: 'Transformation Studio', icon: Wand2 },
  { id: 'playground' as Page, label: 'React SDK Playground', icon: Code2 },
  { id: 'media' as Page, label: 'Media Manager', icon: Image },
  { id: 'ai-generator' as Page, label: 'AI Generator', icon: Sparkles },
];

export function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      <div
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 relative z-20`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-slate-800">
          <Cloud className="w-8 h-8 text-cyan-400 flex-shrink-0" />
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <h1 className="text-lg font-bold text-white whitespace-nowrap">CreatorPilot</h1>
              <p className="text-[10px] text-cyan-400 font-medium whitespace-nowrap">AI-Powered Media Studio</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-white'}`} />
                {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
                {isActive && isOpen && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Cloudinary Skills Badge */}
        {isOpen && (
          <div className="px-4 py-3 border-t border-slate-800">
            <div className="bg-slate-800/80 rounded-lg p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Cloudinary Skills</p>
              <div className="flex flex-wrap gap-1">
                {['cloudinary-docs', 'cloudinary-transformations', 'cloudinary-react'].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  >
                    {skill.replace('cloudinary-', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
      </div>
    </>
  );
}
