import React from 'react';
import { Stack, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up('tablet'));
  return (
    <Stack flexGrow={1} direction={tablet ? 'row' : 'column'} spacing='10px'>
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
      <Stack direction='row' spacing='10px'>
        <Box sx={{ width: tablet ? '100px' : '100%' }}>
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
      </Stack>
    </Stack>
  );
};

export default BreedsQueryForm;
