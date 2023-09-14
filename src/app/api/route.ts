import { NextRequest, NextResponse } from 'next/server';
import csv from 'csv-parser';
import path, { resolve } from 'path';
import fs from 'fs';
import { IFile } from '@/Interfaces';

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'data.csv');

  const params = request.nextUrl.searchParams;
  const sortBy = params.get('sortBy');

  const items: IFile[] = await new Promise((resolve, reject) => {
    const parsedItems: IFile[] = [];

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data: IFile) => {
        parsedItems.push({
          createdAt: Object.values(data)[0],
          fileName: Object.values(data)[1],
        });
      })
      .on('end', () => {
        console.log('All the data has been readed');
        resolve(parsedItems);
      })
      .on('error', () => {
        reject('An Error Occurred while parsing csv file');
      });
  });

  if (sortBy === 'createdAt') {
    items.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt, undefined, { numeric: true })
    );
  } else if (sortBy === 'sortByAZ') {
    items.sort((a, b) =>
      a.fileName.localeCompare(b.fileName, undefined, { numeric: true })
    );
  } else if (sortBy === 'sortByZA') {
    items.sort((a, b) =>
      b.fileName.localeCompare(a.fileName, undefined, { numeric: true })
    );
  }

  return NextResponse.json(items);
}
