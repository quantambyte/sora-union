'use client';

import { IFile } from '@/Interfaces';
import { useState, useEffect } from 'react';
import TableList from './components/TableList';
import Button from './components/Button';
import Loading from './components/Loading';

export default function Home() {
  const [response, setResponse] = useState<{
    error: null;
    loading: boolean;
    data: IFile[];
  }>({
    error: null,
    loading: true,
    data: [],
  });
  const [selectedSortion, setSelectedSortion] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api');
        const data: IFile[] = await response.json();

        setResponse((prev) => ({ ...prev, data }));
      } catch (error: any) {
        console.log(error);
        setResponse((prev) => ({ ...prev, error: error.message }));
      } finally {
        setResponse((prev) => ({ ...prev, loading: false }));
      }
    })();
  }, []);

  const fetchSortedData = async (term: string) => {
    if (term === selectedSortion) {
      return;
    }
    setSelectedSortion(term);
    setResponse((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`/api?sortBy=${term}`);
      const data: IFile[] = await response.json();

      setResponse((prev) => ({ ...prev, data }));
    } catch (error: any) {
      console.log(error);
      setResponse((prev) => ({ ...prev, error: error.message }));
    } finally {
      setResponse((prev) => ({ ...prev, loading: false }));
    }
  };

  const { loading, error, data } = response;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='p-4'>
      <div className='mb-4 flex items-center justify-end gap-x-4 my-10'>
        <Button
          text={'Sort By CreatedAt'}
          onClick={(term) => fetchSortedData(term)}
          term='createdAt'
          selectedSortion={selectedSortion}
        />
        <Button
          text={'Sort By A-Z'}
          onClick={(term) => fetchSortedData(term)}
          term='sortByAZ'
          selectedSortion={selectedSortion}
        />
        <Button
          text={'Sort By Z-A'}
          onClick={(term) => fetchSortedData(term)}
          term='sortByZA'
          selectedSortion={selectedSortion}
        />
      </div>
      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='py-2 px-4 border border-gray-300'>Created At</th>
            <th className='py-2 px-4 border border-gray-300'>Filename</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            <TableList data={data} />
          ) : (
            <tr>
              <td className='py-2 px-4 text-center' colSpan={2}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
