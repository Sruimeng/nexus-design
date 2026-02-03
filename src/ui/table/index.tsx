import { cn } from '@/utils';
import * as TanstackTable from '@tanstack/react-table';
import * as React from 'react';

const TableRoot = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-3.5 text-text-primary', className)}
      {...props}
    />
  ),
);
TableRoot.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-surface-secondary text-text-secondary', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tfoot ref={ref} className={className} {...props} />);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-border-dim text-text-primary transition-colors duration-fast ease-smooth hover:bg-surface-hover',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    className={cn('font-medium text-start text-text-secondary', className)}
    ref={ref}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => <td ref={ref} {...props} />);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-3.5', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

interface ITable
  extends React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>
  > {
  Body: typeof TableBody;
  Caption: typeof TableCaption;
  Cell: typeof TableCell;
  Footer: typeof TableFooter;
  Head: typeof TableHead;
  Header: typeof TableHeader;
  Row: typeof TableRow;
  Root: typeof TableRoot;
}

const Table = React.forwardRef((props, ref) => <TableRoot {...props} ref={ref} />) as ITable;

Table.displayName = 'Table';

// 附加子组件
Table.Root = TableRoot;
Table.Body = TableBody;
Table.Caption = TableCaption;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;

export { Table, TanstackTable };
