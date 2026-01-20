import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface MasonryProps<T extends { id: string | number }> {
  data: T[];
  render: (item: T, index: number) => React.ReactNode;
  columnWidth?: number;
  gap?: number;
}

export const Masonry = <T extends { id: string | number }>({
  data,
  render,
  columnWidth = 250,
  gap = 12,
}: MasonryProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [columnData, setColumnData] = useState<T[][]>([]);

  // 计算列
  useEffect(() => {
    const calculateColumns = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const calculatedColumns = Math.max(
        1,
        Math.floor((containerWidth + gap) / (columnWidth + gap)),
      );

      if (calculatedColumns !== columns) {
        setColumns(calculatedColumns);
      }
    };

    calculateColumns();

    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [columnWidth, gap, columns]);

  // 分配数据到列
  useEffect(() => {
    if (columns === 0) return;

    const newColumnData: T[][] = Array.from({ length: columns }, () => []);
    let index = 0;
    data.forEach((item) => {
      newColumnData[index].push(item);
      index += 1;
      if (index === newColumnData.length) {
        index = 0;
      }
    });
    setColumnData(newColumnData);
  }, [data, columns]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="w-full flex" style={{ gap: `${gap}px` }}>
        {columnData.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-1 flex-col" style={{ gap: `${gap}px` }}>
            {column.map((item, itemIndex) => (
              <div key={itemIndex}>{render(item, data.indexOf(item))}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
