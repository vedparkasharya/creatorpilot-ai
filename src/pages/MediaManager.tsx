import { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  ImageIcon,
  Video,
  Grid3X3,
  List,
  Search,
  FolderOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { SAMPLE_IMAGES, SAMPLE_VIDEOS } from '@/cloudinary/config';

interface MediaItem {
  id: string;
  publicId: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  width?: number;
  height?: number;
  format?: string;
  createdAt: string;
  folder: string;
}

// Simulated media library
const INITIAL_MEDIA: MediaItem[] = [
  ...SAMPLE_IMAGES.map((id, i) => ({
    id: `img-${i}`,
    publicId: id,
    type: 'image' as const,
    url: `https://res.cloudinary.com/demo/image/upload/${id}`,
    thumbnail: `https://res.cloudinary.com/demo/image/upload/c_fill,w_200,h_200/${id}`,
    width: 800 + i * 100,
    height: 600 + i * 50,
    format: ['jpg', 'png', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'jpg'][i],
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    folder: id.includes('/') ? id.split('/')[0] : 'root',
  })),
  ...SAMPLE_VIDEOS.map((id, i) => ({
    id: `vid-${i}`,
    publicId: id,
    type: 'video' as const,
    url: `https://res.cloudinary.com/demo/video/upload/${id}`,
    thumbnail: `https://res.cloudinary.com/demo/video/upload/so_0,w_200,h_200,c_fill/${id}.jpg`,
    width: 1920,
    height: 1080,
    format: 'mp4',
    createdAt: new Date(Date.now() - (i + 10) * 86400000).toISOString(),
    folder: 'samples',
  })),
];

declare global {
  interface Window {
    cloudinary: any;
  }
}

export function MediaManager() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const widgetRef = useRef<any>(null);

  // Setup Upload Widget
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window.cloudinary?.createUploadWidget === 'function') {
        clearInterval(interval);
        clearTimeout(timeout);

        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: 'demo',
            uploadPreset: 'unsigned_preset',
            sources: ['local', 'camera', 'url', 'dropbox', 'google_drive'],
            multiple: true,
            maxFiles: 10,
          },
          (error: any, result: any) => {
            if (!error && result.event === 'success') {
              const newItem: MediaItem = {
                id: `upload-${Date.now()}`,
                publicId: result.info.public_id,
                type: result.info.resource_type === 'video' ? 'video' : 'image',
                url: result.info.secure_url,
                thumbnail: result.info.thumbnail_url || result.info.secure_url,
                width: result.info.width,
                height: result.info.height,
                format: result.info.format,
                createdAt: new Date().toISOString(),
                folder: 'uploads',
              };
              setMediaItems((prev) => [newItem, ...prev]);
              setUploadStatus('success');
              setTimeout(() => setUploadStatus('idle'), 3000);
            }
          }
        );
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const openUploadWidget = () => {
    setUploadStatus('uploading');
    widgetRef.current?.open();
  };

  const filteredItems = mediaItems.filter((item) =>
    item.publicId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const deleteSelected = () => {
    setMediaItems((prev) => prev.filter((item) => !selectedItems.has(item.id)));
    setSelectedItems(new Set());
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const folders = [...new Set(mediaItems.map((item) => item.folder))];

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media..."
                className="pl-9 bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedItems.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={deleteSelected}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete ({selectedItems.size})
              </Button>
            )}
            <div className="flex bg-slate-800 rounded-lg border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Button onClick={openUploadWidget} className="bg-cyan-600 hover:bg-cyan-700">
              <Upload className="w-4 h-4 mr-1" />
              Upload
            </Button>
          </div>
        </div>

        {/* Status */}
        {uploadStatus === 'success' && (
          <div className="px-4 py-2 bg-green-500/10 border-b border-green-500/30 text-green-400 text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            Upload successful! New media added to your library.
          </div>
        )}

        {/* Media Grid/List */}
        <div className="flex-1 overflow-auto p-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className={`bg-slate-900 border-slate-800 overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all ${
                    selectedItems.has(item.id) ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  onClick={() => toggleSelection(item.id)}
                >
                  <div className="relative aspect-square bg-slate-800">
                    <img
                      src={item.thumbnail}
                      alt={item.publicId}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      {item.type === 'video' ? (
                        <Video className="w-4 h-4 text-white drop-shadow-lg" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-white drop-shadow-lg" />
                      )}
                    </div>
                    {selectedItems.has(item.id) && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                        <Check className="w-8 h-8 text-cyan-400" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs text-slate-300 truncate">{item.publicId.split('/').pop()}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-slate-500 uppercase">{item.format}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyUrl(item.url, item.id);
                        }}
                        className="text-slate-500 hover:text-white"
                      >
                        {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelection(item.id)}
                  className={`flex items-center gap-4 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-all ${
                    selectedItems.has(item.id) ? 'ring-2 ring-cyan-500' : ''
                  }`}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.publicId}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.publicId}</p>
                    <p className="text-xs text-slate-500">
                      {item.type} • {item.format} • {item.width}x{item.height}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">{item.folder}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(item.url, item.id);
                    }}
                    className="text-slate-500 hover:text-white"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-56 border-l border-slate-800 bg-slate-900/50 p-4 hidden lg:block">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-cyan-400" />
          Folders
        </h3>
        <div className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSearchQuery(folder)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-left"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              {folder}
              <span className="ml-auto text-slate-600">
                {mediaItems.filter((m) => m.folder === folder).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-white mb-3">Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total Items</span>
              <span className="text-white">{mediaItems.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Images</span>
              <span className="text-white">{mediaItems.filter((m) => m.type === 'image').length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Videos</span>
              <span className="text-white">{mediaItems.filter((m) => m.type === 'video').length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Selected</span>
              <span className="text-cyan-400">{selectedItems.size}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
