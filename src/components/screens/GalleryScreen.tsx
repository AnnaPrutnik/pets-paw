import React, { useEffect, useState } from 'react';
import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SectionWrapper from '../layouts/SectionWrapper';
import SectionTitle from '../shared/SectionTitle';
import UploadBtn from '../shared/UploadBtn';
import GalleryQueryForm from '../layouts/GalleryQueryForm';
import NavigationBar from '../layouts/NavigationBar';
import Loading from '../layouts/Loading';
import NoItemFound from '../shared/NoItemFound';
import CustomModal from '../layouts/CutomModal';
import GalleryImageGrid from '../layouts/GalleryImageGrid';
import UploadModal from '../layouts/UploadModal';
import { orders, types, limits } from '../../utils/constants/variables';
import { Image, SearchQuery } from '../../types';
import {
  getImageForGallery,
  getImageForGalleryRandomBreed,
} from '../../services/catApi';

const initialState: SearchQuery = {
  order: orders[0],
  type: types[0],
  breed: 'none',
  limit: limits[0],
};

const GalleryScreen = () => {
  const [searchQueries, setSearchQueries] = useState(initialState);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState<Image[] | null>([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up('tablet'));

  useEffect(() => {
    setPage(1);
  }, [searchQueries]);

  useEffect(() => {
    setLoading(true);
    onGetImagesForGallery();
  }, [page]);

  const onClickUploadBtn = () => {
    setOpenUploadModal(true);
  };

  const onGetImagesForGallery = async () => {
    let response = null;
    const { order, limit, type, breed } = searchQueries;
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

  const onCloseModal = () => setOpenUploadModal(false);

  return (
    <SectionWrapper>
      <Stack
        mb='20px'
        direction={tablet ? 'row' : 'column'}
        spacing='10px'
        sx={{ justifyContent: 'space-between' }}
      >
        <SectionTitle title='gallery' />
        <UploadBtn onOpenModal={onClickUploadBtn} />
      </Stack>
      <GalleryQueryForm
        query={searchQueries}
        onChangeQueries={setSearchQueries}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          {images && (
            <>
              {images.length > 0 ? (
                <GalleryImageGrid imageList={images} />
              ) : (
                <NoItemFound />
              )}
            </>
          )}
          {totalPages > 1 && (
            <NavigationBar page={page} maxPage={totalPages} onClick={setPage} />
          )}
        </>
      )}

      <CustomModal open={openUploadModal} onClose={onCloseModal}>
        <UploadModal />
      </CustomModal>
    </SectionWrapper>
  );
};

export default GalleryScreen;
