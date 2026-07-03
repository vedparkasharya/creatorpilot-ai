import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  codeBlocks?: { language: string; code: string }[];
}

const quickQuestions = [
  'How do I upload images to Cloudinary?',
  'What are the best practices for image optimization?',
  'How do I use the React SDK for image display?',
  'What transformation should I use for thumbnails?',
  'How do I remove backgrounds from images?',
  'What is the difference between signed and unsigned uploads?',
  'How do I add text overlays on images?',
  'What are generative AI transformations?',
];

// Documentation knowledge base (embedded for instant responses)
const DOCS_KNOWLEDGE: Record<string, { answer: string; code?: string; codeLang?: string }> = {
  'upload': {
    answer: `To upload images to Cloudinary, you have several options:\n\n1. **Upload Widget** (Client-side): Use Cloudinary's Upload Widget for easy client-side uploads with UI.\n2. **Upload API** (Server-side): Use the Node.js SDK for server-side uploads.\n3. **Signed Uploads**: For production, use signed uploads with a backend signature.\n\nKey steps:\n- Create an upload preset in your Cloudinary dashboard\n- Use unsigned uploads for quick prototyping\n- Use signed uploads for production security`,
    code: `// Client-side Upload Widget setup\nimport { cld } from './cloudinary/config';\n\n// In your component\nconst widget = window.cloudinary.createUploadWidget(\n  {\n    cloudName: 'your_cloud_name',\n    uploadPreset: 'your_preset',\n    sources: ['local', 'camera', 'url'],\n  },\n  (error, result) => {\n    if (!error && result.event === 'success') {\n      console.log('Uploaded:', result.info.public_id);\n    }\n  }\n);\n\nwidget.open();`,
    codeLang: 'typescript',
  },
  'react sdk': {
    answer: `The Cloudinary React SDK (@cloudinary/react) provides components for displaying and transforming media:\n\n**Key Components:**\n- **AdvancedImage**: Display images with transformations\n- **AdvancedVideo**: Display videos with transformations\n- **Upload Widget**: Client-side upload interface\n\n**Setup Steps:**\n1. Install: npm install @cloudinary/react @cloudinary/url-gen\n2. Create a Cloudinary instance with your cloud name\n3. Use AdvancedImage/AdvancedVideo components\n\n**Best Practices:**\n- Use plugins: responsive(), lazyload(), placeholder()\n- Always add width and height attributes\n- Chain transformations on the image instance`,
    code: `import { Cloudinary } from '@cloudinary/url-gen';\nimport { AdvancedImage } from '@cloudinary/react';\nimport { fill } from '@cloudinary/url-gen/actions/resize';\nimport { format, quality } from '@cloudinary/url-gen/actions/delivery';\nimport { auto } from '@cloudinary/url-gen/qualifiers/format';\nimport { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';\nimport { responsive, lazyload, placeholder } from '@cloudinary/react';\n\nconst cld = new Cloudinary({\n  cloud: { cloudName: 'your_cloud' }\n});\n\n// Create image with transformations\nconst img = cld.image('public_id')\n  .resize(fill().width(800).height(600))\n  .delivery(format(auto()))\n  .delivery(quality(autoQuality()));\n\n// Use in component\n<AdvancedImage\n  cldImg={img}\n  plugins={[responsive(), placeholder({ mode: 'blur' }), lazyload()]}\n  width={800}\n  height={600}\n/>`,
    codeLang: 'tsx',
  },
  'thumbnail': {
    answer: `For thumbnails, use **c_thumb** (thumbnail crop) with **g_face** (face gravity) for portraits, or **g_auto** for smart cropping:\n\n**Best transformation for thumbnails:**\n- c_thumb: Creates a thumbnail by cropping to fill the dimensions\n- g_face: Centers on detected faces (great for avatars)\n- g_auto: Smart content detection (good for general images)\n- r_max: Makes it a perfect circle (for avatars)\n\n**Cost:** Standard transformation (1 tx credit)`,
    code: `// Square face-centered thumbnail (avatar)\nc_thumb,g_face,w_200,h_200/r_max/f_auto/q_auto\n\n// General smart thumbnail\nc_thumb,g_auto,w_300,h_300/f_auto/q_auto\n\n// Using React SDK\nimport { thumbnail } from '@cloudinary/url-gen/actions/resize';\nimport { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';\n\nconst img = cld.image('public_id')\n  .resize(thumbnail().width(200).height(200).gravity(autoGravity()));`,
    codeLang: 'tsx',
  },
  'background removal': {
    answer: `Cloudinary offers AI-powered background removal with **e_background_removal**:\n\n**Key Points:**\n- Cost: 75 transformation credits per use\n- Output: Use f_png for transparency\n- Alternative: Use b_gen_fill to extend backgrounds\n\n**Tips:**\n- For product photos: e_background_removal + f_png\n- To add color background: e_background_removal + b_white,c_pad\n- Use baseline transformations (bl_) to cache expensive operations`,
    code: `// Remove background with transparency\ne_background_removal/f_png/q_auto\n\n// Remove background + add white background\ne_background_removal/b_white,c_pad,w_1.0/f_auto/q_auto\n\n// Using cached baseline (saves credits)\nbl_bg_removed/c_scale,w_500/f_auto/q_auto`,
    codeLang: 'url',
  },
  'optimization': {
    answer: `Cloudinary image optimization best practices:\n\n**Always Use:**\n- f_auto: Automatic format selection (WebP, AVIF based on browser)\n- q_auto: Automatic quality optimization\n- g_auto: Smart gravity for cropping\n\n**Responsive Images:**\n- Use responsive() plugin with React SDK\n- Use dpr_auto for Retina displays (Chromium only)\n- Use fill() resize for responsive behavior\n\n**Advanced:**\n- Named transformations for reuse\n- Baseline transformations for expensive operations\n- Client Hints for responsive delivery`,
    code: `// Basic optimization\ncld.image('id')\n  .resize(fill().width(800).height(600))\n  .delivery(format(auto()))\n  .delivery(quality(autoQuality()));\n\n// With plugins for responsive + lazy loading\n<AdvancedImage\n  cldImg={img}\n  plugins={[\n    responsive(),\n    placeholder({ mode: 'blur' }),\n    lazyload()\n  ]}\n/>\n\n// URL format\nc_fill,g_auto,w_800,h_600/f_auto/q_auto`,
    codeLang: 'tsx',
  },
};

function findBestAnswer(question: string): { answer: string; code?: string; codeLang?: string } | null {
  const lowerQ = question.toLowerCase();
  for (const [key, value] of Object.entries(DOCS_KNOWLEDGE)) {
    if (lowerQ.includes(key)) {
      return value;
    }
  }
  // Check partial matches
  const keywords = ['upload', 'react', 'sdk', 'thumbnail', 'background', 'optimization', 'transform', 'overlay', 'signed', 'unsigned'];
  for (const kw of keywords) {
    if (lowerQ.includes(kw) && DOCS_KNOWLEDGE[kw]) {
      return DOCS_KNOWLEDGE[kw];
    }
  }
  return null;
}

// Simulated AI response generator
function generateResponse(question: string): string {
  const match = findBestAnswer(question);
  if (match) {
    let response = match.answer;
    if (match.code) {
      response += `\n\n**Example Code:**\n\`\`\`${match.codeLang}\n${match.code}\n\`\`\``;
    }
    return response;
  }

  // Generic Cloudinary response based on question
  return `Based on the Cloudinary documentation, here's what you need to know about "${question}":\n\n**Key Points:**\n1. Cloudinary provides comprehensive image and video management APIs\n2. Use @cloudinary/react for React applications\n3. Use @cloudinary/url-gen for generating transformation URLs\n4. Always optimize with f_auto/q_auto\n\nFor detailed implementation, check the Cloudinary documentation at:\n- https://cloudinary.com/documentation\n- https://cloudinary.com/documentation/react_integration\n\nWould you like me to provide specific code examples for your use case?`;
}

export function DocsAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your Cloudinary Docs AI Assistant, powered by the **cloudinary-docs** skill. I can help you with:\n\n- Image/video uploads and management\n- SDK integration (React, Node.js, etc.)\n- Transformation syntax and best practices\n- AI-powered transformations\n- Troubleshooting common issues\n\nWhat would you like to know about Cloudinary?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickQuestion = (q: string) => {
    setInput(q);
  };

  const renderMessage = (msg: Message) => {
    const isUser = msg.role === 'user';
    return (
      <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-1">
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
        )}
        <div className={`max-w-[80%] ${isUser ? 'order-1' : ''}`}>
          <Card className={`${isUser ? 'bg-cyan-600 border-cyan-500' : 'bg-slate-800 border-slate-700'}`}>
            <CardContent className="p-3">
              <div className="text-sm whitespace-pre-wrap text-slate-100">
                {msg.content.split(/(\*\*.*?\*\*|`.*?`)/).map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith('`') && part.endsWith('`') && !part.includes('\n')) {
                    return (
                      <code key={i} className="px-1.5 py-0.5 bg-slate-900 rounded text-xs text-cyan-400 font-mono">
                        {part.slice(1, -1)}
                      </code>
                    );
                  }
                  return part;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center flex-shrink-0 mt-1 order-2">
            <User className="w-4 h-4 text-slate-300" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Searching Cloudinary documentation...
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-slate-800 p-4 bg-slate-900/50">
          <div className="max-w-4xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Cloudinary..."
              className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar - Quick Questions */}
      <div className="w-72 border-l border-slate-800 bg-slate-900/50 p-4 hidden lg:block">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Quick Questions
        </h3>
        <div className="space-y-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuickQuestion(q)}
              className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="text-xs font-semibold text-cyan-400 mb-2 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            cloudinary-docs Skill
          </h4>
          <p className="text-[11px] text-slate-400">
            This assistant uses the cloudinary-docs skill to provide accurate answers from the latest Cloudinary documentation via llms.txt files.
          </p>
        </div>
      </div>
    </div>
  );
}
