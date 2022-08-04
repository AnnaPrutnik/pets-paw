import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Stack, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import SectionWrapper from '../layouts/SectionWrapper';
import SectionTitle from '../shared/SectionTitle';
import NavigationBar from '../layouts/NavigationBar';
import BreedsImageGrid from '../layouts/BreedsImageGrid';
import BreedsQueryForm from '../layouts/BreedsQueryForm';
import Loading from '../layouts/Loading';
import { getBreedImages } from '../../services/catApi';
import { Image, BreedSearchQuery } from '../../types';
import { limits } from '../../utils/constants/variables';
import { selectors } from '../../redux';

const initialQuery: BreedSearchQuery = {
  breed: 'all',
  limit: limits[0],
};

const BreedsScreen = () => {
  const listOfBreeds = useSelector(selectors.breedsList);
  const [breeds, setBreeds] = useState(listOfBreeds);
  const [searchQueries, setSearchQueries] = useState(initialQuery);
  const [isSortUp, setIsSortUp] = useState(true);
  const [imagesForRender, setImagesForRender] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up('tablet'));

  useEffect(() => {
    setPage(1);
  }, [searchQueries]);

  const onChangeImagesForRender = useCallback(async () => {
    const { breed, limit } = searchQueries;
    if (breed === 'all') {
      const images: Image[] = breeds
        .filter(
          (_, index) =>
            index >= (page - 1) * Number(limit) && index < page * Number(limit)
        )
        .map((breed) => {
          const newImage: Image = { ...breed.image, breeds: [breed] };
          return newImage;
        });
      setImagesForRender(images);
      const totalPages = Math.floor((breeds.length + 1) / Number(limit));
      setTotalPages(totalPages);
    } else {
      const response = await getBreedImages(breed, Number(limit));
      const totalImages = response.headers['pagination-count'];
      const total =
        Number(totalImages) < Number(limit)
          ? 1
          : Math.ceil(Number(totalImages) / Number(limit));
      setImagesForRender(response.data);
      setTotalPages(total);
    }
    setLoading(false);
  }, [page, breeds, searchQueries]);

  useEffect(() => {
    setLoading(true);
    onChangeImagesForRender();
  }, [onChangeImagesForRender]);

  useEffect(() => {
    if (isSortUp) {
      setBreeds((prev) =>
        [...prev].sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        )
      );
    } else {
      setBreeds((prev) =>
        [...prev].sort((a, b) =>
          b.name.localeCompare(a.name, 'en', { sensitivity: 'base' })
        )
      );
    }
  }, [isSortUp]);

  const breedsForSelect = useMemo(() => {
    const listOfBreedsName = breeds.map((breed) => ({
      id: breed.id,
      name: breed.name,
    }));
    listOfBreedsName.unshift({ id: 'all', name: 'All breeds' });
    return listOfBreedsName;
  }, [breeds]);

  return (
    <SectionWrapper>
      <Stack
        mb='20px'
        direction={tablet ? 'row' : 'column'}
        spacing='10px'
        sx={{ justifyContent: 'flex-start' }}
      >
        <SectionTitle title='breeds' />
        <BreedsQueryForm
          queries={searchQueries}
          onChangeQueries={setSearchQueries}
          isSortUp={isSortUp}
          onChangeSortUp={setIsSortUp}
          breedsForSelect={breedsForSelect}
        />
      </Stack>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box>
            <BreedsImageGrid imageList={imagesForRender} />
          </Box>
          {totalPages > 1 && (
            <NavigationBar page={page} maxPage={totalPages} onClick={setPage} />
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default BreedsScreen;
