import { useState } from 'react';
import {
  Sparkles,
  ImageIcon,
  Download,
  Copy,
  Check,
  Zap,
  Loader2,
  Star,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SAMPLE_IMAGES } from '@/cloudinary/config';

interface GeneratedImage {
  id: string;
  prompt: string;
  transformation: string;
  url: string;
  cost: string;
  type: 'ai-transform' | 'style-transfer' | 'enhance';
}

const AI_PROMPTS = [
  { label: 'Remove Background', transform: 'e_background_removal', cost: '75 tx', icon: '✂️' },
  { label: 'Auto Enhance', transform: 'e_auto_enhance', cost: '100 tx', icon: '✨' },
  { label: 'Upscale 2x', transform: 'e_upscale', cost: '50 tx', icon: '🔍' },
  { label: 'Generative Fill Square', transform: 'c_pad,b_gen_fill,ar_1:1', cost: '50 tx', icon: '🖼️' },
  { label: 'Generative Fill Widescreen', transform: 'c_pad,b_gen_fill,ar_16:9', cost: '50 tx', icon: '🎬' },
  { label: 'Replace Background (Office)', transform: 'e_gen_background_replace:prompt_modern%20minimalist%20office', cost: '230 tx', icon: '🏢' },
  { label: 'Replace Background (Nature)', transform: 'e_gen_background_replace:prompt_beautiful%20sunset%20beach', cost: '230 tx', icon: '🌅' },
  { label: 'Remove Person', transform: 'e_gen_remove:prompt_person', cost: '50 tx', icon: '👤' },
  { label: 'Grayscale', transform: 'e_grayscale', cost: '1 tx', icon: '⚫' },
  { label: 'Sepia Vintage', transform: 'e_sepia', cost: '1 tx', icon: '📷' },
  { label: 'Cartoonify', transform: 'e_cartoonify', cost: '1 tx', icon: '🎨' },
  { label: 'Oil Paint', transform: 'e_oil_paint:50', cost: '1 tx', icon: '🖌️' },
];

const QUICK_PROMPTS = [
  'Make this look like a professional product photo',
  'Remove the background and add a gradient',
  'Enhance the colors and sharpness',
  'Convert to a artistic painting style',
  'Make it look like a magazine cover',
  'Add a dreamy, ethereal quality',
];

export function AIGenerator() {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generated, setGenerated] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateTransformation = (prompt: string): string => {
    const lower = prompt.toLowerCase();
    if (lower.includes('background') && lower.includes('remove')) return 'e_background_removal/f_png/q_auto';
    if (lower.includes('enhance')) return 'e_auto_enhance/f_auto/q_auto';
    if (lower.includes('upscale')) return 'e_upscale/c_scale,w_2.0/f_auto/q_auto';
    if (lower.includes('grayscale') || lower.includes('black and white')) return 'e_grayscale/f_auto/q_auto';
    if (lower.includes('sepia')) return 'e_sepia/f_auto/q_auto';
    if (lower.includes('cartoon')) return 'e_cartoonify/f_auto/q_auto';
    if (lower.includes('blur')) return 'e_blur:800/f_auto/q_auto';
    if (lower.includes('sharpen')) return 'e_sharpen/f_auto/q_auto';
    if (lower.includes('square')) return 'c_pad,b_gen_fill,ar_1:1/f_auto/q_auto';
    if (lower.includes('wide') || lower.includes('landscape')) return 'c_pad,b_gen_fill,ar_16:9/f_auto/q_auto';
    if (lower.includes('product')) return 'e_background_removal/b_white,c_pad,w_1.0/f_auto/q_auto';
    if (lower.includes('oil') || lower.includes('paint')) return 'e_oil_paint:50/f_auto/q_auto';
    if (lower.includes('round') || lower.includes('circle')) return 'c_fill,g_face,w_400,h_400/r_max/f_auto/q_auto';
    return 'e_auto_enhance/f_auto/q_auto';
  };

  const getCost = (transform: string): string => {
    if (transform.includes('e_background_removal')) return '75 tx';
    if (transform.includes('e_auto_enhance')) return '100 tx';
    if (transform.includes('e_upscale')) return '50 tx';
    if (transform.includes('b_gen_fill')) return '50 tx';
    if (transform.includes('e_gen_background_replace')) return '230 tx';
    if (transform.includes('e_gen_remove')) return '50 tx';
    return '1 tx';
  };

  const applyTransform = (transform: string, prompt?: string) => {
    setIsGenerating(true);
    const id = `gen-${Date.now()}`;
    const url = `https://res.cloudinary.com/demo/image/upload/${transform}/${selectedImage}`;

    setTimeout(() => {
      const newGen: GeneratedImage = {
        id,
        prompt: prompt || transform,
        transformation: transform,
        url,
        cost: getCost(transform),
        type: 'ai-transform',
      };
      setGenerated((prev) => [newGen, ...prev]);
      setIsGenerating(false);
    }, 500);
  };

  const handleCustomPrompt = () => {
    if (!customPrompt.trim()) return;
    const transform = generateTransformation(customPrompt);
    applyTransform(transform, customPrompt);
    setCustomPrompt('');
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Source Image */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-rose-400" />
              Source Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-rose-500' : 'border-transparent hover:border-slate-600'
                  }`}
                >
                  <img
                    src={`https://res.cloudinary.com/demo/image/upload/c_fill,w_100,h_100/${img}`}
                    alt={img}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="mt-3 relative rounded-lg overflow-hidden bg-slate-800">
              <img
                src={`https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_400,g_auto/${selectedImage}`}
                alt="Selected"
                className="w-full h-48 object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Prompt Input */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              AI Prompt
            </CardTitle>
            <p className="text-sm text-slate-400">
              Describe what you want to do with the image. Powered by cloudinary-transformations skill.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomPrompt()}
                placeholder="e.g., 'Remove background and make it transparent'"
                className="flex-1 bg-slate-800 border-slate-700 text-white"
              />
              <Button
                onClick={handleCustomPrompt}
                disabled={isGenerating || !customPrompt.trim()}
                className="bg-rose-600 hover:bg-rose-700"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setCustomPrompt(prompt);
                    const transform = generateTransformation(prompt);
                    applyTransform(transform, prompt);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick AI Actions */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Quick AI Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {AI_PROMPTS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => applyTransform(action.transform, action.label)}
                  disabled={isGenerating}
                  className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500/50 rounded-lg text-left transition-all disabled:opacity-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-900 rounded text-slate-400">
                      {action.cost}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-white">{action.label}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generated Images */}
        {generated.length > 0 && (
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Generated Results ({generated.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generated.map((gen) => (
                  <div key={gen.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                    <div className="relative">
                      <img
                        src={gen.url}
                        alt={gen.prompt}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-slate-300 mb-1 truncate">{gen.prompt}</p>
                      <code className="text-[10px] text-purple-400 font-mono bg-slate-900 px-2 py-1 rounded block truncate">
                        {gen.transformation}
                      </code>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-slate-500">{gen.cost}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => copyUrl(gen.url, gen.id)}
                            className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                          >
                            {copiedId === gen.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </button>
                          <a
                            href={gen.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                          >
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar Tips */}
      <div className="w-64 border-l border-slate-800 bg-slate-900/50 p-4 hidden lg:block">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          Tips
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-xs font-medium text-white mb-1">Background Removal</h4>
            <p className="text-[11px] text-slate-400">
              Use e_background_removal for clean product photos. Output as PNG for transparency.
            </p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-xs font-medium text-white mb-1">Generative Fill</h4>
            <p className="text-[11px] text-slate-400">
              Extend images to new aspect ratios with AI-generated content. Use with c_pad.
            </p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-xs font-medium text-white mb-1">Cost Optimization</h4>
            <p className="text-[11px] text-slate-400">
              Use baseline transformations (bl_) to cache expensive AI operations and reduce costs.
            </p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Transformations
          </h4>
          <div className="space-y-1 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>e_background_removal</span>
              <span className="text-yellow-400">75 tx</span>
            </div>
            <div className="flex justify-between">
              <span>e_auto_enhance</span>
              <span className="text-yellow-400">100 tx</span>
            </div>
            <div className="flex justify-between">
              <span>e_gen_background_replace</span>
              <span className="text-yellow-400">230 tx</span>
            </div>
            <div className="flex justify-between">
              <span>b_gen_fill</span>
              <span className="text-yellow-400">50 tx</span>
            </div>
            <div className="flex justify-between">
              <span>e_upscale</span>
              <span className="text-yellow-400">10-100 tx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
