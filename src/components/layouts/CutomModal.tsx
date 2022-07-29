import React from 'react';
import { Stack, Box, Modal } from '@mui/material';
import ActionIconBtn from '../shared/ActionIconBtn';
import UploadModal from './UploadModal';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const CustomModal = ({ open, onClose }: CustomModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '30px',
          bottom: '30px',
          right: '30px',
          width: '48%',
          backgroundColor: (theme) => theme.bgColor.dark,
          borderRadius: '20px',
          padding: '100px 20px',
        }}
        alignItems='center'
      >
        <Box sx={{ position: 'absolute', top: '20px', right: '20px' }}>
          <ActionIconBtn icon='close' isWhite={true} onClick={onClose} />
        </Box>
        <UploadModal />
      </Stack>
    </Modal>
  );
};

export default CustomModal;
