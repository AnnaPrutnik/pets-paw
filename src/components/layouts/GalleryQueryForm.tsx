import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { SearchQuery } from '../../types';
import ActionIconButton from '../shared/ActionIconBtn';
import CustomSelect from '../shared/CustomSelect';
import { orders, types, limits } from '../../utils/constants/variables';
import { selectors } from '../../redux';

interface GalleryQueryFormProps {
  query: SearchQuery;
  onChangeQueries: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

const GalleryQueryForm = ({
  query,
  onChangeQueries,
}: GalleryQueryFormProps) => {
  const breeds = useSelector(selectors.breedsList);
  const [order, setOrder] = useState(query.order);
  const [type, setType] = useState(query.type);
  const [breed, setBreed] = useState(query.breed);
  const [limit, setLimit] = useState(query.limit);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuery = {
      order,
      type,
      breed,
      limit,
    };
    onChangeQueries(newQuery);
  };

  const breedsForRender = useMemo(() => {
    let newBreeds = breeds.map((breed) => ({ id: breed.id, name: breed.name }));
    newBreeds.unshift({ id: 'none', name: 'None' });
    return newBreeds;
  }, [breeds]);

  return (
    <Box
      component='form'
      onSubmit={onSubmitForm}
      sx={{
        borderRadius: '20px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.bgColor.dark
            : theme.bgColor.light,
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
            value={String(limit)}
            changeValue={(value: string) => setLimit(Number(value))}
            options={limits.map((item) => ({
              id: String(item),
              name: `${item} item per page`,
            }))}
            label='limit'
            isLabelVisible={true}
          />
        </Grid>
        <Grid item xs={1} alignSelf='flex-end'>
          <ActionIconButton icon='update' type='submit' isWhite={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GalleryQueryForm;
