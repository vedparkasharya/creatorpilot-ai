import { useState } from 'react';
import {
  Wand2,
  Copy,
  Check,
  Eye,
  Code2,
  Sparkles,
  Zap,
  Info,
  Palette,
  Layers,
  Crop,
  Sliders,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SAMPLE_IMAGES, TRANSFORMATION_PRESETS, TRANSFORMATION_CATEGORIES } from '@/cloudinary/config';

function buildCloudinaryUrl(publicId: string, transformation: string): string {
  const cleanTransform = transformation.trim();
  if (!cleanTransform) {
    return `https://res.cloudinary.com/demo/image/upload/${publicId}`;
  }
  return `https://res.cloudinary.com/demo/image/upload/${cleanTransform}/${publicId}`;
}

function getTransformationCost(transformation: string): string {
  if (transformation.includes('e_background_removal')) return '75 tx';
  if (transformation.includes('b_gen_fill')) return '50 tx';
  if (transformation.includes('e_gen_background_replace')) return '230 tx';
  if (transformation.includes('e_gen_replace')) return '120 tx';
  if (transformation.includes('e_gen_remove')) return '50 tx';
  if (transformation.includes('e_auto_enhance')) return '100 tx';
  if (transformation.includes('e_upscale')) return '10-100 tx';
  return '1 tx';
}

export function TransformationStudio() {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [transformation, setTransformation] = useState('c_fill,g_auto,w_800,h_600/f_auto/q_auto');
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('builder');

  const previewUrl = buildCloudinaryUrl(selectedImage, transformation);

  const handlePresetClick = (preset: typeof TRANSFORMATION_PRESETS[0]) => {
    setTransformation(preset.transformation);
  };

  const handleQuickTransform = (value: string) => {
    setTransformation((prev) => {
      const base = prev.replace(/\/f_auto\/q_auto$/, '');
      if (base) {
        return `${base}/${value}/f_auto/q_auto`;
      }
      return `${value}/f_auto/q_auto`;
    });
  };

  const handleNaturalLanguage = () => {
    const input = naturalLanguageInput.toLowerCase();
    let result = '';

    // Parse natural language to transformation
    if (input.includes('thumbnail') || input.includes('avatar')) {
      result = 'c_thumb,g_face,w_200,h_200';
    } else if (input.includes('remove background') || input.includes('transparent')) {
      result = 'e_background_removal';
    } else if (input.includes('resize') || input.includes('width')) {
      const match = input.match(/(\d+)/);
      const width = match ? match[1] : '800';
      result = `c_scale,w_${width}`;
    } else if (input.includes('grayscale') || input.includes('black and white')) {
      result = 'e_grayscale';
    } else if (input.includes('blur')) {
      result = 'e_blur:800';
    } else if (input.includes('round') || input.includes('circle')) {
      result = 'r_max';
    } else if (input.includes('watermark') || input.includes('logo')) {
      result = 'l_logo/c_scale,w_100/fl_layer_apply,g_south_east,x_20,y_20';
    } else if (input.includes('text') || input.includes('caption')) {
      result = 'co_white,l_text:Arial_60:Hello/fl_layer_apply,g_center';
    } else if (input.includes('enhance') || input.includes('improve')) {
      result = 'e_auto_enhance';
    } else if (input.includes('upscale') || input.includes('zoom')) {
      result = 'e_upscale';
    } else if (input.includes('generative fill') || input.includes('extend')) {
      result = 'b_gen_fill';
    } else if (input.includes('social') || input.includes('og')) {
      result = 'c_fill,g_auto,w_1200,h_630';
    } else if (input.includes('square')) {
      result = 'c_fill,g_auto,w_800,h_800';
    } else if (input.includes('portrait')) {
      result = 'c_fill,g_face,w_600,h_800';
    } else if (input.includes('landscape')) {
      result = 'c_fill,g_auto,w_1200,h_800';
    } else {
      result = 'c_fill,g_auto,w_800,h_600';
    }

    setTransformation(`${result}/f_auto/q_auto`);
    setActiveTab('builder');
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getReactCode = () => {
    return `import { AdvancedImage } from '@cloudinary/react';
import { cld } from './cloudinary/config';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

const img = cld.image('${selectedImage}')
  .resize(fill().width(800).height(600))
  .delivery(format(auto()))
  .delivery(quality(autoQuality()));

// Generated transformation: ${transformation}
// Preview URL: ${previewUrl}`;
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-4 space-y-4">
          {/* Preview */}
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  Live Preview
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">
                    Cost: {getTransformationCost(transformation)}
                  </span>
                  <Button variant="ghost" size="sm" onClick={copyUrl} className="text-slate-400 hover:text-white">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-800/50 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-[400px] object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,e_blur:400/sample.jpg';
                  }}
                />
              </div>
              <div className="mt-3 p-2 bg-slate-800/50 rounded-lg font-mono text-xs text-cyan-400 break-all">
                {previewUrl}
              </div>
            </CardContent>
          </Card>

          {/* Transformation Input */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-purple-400" />
                Transformation String
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={transformation}
                  onChange={(e) => setTransformation(e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-700 text-white font-mono text-sm"
                  placeholder="e.g., c_fill,g_auto,w_800,h_600/f_auto/q_auto"
                />
                <Button variant="outline" size="icon" onClick={copyUrl} className="border-slate-700 hover:bg-slate-800">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-800 border border-slate-700">
              <TabsTrigger value="builder" className="data-[state=active]:bg-slate-700">
                <Wand2 className="w-3.5 h-3.5 mr-1" />
                Quick Builder
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-slate-700">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="presets" className="data-[state=active]:bg-slate-700">
                <Zap className="w-3.5 h-3.5 mr-1" />
                Presets
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-slate-700">
                <Code2 className="w-3.5 h-3.5 mr-1" />
                React Code
              </TabsTrigger>
            </TabsList>

            {/* Quick Builder */}
            <TabsContent value="builder" className="mt-4">
              <div className="space-y-4">
                {TRANSFORMATION_CATEGORIES.map((cat) => {
                  const iconMap: Record<string, React.ElementType> = {
                    Crop, Sliders, Wand2, Palette, Layers, Sparkles,
                  };
                  const Icon = iconMap[cat.icon] || Wand2;
                  return (
                    <Card key={cat.name} className="bg-slate-900 border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-white flex items-center gap-2">
                          <Icon className="w-4 h-4 text-purple-400" />
                          {cat.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {cat.transformations.map((t) => (
                            <button
                              key={t.label}
                              onClick={() => handleQuickTransform(t.value)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500/50 rounded-lg text-xs text-slate-300 hover:text-white transition-all"
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* AI Assistant */}
            <TabsContent value="ai" className="mt-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-400" />
                    Natural Language Transformation
                  </CardTitle>
                  <p className="text-sm text-slate-400">
                    Describe what you want in plain English. Powered by cloudinary-transformations skill.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={naturalLanguageInput}
                      onChange={(e) => setNaturalLanguageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNaturalLanguage()}
                      placeholder="e.g., 'Make a 200x200 thumbnail with face detection'"
                      className="flex-1 bg-slate-800 border-slate-700 text-white"
                    />
                    <Button onClick={handleNaturalLanguage} className="bg-rose-600 hover:bg-rose-700">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Make a square thumbnail with face detection',
                      'Remove the background and make it transparent',
                      'Resize to 1200px wide for a hero banner',
                      'Add a subtle blur effect',
                      'Convert to black and white',
                      'Make it a perfect circle avatar',
                      'Add a white border with rounded corners',
                      'Optimize for social media sharing',
                    ].map((example) => (
                      <button
                        key={example}
                        onClick={() => {
                          setNaturalLanguageInput(example);
                          handleNaturalLanguage();
                        }}
                        className="text-left px-3 py-2 bg-slate-800/50 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Presets */}
            <TabsContent value="presets" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TRANSFORMATION_PRESETS.map((preset) => (
                  <Card
                    key={preset.name}
                    className="bg-slate-900 border-slate-800 cursor-pointer hover:border-purple-500/50 transition-all"
                    onClick={() => handlePresetClick(preset)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-white">{preset.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-400">
                          {getTransformationCost(preset.transformation)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{preset.description}</p>
                      <code className="text-[10px] text-purple-400 font-mono bg-slate-800/50 px-2 py-1 rounded block truncate">
                        {preset.transformation}
                      </code>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Code */}
            <TabsContent value="code" className="mt-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-orange-400" />
                    React SDK Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-xs text-cyan-400 font-mono whitespace-pre">
                      {getReactCode()}
                    </code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 border-slate-700 hover:bg-slate-800"
                    onClick={() => {
                      navigator.clipboard.writeText(getReactCode());
                    }}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Code
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar - Image Selection */}
      <div className="w-64 border-l border-slate-800 bg-slate-900/50 p-4 hidden lg:block overflow-auto">
        <h3 className="text-sm font-semibold text-white mb-3">Sample Images</h3>
        <div className="space-y-2">
          {SAMPLE_IMAGES.map((img) => (
            <button
              key={img}
              onClick={() => setSelectedImage(img)}
              className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all ${
                selectedImage === img
                  ? 'bg-cyan-500/20 border border-cyan-500/30'
                  : 'hover:bg-slate-800 border border-transparent'
              }`}
            >
              <img
                src={`https://res.cloudinary.com/demo/image/upload/w_40,h_40,c_fill/${img}`}
                alt={img}
                className="w-10 h-10 rounded object-cover"
              />
              <span className="text-xs text-slate-300 truncate">{img.split('/').pop()}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1">
            <Info className="w-3 h-3" />
            cloudinary-transformations
          </h4>
          <p className="text-[11px] text-slate-400">
            This studio uses the cloudinary-transformations skill to generate valid transformation URLs from natural language and provide best practices.
          </p>
        </div>
      </div>
    </div>
  );
}
