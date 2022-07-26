import React from 'react';
import ActiveBtn from './ActiveBtn';
import { Stack } from '@mui/material';

interface NavigationBtnProps {
  page: number;
  maxPage: number;
  onClick: React.Dispatch<React.SetStateAction<number>>;
}

const NavigationBtn = ({ page, maxPage, onClick }: NavigationBtnProps) => {
  const onClickPrevPage = () => {
    onClick((prev) => prev - 1);
  };

  const onClickNextPage = () => {
    onClick((prev) => prev + 1);
  };

  return (
    <Stack direction='row' spacing='20px' justifyContent='center'>
      <ActiveBtn
        title='prev'
        direction='left'
        disabled={page === 1 ? true : false}
        onClick={onClickPrevPage}
      />
      <ActiveBtn
        title='next'
        direction='right'
        disabled={page === maxPage ? true : false}
        onClick={onClickNextPage}
      />
    </Stack>
  );
};

export default NavigationBtn;
