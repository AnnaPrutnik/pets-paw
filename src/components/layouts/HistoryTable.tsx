import React from 'react';
import { History } from '../../types';

import { Stack } from '@mui/material';
import HistoryRow from '../ui/HistoryRow';

interface HistoryTableProps {
  history: History[];
}

const HistoryTable = ({ history }: HistoryTableProps) => {
  return (
    <>
      {history.length > 0 && (
        <Stack spacing='10px'>
          {history.map((log) => (
            <HistoryRow history={log} key={log.id} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default HistoryTable;
