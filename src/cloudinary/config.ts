import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';

export const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
  url: {
    secure: true,
  },
});

export const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

export const CLOUDINARY_CONFIG = {
  cloudName,
  uploadPreset,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
};

// Sample public IDs for demo
export const SAMPLE_IMAGES = [
  'samples/cloudinary-icon',
  'samples/bike',
  'samples/landscapes/beach-boat',
  'samples/food/spices',
  'samples/two-ladies',
  'samples/landscapes/girl-urban-view',
  'samples/animals/reindeer',
  'samples/food/pot-mussels',
];

export const SAMPLE_VIDEOS = [
  'samples/elephants',
  'samples/sea-turtle',
];

// Transformation presets for quick access
export const TRANSFORMATION_PRESETS = [
  {
    name: 'Smart Thumbnail',
    description: '200x200 face-centered thumbnail',
    transformation: 'c_thumb,g_face,w_200,h_200/f_auto/q_auto',
  },
  {
    name: 'Hero Banner',
    description: '1920x600 smart crop for hero sections',
    transformation: 'c_fill,g_auto,w_1920,h_600/f_auto/q_auto',
  },
  {
    name: 'Card Image',
    description: '800x600 fill with auto gravity',
    transformation: 'c_fill,g_auto,w_800,h_600/f_auto/q_auto',
  },
  {
    name: 'Square Avatar',
    description: '400x400 rounded avatar',
    transformation: 'c_fill,g_face,w_400,h_400/r_max/f_auto/q_auto',
  },
  {
    name: 'Background Removed',
    description: 'Remove background, output PNG',
    transformation: 'e_background_removal/f_png/q_auto',
  },
  {
    name: 'Generative Fill',
    description: 'Extend to 16:9 with AI fill',
    transformation: 'c_pad,b_gen_fill,ar_16:9/f_auto/q_auto',
  },
  {
    name: 'Auto Enhance',
    description: 'AI-powered quality enhancement',
    transformation: 'e_auto_enhance/f_auto/q_auto',
  },
  {
    name: 'Social Card',
    description: '1200x630 optimized for social sharing',
    transformation: 'c_fill,g_auto,w_1200,h_630/f_auto/q_auto',
  },
  {
    name: 'Blur Placeholder',
    description: 'Heavy blur for loading states',
    transformation: 'e_blur:2000/w_50/f_auto/q_auto:low',
  },
  {
    name: 'Upscale',
    description: 'AI upscale 2x without quality loss',
    transformation: 'e_upscale/c_scale,w_2.0/f_auto/q_auto',
  },
];

// Quick transformation categories
export const TRANSFORMATION_CATEGORIES = [
  {
    name: 'Resize & Crop',
    icon: 'Crop',
    transformations: [
      { label: 'Scale to Width', value: 'c_scale,w_800' },
      { label: 'Scale to Height', value: 'c_scale,h_600' },
      { label: 'Fill 16:9', value: 'c_fill,g_auto,w_1920,h_1080' },
      { label: 'Fill 4:3', value: 'c_fill,g_auto,w_800,h_600' },
      { label: 'Fill 1:1', value: 'c_fill,g_auto,w_800,h_800' },
      { label: 'Fit Within', value: 'c_fit,w_800,h_600' },
      { label: 'Pad to Size', value: 'c_pad,b_auto,w_800,h_600' },
      { label: 'Limit Max Size', value: 'c_limit,w_1200' },
    ],
  },
  {
    name: 'AI-Powered',
    icon: 'Sparkles',
    transformations: [
      { label: 'Remove Background', value: 'e_background_removal' },
      { label: 'Generative Fill', value: 'b_gen_fill' },
      { label: 'Auto Enhance', value: 'e_auto_enhance' },
      { label: 'Upscale 2x', value: 'e_upscale' },
      { label: 'Gen Background Replace', value: 'e_gen_background_replace:prompt_modern%20office' },
      { label: 'Gen Remove Object', value: 'e_gen_remove:prompt_person' },
      { label: 'Auto Tag', value: 'c_auto,g_auto' },
    ],
  },
  {
    name: 'Effects',
    icon: 'Wand2',
    transformations: [
      { label: 'Grayscale', value: 'e_grayscale' },
      { label: 'Sepia', value: 'e_sepia' },
      { label: 'Blur', value: 'e_blur:800' },
      { label: 'Sharpen', value: 'e_sharpen' },
      { label: 'Cartoonify', value: 'e_cartoonify' },
      { label: 'Oil Paint', value: 'e_oil_paint:40' },
      { label: 'Vignette', value: 'e_vignette:30' },
    ],
  },
  {
    name: 'Adjust',
    icon: 'Sliders',
    transformations: [
      { label: 'Brightness +20', value: 'e_brightness:20' },
      { label: 'Contrast +20', value: 'e_contrast:20' },
      { label: 'Saturation +20', value: 'e_saturation:20' },
      { label: 'Hue Shift 45', value: 'e_hue:45' },
      { label: 'Auto Brightness', value: 'e_auto_brightness' },
      { label: 'Auto Contrast', value: 'e_auto_contrast' },
      { label: 'Auto Color', value: 'e_auto_color' },
    ],
  },
  {
    name: 'Style',
    icon: 'Palette',
    transformations: [
      { label: 'Round Corners', value: 'r_20' },
      { label: 'Circle', value: 'r_max' },
      { label: 'Black Border', value: 'bo_5px_solid_black' },
      { label: 'White Border', value: 'bo_5px_solid_white' },
      { label: 'Shadow', value: 'e_shadow:20' },
      { label: 'Color Tint Blue', value: 'co_rgb:0044ff,e_colorize:30' },
      { label: 'Color Tint Red', value: 'co_rgb:ff0044,e_colorize:30' },
    ],
  },
  {
    name: 'Overlays',
    icon: 'Layers',
    transformations: [
      { label: 'Watermark SE', value: 'l_logo/c_scale,w_100/fl_layer_apply,g_south_east,x_20,y_20' },
      { label: 'Watermark NW', value: 'l_logo/c_scale,w_100/fl_layer_apply,g_north_west,x_20,y_20' },
      { label: 'Text Center', value: 'co_white,l_text:Arial_60:CREATORPILOT/fl_layer_apply,g_center' },
      { label: 'Text Bottom', value: 'co_white,l_text:Arial_40:CREATORPILOT/fl_layer_apply,g_south,y_20' },
    ],
  },
];
