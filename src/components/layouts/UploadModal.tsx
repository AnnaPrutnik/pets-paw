import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import IconFromSprite from '../ui/SvgIconSprite';
import UploadModalTitle from '../ui/UploadModalTitle';
import UploadModalResultInfo from '../ui/UploadModalResultInfo';
import UploadModalDragClickText from '../ui/UploadModalDragClickText';
import { uploadImage } from '../../services/catApi';
import { user_id } from '../../config/variables';

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
    <Stack sx={{ width: '100%' }}>
      <UploadModalTitle />
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
          backgroundColor: (theme) =>
            drag ? theme.palette.primary.light : theme.bgColor.light,
          borderRadius: '20px',
        }}
        mb='20px'
      >
        {file ? (
          <Box
            component='img'
            src={imageUrl}
            sx={{
              backgroundColor: (theme) => theme.bgColor.light,
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Stack
            alignItems='center'
            justifyContent='center'
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fill: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.bgColor.dark
                  : theme.bgColor.light,
            }}
            onDragStart={onDragStart}
            onDragOver={onDragStart}
            onDragLeave={onDragLeave}
            onDrop={onDropFile}
          >
            <IconFromSprite icon='load' width='200px' height='200px' />
            <UploadModalDragClickText onUploadBtn={onUploadBtn} />
          </Stack>
        )}
      </Box>
      <Typography
        variant='body2'
        color='text.secondary'
        mb='20px'
        alignSelf='center'
      >
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

      {result && <UploadModalResultInfo result={result} />}
    </Stack>
  );
};

export default UploadModal;
