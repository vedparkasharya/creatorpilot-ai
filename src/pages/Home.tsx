import {
  BookOpen,
  Wand2,
  Code2,
  Image,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Activity,
  Cloud,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Page = 'home' | 'docs' | 'transformations' | 'playground' | 'media' | 'ai-generator';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const features = [
  {
    id: 'docs' as Page,
    title: 'AI Docs Assistant',
    description: 'Ask Cloudinary documentation anything using natural language. Get instant answers with code examples powered by cloudinary-docs skill.',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    iconColor: 'text-blue-400',
    skill: 'cloudinary-docs',
  },
  {
    id: 'transformations' as Page,
    title: 'Transformation Studio',
    description: 'Build complex Cloudinary transformations visually. Generate valid URLs from natural language with the cloudinary-transformations skill.',
    icon: Wand2,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10 border-purple-500/30',
    iconColor: 'text-purple-400',
    skill: 'cloudinary-transformations',
  },
  {
    id: 'playground' as Page,
    title: 'React SDK Playground',
    description: 'Live code editor with Cloudinary React SDK patterns. Copy-paste ready code with the cloudinary-react skill integration.',
    icon: Code2,
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-500/10 border-orange-500/30',
    iconColor: 'text-orange-400',
    skill: 'cloudinary-react',
  },
  {
    id: 'media' as Page,
    title: 'Media Manager',
    description: 'Upload, organize, and manage your Cloudinary media assets with a beautiful visual interface.',
    icon: Image,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10 border-green-500/30',
    iconColor: 'text-green-400',
    skill: 'cloudinary-react',
  },
  {
    id: 'ai-generator' as Page,
    title: 'AI Generator',
    description: 'Generate stunning AI-powered images and apply intelligent transformations with one click.',
    icon: Sparkles,
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-500/10 border-rose-500/30',
    iconColor: 'text-rose-400',
    skill: 'cloudinary-transformations',
  },
];

const stats = [
  { label: 'Transformations', value: '50+', icon: Wand2, color: 'text-purple-400' },
  { label: 'SDK Patterns', value: '30+', icon: Code2, color: 'text-orange-400' },
  { label: 'Doc Sections', value: '100+', icon: BookOpen, color: 'text-blue-400' },
  { label: 'AI Features', value: '10+', icon: Sparkles, color: 'text-rose-400' },
];

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8">
        <div className="absolute inset-0 bg-cyan-500/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
              <Cloud className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30">
              <span className="text-xs font-semibold text-yellow-400 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Hackathon Submission 2026
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            CreatorPilot AI
          </h1>
          <p className="text-slate-400 max-w-2xl mb-6">
            A real, working AI-powered media studio built with all 3 Cloudinary Skills Pack skills.
            Transform, generate, and manage media with the power of AI.
          </p>
          <div className="flex flex-wrap gap-3">
            {['cloudinary-docs', 'cloudinary-transformations', 'cloudinary-react'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-medium text-cyan-400 border border-cyan-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-slate-800 rounded-lg ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className={`${feature.bgColor} border cursor-pointer hover:scale-[1.02] transition-all duration-200 bg-slate-900/80`}
                onClick={() => onNavigate(feature.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-slate-800 ${feature.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-800 rounded-full text-slate-400 border border-slate-700">
                      {feature.skill}
                    </span>
                  </div>
                  <CardTitle className="text-white text-lg mt-3">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 mb-4">{feature.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${feature.iconColor} hover:bg-slate-800 group`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          How CreatorPilot Uses Cloudinary Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              skill: 'cloudinary-docs',
              title: 'Documentation Intelligence',
              description: 'Real-time access to Cloudinary docs for accurate answers. Fetches latest llms.txt for up-to-date information on uploads, SDKs, and APIs.',
              icon: BookOpen,
              color: 'text-blue-400',
            },
            {
              skill: 'cloudinary-transformations',
              title: 'Smart Transformations',
              description: 'Converts natural language to valid Cloudinary URLs. Handles resize, crop, effects, overlays, and AI-powered transformations with best practices.',
              icon: Wand2,
              color: 'text-purple-400',
            },
            {
              skill: 'cloudinary-react',
              title: 'React SDK Integration',
              description: 'Provides correct React SDK patterns with proper imports. Includes Upload Widget, AdvancedImage/Video, and troubleshooting for common errors.',
              icon: Code2,
              color: 'text-orange-400',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.skill} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.skill}
                  </span>
                </div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-slate-800">
        <p className="text-sm text-slate-500">
          Built with all 3 Cloudinary Skills Pack skills for the June Mini-Hackathon 2026
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Shield className="w-3 h-3" />
            Open Source
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Globe className="w-3 h-3" />
            Cloudinary Powered
          </span>
        </div>
      </div>
    </div>
  );
}
