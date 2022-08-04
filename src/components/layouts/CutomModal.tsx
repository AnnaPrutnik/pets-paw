import React from 'react';
import { Stack, Box, Modal } from '@mui/material';
import ActionIconBtn from '../shared/ActionIconBtn';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const CustomModal = ({
  open,
  onClose,
  children,
}: React.PropsWithChildren<CustomModalProps>) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('desktop'));

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={
          matches
            ? {
                position: 'absolute',
                top: '30px',
                bottom: '30px',
                right: '30px',
                width: '48%',
                borderRadius: '20px',
                padding: '100px 20px',
              }
            : {
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                padding: '100px 20px',
              }
        }
        alignItems='center'
        bgcolor={(theme) => theme.bgColor.dark}
      >
        <Box sx={{ position: 'absolute', top: '20px', right: '20px' }}>
          <ActionIconBtn icon='close' isWhite={true} onClick={onClose} />
        </Box>
        {children}
      </Stack>
    </Modal>
  );
};

export default CustomModal;
