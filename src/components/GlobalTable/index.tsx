// components/GlobalTable.tsx
import React from "react";

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  className?: string;
  render?: (row: T, index: number) => React.ReactNode;
};

type GlobalTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  getRowClassName?: (row: T, index: number) => string;
};

function GlobalTable<T>({ columns, data, getRowClassName }: GlobalTableProps<T>) {
  return (
    <div className="overflow-auto">
      <table className="border-spacing-y-[10px] border-separate -mt-2 w-full">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`border-b-0 whitespace-nowrap ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`intro-x ${getRowClassName ? getRowClassName(row, rowIndex) : ""}`}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`box dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005] ${col.className || ""}`}>
                  {col.render ? col.render(row, rowIndex) : (col.accessor ? (row[col.accessor] as React.ReactNode) : null)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GlobalTable;
