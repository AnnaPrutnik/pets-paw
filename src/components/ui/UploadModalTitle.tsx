import React from 'react';
import { Typography, Link } from '@mui/material';

const UploadModalTitle = () => {
  return (
    <>
      <Typography variant='h4' component='p' alignSelf='center' mb='10px'>
        Upload a .jpg or .png Cat Image
      </Typography>
      <Typography color='text.secondary' variant='body2' mb='40px'>
        Any uploads must comply with the
        <Link
          underline='hover'
          href='https://thecatapi.com/privacy'
          target='_blank'
          rel='noopener noreferrer'
          mx='5px'
        >
          upload guidelines
        </Link>
        or face deletion.
      </Typography>
      ;
    </>
  );
};

export default UploadModalTitle;
