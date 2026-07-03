import { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  ImageIcon,
  Video,
  Upload,
  Layers,
  Sparkles,
  ExternalLink,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: string;
  code: string;
  preview?: string;
}

const CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'basic-image',
    title: 'Basic Image Display',
    description: 'Display an image with Cloudinary React SDK',
    category: 'image',
    code: `import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: { cloudName: 'demo' }
});

const img = cld.image('samples/cloudinary-icon');

function App() {
  return <AdvancedImage cldImg={img} />;
}`,
  },
  {
    id: 'responsive-image',
    title: 'Responsive Image with Plugins',
    description: 'Image with responsive sizing, lazy loading, and placeholder',
    category: 'image',
    code: `import { AdvancedImage } from '@cloudinary/react';
import { responsive, lazyload, placeholder } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

const cld = new Cloudinary({
  cloud: { cloudName: 'demo' }
});

const img = cld.image('samples/bike')
  .resize(fill().width(800))
  .delivery(format(auto()))
  .delivery(quality(autoQuality()));

function App() {
  return (
    <AdvancedImage
      cldImg={img}
      plugins={[
        responsive(),
        placeholder({ mode: 'blur' }),
        lazyload()
      ]}
      width={800}
      height={600}
    />
  );
}`,
  },
  {
    id: 'image-transform',
    title: 'Image Transformations',
    description: 'Apply resize, effects, and overlays',
    category: 'image',
    code: `import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { sepia, blur } from '@cloudinary/url-gen/actions/effect';

const cld = new Cloudinary({
  cloud: { cloudName: 'demo' }
});

const img = cld.image('samples/food/spices')
  .resize(fill().width(600).height(400))
  .effect(sepia())
  .delivery(format(auto()))
  .delivery(quality(autoQuality()));

function App() {
  return <AdvancedImage cldImg={img} width={600} height={400} />;
}`,
  },
  {
    id: 'text-overlay',
    title: 'Text Overlay',
    description: 'Add text overlay on images',
    category: 'overlay',
    code: `import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

const cld = new Cloudinary({
  cloud: { cloudName: 'demo' }
});

const img = cld.image('samples/landscapes/beach-boat')
  .resize(fill().width(800).height(600))
  .overlay(
    source(
      text('CreatorPilot AI', new TextStyle('Arial', 50)
        .fontWeight('bold')
      ).textColor('white')
    ).position(
      new Position().gravity(compass('center'))
    )
  );

function App() {
  return <AdvancedImage cldImg={img} width={800} height={600} />;
}`,
  },
  {
    id: 'image-overlay',
    title: 'Image Overlay (Watermark)',
    description: 'Add logo/watermark overlay',
    category: 'overlay',
    code: `import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { Transformation } from '@cloudinary/url-gen/transformation/Transformation';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

const cld = new Cloudinary({
  cloud: { cloudName: 'demo' }
});

const img = cld.image('samples/landscapes/girl-urban-view')
  .resize(fill().width(800).height(600))
  .overlay(
    source(
      image('samples/cloudinary-icon')
        .transformation(
          new Transformation().resize(scale().width(100))
        )
    ).position(
      new Position()
        .gravity(compass('south_east'))
        .offsetX(20)
        .offsetY(20)
    )
  );

function App() {
  return <AdvancedImage cldImg={img} width={800} height={600} />;
}`,
  },
  {
    id: 'upload-widget',
    title: 'Upload Widget',
    description: 'Client-side upload with Cloudinary Upload Widget',
    category: 'upload',
    code: `// index.html - Add script tag:
// <script src="https://upload-widget.cloudinary.com/global/all.js" async></script>

import { useEffect, useRef } from 'react';

function UploadWidget() {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window.cloudinary?.createUploadWidget === 'function') {
        clearInterval(interval);
        clearTimeout(timeout);

        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: 'demo',
            uploadPreset: 'your_preset',
            sources: ['local', 'camera', 'url'],
            multiple: false,
          },
          (error: any, result: any) => {
            if (!error && result.event === 'success') {
              console.log('Uploaded:', result.info.public_id);
            }
          }
        );
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      console.error('Upload Widget script failed to load');
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <button onClick={() => widgetRef.current?.open()}>
      Upload Image
    </button>
  );
}`,
  },
  {
    id: 'video-display',
    title: 'Video Display',
    description: 'Display video with Cloudinary React SDK',
    category: 'video',
    code: `import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';

const cld = new Cloudinary({
  cloud: { cloudName: 'demo' }
});

const video = cld.video('samples/elephants')
  .resize(fill().width(800).height(600))
  .delivery(format(auto()));

function App() {
  return (
    <AdvancedVideo
      cldVid={video}
      controls
      autoplay
      muted
      width={800}
      height={600}
    />
  );
}`,
  },
  {
    id: 'named-transformation',
    title: 'Named Transformation',
    description: 'Use named transformations for reusable presets',
    category: 'advanced',
    code: `import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

const cld = new Cloudinary({
  cloud: { cloudName: 'demo' }
});

// Use named transformation 'avatar' defined in Cloudinary dashboard
const img = cld.image('samples/two-ladies')
  .namedTransformation('avatar')
  .delivery(format(auto()))
  .delivery(quality(autoQuality()));

// Or use baseline transformation for AI operations
const img2 = cld.image('samples/food/pot-mussels')
  .transformation('bl_bg_removed')
  .resize(scale().width(500));

function App() {
  return (
    <>
      <AdvancedImage cldImg={img} />
      <AdvancedImage cldImg={img2} />
    </>
  );
}`,
  },
  {
    id: 'config-setup',
    title: 'Cloudinary Config Setup',
    description: 'Best practice configuration for React apps',
    category: 'setup',
    code: `// src/cloudinary/config.ts
import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
if (!cloudName) {
  throw new Error('VITE_CLOUDINARY_CLOUD_NAME is not set');
}

export const cld = new Cloudinary({
  cloud: { cloudName },
  url: { secure: true }
});

export const uploadPreset =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

// Usage in components:
// import { cld } from './cloudinary/config';
// const img = cld.image('public_id');

// .env file:
// VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
// VITE_CLOUDINARY_UPLOAD_PRESET=your_preset`,
  },
];

const categories = [
  { id: 'all', label: 'All Examples' },
  { id: 'setup', label: 'Setup' },
  { id: 'image', label: 'Images' },
  { id: 'overlay', label: 'Overlays' },
  { id: 'upload', label: 'Upload' },
  { id: 'video', label: 'Video' },
  { id: 'advanced', label: 'Advanced' },
];

export function ReactPlayground() {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(CODE_EXAMPLES[0]);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredExamples = activeCategory === 'all'
    ? CODE_EXAMPLES
    : CODE_EXAMPLES.filter((ex) => ex.category === activeCategory);

  const copyCode = () => {
    navigator.clipboard.writeText(selectedExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full">
      {/* Examples List */}
      <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-orange-400" />
            Code Examples
          </h3>
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {filteredExamples.map((example) => (
            <button
              key={example.id}
              onClick={() => setSelectedExample(example)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedExample.id === example.id
                  ? 'bg-orange-500/10 border border-orange-500/30'
                  : 'hover:bg-slate-800 border border-transparent'
              }`}
            >
              <h4 className="text-sm font-medium text-white">{example.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{example.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Code View */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-white">{selectedExample.title}</h2>
            <p className="text-sm text-slate-400">{selectedExample.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyCode} className="border-slate-700 hover:bg-slate-800">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-0">
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-cyan-400 font-mono whitespace-pre">
                  {selectedExample.code}
                </code>
              </pre>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    Always use f_auto/q_auto for optimization
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    Use plugins for responsive and lazy loading
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    Add width/height attributes to prevent layout shift
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    Store public_id, not full URLs
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  Import Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-[11px] text-purple-400 font-mono bg-slate-800/50 p-2 rounded overflow-x-auto">
{`import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text, image } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { Transformation } from '@cloudinary/url-gen/transformation/Transformation';`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="w-64 border-l border-slate-800 bg-slate-900/50 p-4 hidden xl:block">
        <h3 className="text-sm font-semibold text-white mb-3">SDK Components</h3>
        <div className="space-y-2">
          {[
            { name: 'AdvancedImage', desc: 'Display images with transformations', icon: ImageIcon },
            { name: 'AdvancedVideo', desc: 'Display videos with transformations', icon: Video },
            { name: 'Upload Widget', desc: 'Client-side file upload UI', icon: Upload },
            { name: 'responsive()', desc: 'Responsive image plugin', icon: ImageIcon },
            { name: 'lazyload()', desc: 'Lazy loading plugin', icon: Layers },
            { name: 'placeholder()', desc: 'Loading placeholder plugin', icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-medium text-white">{item.name}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1">
            <Code2 className="w-3 h-3" />
            cloudinary-react Skill
          </h4>
          <p className="text-[11px] text-slate-400">
            This playground uses the cloudinary-react skill to provide correct React SDK patterns, imports, and troubleshooting.
          </p>
        </div>
      </div>
    </div>
  );
}
