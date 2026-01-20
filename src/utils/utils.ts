import { toast } from '@/ui';

export function isMobileDevice(ua: string | null) {
  if (!ua) return false;
  if (/android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return true;
  } else {
    return false;
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const jump = (url: string, blank = true) => {
  const a = document.createElement('a');
  a.href = url;
  if (blank) {
    a.target = '_blank';
  }
  a.click();
};

export const download = (url: string, name?: string) => {
  const a = document.createElement('a');
  a.href = url;
  if (name) {
    a.download = name;
  }

  a.click();
};

export const copy = (copyText: string, toastText: string) => {
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      toast(toastText);
    })
    .catch((error) => {
      console.error('Failed to copy text:', error);
    });
};

export const getSuffix = (file: File | string) => {
  const name = typeof file === 'string' ? file : file.name;
  let suffix = name.split('.').pop()?.toLowerCase();
  if (file instanceof File) {
    suffix = suffix || file.type.split('/').pop();
  }
  return suffix;
};

export const checkSize = (file: File, size = 5) => {
  const maxFileSize = size * 1024 * 1024; // 10 MB
  if (file.size > maxFileSize) {
    console.log(`The uploaded file size cannot exceed ${size} MB`);
    return false;
  }
  return true;
};

export const checkType = (file: File, type: 'image' | 'model') => {
  const m = {
    image: ['webp', 'png', 'jpg', 'jpeg'],
    model: ['fbx', 'obj', 'stl', 'glb'],
  };
  const suffix = getSuffix(file);
  if (m[type].findIndex((v) => v === suffix) > -1) {
    return true;
  } else {
    console.log('This file type is not supported.');
    return false;
  }
};
