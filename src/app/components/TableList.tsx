import { IFile } from '@/Interfaces';
import React from 'react';
import TableRow from './TableRow';

const TableList = ({ data }: { data: IFile[] }) => {
  return (
    <>
      {data.map((row, index) => (
        <TableRow key={row.createdAt} row={row} index={index} />
      ))}
    </>
  );
};

export default TableList;
