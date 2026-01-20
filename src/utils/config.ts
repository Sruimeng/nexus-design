import { theme } from '@/theme';
import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { type Theme } from 'unocss/preset-mini';

function flattenThemeColors(colorsObj: Theme['colors'], prefix: string = ''): string[] {
  const result: string[] = [];
  if (!colorsObj) return result;

  Object.entries(colorsObj).forEach(([key, value]) => {
    // 当前键的完整路径
    const currentKey = key === 'DEFAULT' ? prefix : prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'string') {
      // 如果值是字符串，直接添加到结果数组
      result.push(currentKey);
    } else if (typeof value === 'object' && value !== null) {
      // 如果值是对象，递归处理
      const nestedColors = flattenThemeColors(value, currentKey);
      result.push(...nestedColors);
    }
  });

  return result;
}

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: flattenThemeColors(theme.colors),
    },
    classGroups: {
      'font-size': [
        {
          text: [(arg: string) => !isNaN(Number(arg))],
        },
      ],
      'text-color': [
        {
          c: [(arg: string) => isNaN(Number(arg))],
          color: [(arg: string) => isNaN(Number(arg))],
        },
      ],
      rounded: [
        {
          rounded: [(arg: string) => !isNaN(Number(arg))],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
