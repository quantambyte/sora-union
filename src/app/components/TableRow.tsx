import { IFile } from '@/Interfaces';
import React from 'react';

const TableRow = ({ row, index }: { row: IFile; index: number }) => {
  return (
    <tr>
      <td
        className={`${
          index % 2 === 0 ? 'bg-gray-100' : ''
        } border border-gray-300 p-2`}
      >
        {row.createdAt}
      </td>
      <td
        className={`${
          index % 2 === 0 ? 'bg-gray-100' : ''
        } border border-gray-300 p-2`}
      >
        {row.fileName}
      </td>
    </tr>
  );
};

export default TableRow;
