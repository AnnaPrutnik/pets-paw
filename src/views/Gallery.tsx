import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Stack, Box, Modal } from '@mui/material';
import CustomSection from '../components/Common/CustomSection';
import SectionTitle from '../components/Common/SectionTitle';
import UploadBtn from '../components/Gallery/UploadBtn';
import ActionIconButton from '../components/Common/ActionIcon';
import CustomSelect from '../components/Common/CustomSelect';
import NavigationBtn from '../components/Common/NavigationBtn';
import SearchMenu from '../components/Common/SearchMenu';
import CustomContainer from '../components/Common/Container';
import Loading from '../components/Common/Loading';
import UploadModal from '../components/Gallery/UploadModal';
import { orders, types, limits } from '../utils/variables';
import { Image } from '../types';
import { useSelector } from 'react-redux';
import { breedsList } from '../redux/selectors';
import {
  getImageForGallery,
  getImageForGalleryRandomBreed,
} from '../services/catApi';
import GalleryImageGrid from '../components/Gallery/GalleryImageGrid';

const Gallery = () => {
  const breeds = useSelector(breedsList);
  const [order, setOrder] = useState<string>(orders[0]);
  const [type, setType] = useState(types[0]);
  const [breed, setBreed] = useState<string>('none');
  const [limit, setLimit] = useState(String(limits[0]));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState<Image[]>([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [order, type, breed, limit]);

  useEffect(() => {
    setLoading(true);
    onGetImagesForGallery();
  }, [page]);

  const breedsForRender = useMemo(() => {
    let newBreeds = breeds.map((breed) => ({ id: breed.id, name: breed.name }));
    newBreeds.unshift({ id: 'none', name: 'None' });
    return newBreeds;
  }, [breeds]);

  const onClickUploadBtn = () => {
    setOpenUploadModal(true);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    onGetImagesForGallery();
  };

  const onGetImagesForGallery = async () => {
    let response = null;
    if (breed === 'none') {
      response = await getImageForGalleryRandomBreed(
        order,
        Number(limit),
        page,
        type
      );
    } else {
      response = await getImageForGallery(
        order,
        Number(limit),
        page,
        breed,
        type
      );
    }
    setImages(response.data);
    if (page === 1) {
      const total = Math.ceil(
        Number(response.headers['pagination-count']) / Number(limit)
      );
      setTotalPages(total);
    }
    setLoading(false);
  };

  return (
    <>
      <CustomContainer>
        <SearchMenu />
        <CustomSection>
          <Stack
            mb='20px'
            direction='row'
            spacing='10px'
            sx={{ justifyContent: 'space-between' }}
          >
            <SectionTitle title='gallery' />
            <UploadBtn onOpenModal={onClickUploadBtn} />
          </Stack>
          <Box
            component='form'
            onSubmit={onSubmitForm}
            sx={{
              borderRadius: '20px',
              backgroundColor: (theme) => theme.bgColor,
              padding: '28px 20px 20px 23px',
            }}
          >
            <Grid container rowSpacing='28px' columnSpacing='20px'>
              <Grid item xs={6}>
                <CustomSelect
                  value={order}
                  changeValue={(value: string) => setOrder(value)}
                  options={orders.map((item) => ({
                    id: item,
                    name: item,
                  }))}
                  label='order'
                  isLabelVisible={true}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomSelect
                  value={type}
                  changeValue={(value: string) => setType(value)}
                  options={types.map((item) => ({
                    id: item,
                    name: item,
                  }))}
                  label='type'
                  isLabelVisible={true}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomSelect
                  value={breed}
                  changeValue={(value: string) => setBreed(value)}
                  options={breedsForRender}
                  label='breed'
                  isLabelVisible={true}
                />
              </Grid>
              <Grid item xs={5}>
                <CustomSelect
                  value={limit}
                  changeValue={(value: string) => setLimit(value)}
                  options={limits.map((item) => ({
                    id: String(item),
                    name: `${item} item per page`,
                  }))}
                  label='limit'
                  isLabelVisible={true}
                />
              </Grid>
              <Grid item xs={1} alignSelf='flex-end'>
                <ActionIconButton icon='update' type='submit' />
              </Grid>
            </Grid>
          </Box>
          {loading ? (
            <Loading />
          ) : (
            <>
              {images.length > 0 && <GalleryImageGrid imageList={images} />}
              {totalPages > 1 && (
                <NavigationBtn
                  page={page}
                  maxPage={totalPages}
                  onClick={setPage}
                />
              )}
            </>
          )}
        </CustomSection>
      </CustomContainer>
      <Modal open={openUploadModal} onClose={() => setOpenUploadModal(false)}>
        <Stack
          sx={{
            position: 'absolute',
            top: '30px',
            bottom: '30px',
            right: '30px',
            width: '48%',
            backgroundColor: (theme) => theme.bgColor,
            borderRadius: '20px',
            padding: '100px 20px',
          }}
          alignItems='center'
        >
          <Box sx={{ position: 'absolute', top: '20px', right: '20px' }}>
            <ActionIconButton
              icon='close'
              isWhite={true}
              handlerClick={() => setOpenUploadModal(false)}
            />
          </Box>
          <UploadModal />
        </Stack>
      </Modal>
    </>
  );
};

export default Gallery;
