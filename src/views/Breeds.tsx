import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Stack, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { breedsList } from '../redux/selectors';
import CustomSection from '../components/Common/CustomSection';
import SectionTitle from '../components/Common/SectionTitle';
import CustomSelect from '../components/Common/CustomSelect';
import NavigationBtn from '../components/Common/NavigationBtn';
import SearchMenu from '../components/Common/SearchMenu';
import CustomContainer from '../components/Common/Container';
import SortIcon from '../components/Breeds/SortIcon';
import BreedsImageGrid from '../components/Breeds/BreedsImageGrid';
import Loading from '../components/Common/Loading';
import { getBreedImages } from '../services/catApi';
import { Breed, Image } from '../types';
import { limits } from '../utils/variables';

const Breeds = () => {
  const listOfBreeds = useSelector(breedsList);
  const [breeds, setBreeds] = useState<Breed[]>(listOfBreeds);
  const [currentBreed, setCurrentBreed] = useState<string>('all');
  const [imagesForRender, setImagesForRender] = useState<Image[]>([]);
  const [limit, setLimit] = useState(String(limits[0]));
  const [isSortUp, setIsSortUp] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [currentBreed, limit, isSortUp]);

  const onChangeImagesForRender = useCallback(async () => {
    if (currentBreed === 'all') {
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
      const response = await getBreedImages(currentBreed, Number(limit));
      const totalImages = response.headers['pagination-count'];
      const total =
        Number(totalImages) < Number(limit)
          ? 1
          : Math.ceil(Number(totalImages) / Number(limit));
      setImagesForRender(response.data);
      setTotalPages(total);
    }
    setLoading(false);
  }, [page, limit, breeds, currentBreed]);

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
    <CustomContainer>
      <SearchMenu />
      <CustomSection>
        <Stack
          mb='20px'
          direction='row'
          spacing='10px'
          sx={{ justifyContent: 'flex-start' }}
        >
          <SectionTitle title='breeds' />

          <Box flexGrow={1}>
            {breeds.length > 0 && (
              <CustomSelect
                value={currentBreed}
                changeValue={(value: string) => setCurrentBreed(value)}
                options={breedsForSelect}
                label='breed list'
              />
            )}
          </Box>
          <Box sx={{ maxWidth: '101px' }}>
            <CustomSelect
              value={limit}
              changeValue={(value: string) => setLimit(value)}
              options={limits.map((limit) => ({
                id: String(limit),
                name: `Limit: ${limit}`,
              }))}
              label='limits'
            />
          </Box>
          <SortIcon icon='sort-up' handlerClick={() => setIsSortUp(false)} />
          <SortIcon icon='sort-down' handlerClick={() => setIsSortUp(true)} />
        </Stack>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box>
              <BreedsImageGrid imageList={imagesForRender} />
            </Box>
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
  );
};

export default Breeds;
