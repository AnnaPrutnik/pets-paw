import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Link,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import IconFromSprite from '../Common/SvgIconSprite';
import bgImage from '../../images/gallery/upload-bg.png';
import { uploadImage } from '../../services/catApi';
import { user_id } from '../../utils/variables';

const UploadModal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [drag, setDrag] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const onUploadBtn = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult(null);
    if (e.target.files) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onClickLoad = () => {
    setLoading(true);
    sendUploadedFile();
  };

  const sendUploadedFile = async () => {
    const newImage = new FormData();
    if (file) {
      newImage.append('file', file);
      newImage.append('sub_id', user_id);

      const result = await uploadImage(newImage);

      if (result.approved === 1) {
        setResult('success');
      } else {
        setResult('error');
      }
    }
    setFile(null);
    setLoading(false);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let newFile = e.dataTransfer.files[0];
    setDrag(false);
    setFile(newFile);
    setImageUrl(URL.createObjectURL(newFile));
  };

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
      <Box sx={{ width: '100%' }}>
        <Box
          padding='20px 40px'
          sx={{
            width: '100%',
            height: '320px',
            border: (theme) =>
              `2px dashed ${
                file || drag
                  ? theme.palette.primary.main
                  : theme.palette.primary.light
              }`,
            backgroundColor: drag || file ? 'primary.light' : '#fff',
            borderRadius: '20px',
          }}
          mb='20px'
        >
          {file ? (
            <Box
              sx={{
                backgroundColor: '#fff',
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ) : (
            <Stack
              alignItems='center'
              justifyContent='center'
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              onDragStart={onDragStart}
              onDragOver={onDragStart}
              onDragLeave={onDragLeave}
              onDrop={onDropFile}
            >
              <Typography
                variant='body2'
                color='text.secondary'
                component='div'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography
                  variant='body2'
                  color='text.primary'
                  mr='5px'
                  sx={{ fontWeight: 500 }}
                >
                  Drag here
                </Typography>
                your file or
                <Button
                  sx={{
                    textTransform: 'inherit',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                    padding: '0',
                    margin: '0 5px',
                    color: 'text.primary',
                  }}
                  disableRipple
                  component='label'
                >
                  Click here
                  <input
                    hidden
                    accept='image/*'
                    multiple
                    type='file'
                    onChange={onUploadBtn}
                  />
                </Button>
                to upload
              </Typography>
            </Stack>
          )}
        </Box>
        <Box textAlign='center'>
          <Typography variant='body2' color='text.secondary' mb='20px'>
            {file ? 'Image File Name: ' + file.name : 'No file selected'}
          </Typography>
          {file && (
            <Button
              variant='contained'
              disableElevation
              sx={{
                height: '40px',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                },
              }}
              onClick={onClickLoad}
              startIcon={
                loading && <CircularProgress size='16px' color='inherit' />
              }
            >
              {loading ? 'Uploading...' : 'Upload photo'}
            </Button>
          )}
        </Box>
        {result && (
          <Alert
            variant='outlined'
            severity={result}
            icon={<IconFromSprite icon={result} width='20px' height='20px' />}
            sx={{
              borderRadius: '10px',
              backgroundColor: '#fff',
              border: 'none',
              fontStyle: (theme) => theme.typography.subtitle2,
              fontWeight: 400,
              color: 'text.secondary',
              fill: result === 'success' ? '#97EAB9' : '#FF868E',
              display: 'flex',
              alignItems: 'center',
              height: '60px',
            }}
          >
            {result === 'success'
              ? 'Thanks for the Upload - Cat found!'
              : 'No Cat found - try a different one'}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default UploadModal;
