import React from 'react';
import { Stack, Box } from '@mui/material';
import CustomSelect from '../shared/CustomSelect';
import SortIcon from '../shared/SortIcon';
import { BreedSearchQuery } from '../../types';
import { limits } from '../../utils/constants/variables';

interface BreedsQueryFormProps<T> {
  queries: BreedSearchQuery;
  onChangeQueries: React.Dispatch<React.SetStateAction<BreedSearchQuery>>;
  isSortUp: boolean;
  onChangeSortUp: React.Dispatch<React.SetStateAction<boolean>>;
  breedsForSelect: T[];
}

const BreedsQueryForm = <T extends { id: string; name: string }>({
  queries,
  onChangeQueries,
  isSortUp,
  onChangeSortUp,
  breedsForSelect,
}: BreedsQueryFormProps<T>) => {
  return (
    <>
      <Box flexGrow={1}>
        <CustomSelect
          value={queries.breed}
          changeValue={(value: string) =>
            onChangeQueries({ breed: value, limit: queries.limit })
          }
          options={breedsForSelect}
          label='breed list'
        />
      </Box>
      <Box sx={{ maxWidth: '101px' }}>
        <CustomSelect
          value={String(queries.limit)}
          changeValue={(value: string) =>
            onChangeQueries({ breed: queries.breed, limit: Number(value) })
          }
          options={limits.map((limit) => ({
            id: String(limit),
            name: `Limit: ${limit}`,
          }))}
          label='limits'
        />
      </Box>
      <SortIcon icon='sort-up' handlerClick={() => onChangeSortUp(false)} />
      <SortIcon icon='sort-down' handlerClick={() => onChangeSortUp(true)} />
    </>
  );
};

export default BreedsQueryForm;
