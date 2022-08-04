import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, useMediaQuery, Box } from '@mui/material';
import SearchInput from '../shared/SearchInput';
import VotesIconBtn from '../shared/VotesIconBtn';
import MobileMenu from '../shared/MobileMenu';
import CustomModal from './CutomModal';
import MainMenu from './MainMenu';
import SwitchMode from './SwitchMode';

const SearchMenu = ({ initialValue = '' }) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const tablet = useMediaQuery(theme.breakpoints.up('tablet'));

  const onCLoseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  return (
    <Stack direction='row' spacing='10px' mb='10px'>
      {tablet ? (
        <>
          {!desktop && <MobileMenu onOpenMenu={onOpenModal} />}
          <SearchInput initialValue={initialValue} />
          <VotesIconBtn />
        </>
      ) : (
        <Stack sx={{ width: '100%' }} spacing='10px'>
          <Stack direction='row' justifyContent='space-between'>
            {!desktop && <MobileMenu onOpenMenu={onOpenModal} />}
            <VotesIconBtn />
          </Stack>
          <SearchInput initialValue={initialValue} />
        </Stack>
      )}

      <CustomModal open={openModal} onClose={onCLoseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '30px',
            left: '30px',
          }}
        >
          <SwitchMode />
        </Box>
        <Box width={tablet ? 'fit-content' : '100%'}>
          <MainMenu />
        </Box>
      </CustomModal>
    </Stack>
  );
};

export default SearchMenu;
