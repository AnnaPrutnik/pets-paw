import React, { useCallback, useMemo } from 'react';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StyledImageBar from '../ui/StyledImageBar';
import { srcset } from '../../utils/helpers/strings/url-creator.helpers';
import { arrayDivider } from '../../utils/helpers/arrays/array-divider.helpers';
import { Image } from '../../types';
import emptyImage from '../../assets/images/search/empty.png';

interface ImageGridProps {
  imageList: Image[];
  onClickImage?: (image: Image) => void;
  actionNodeFn: (item: Image) => JSX.Element;
}

const ImageGrid = ({
  imageList,
  onClickImage,
  actionNodeFn,
}: ImageGridProps) => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up('tablet'));

  const dividedArray = useMemo(() => {
    return arrayDivider(imageList, 5);
  }, [imageList]);

  const onCLickBar = useCallback(
    (item: Image) => {
      if (onClickImage) {
        return onClickImage(item);
      }
    },
    [onClickImage]
  );

  const rowHeight = tablet ? 140 : 'auto';

  return (
    <ImageList variant='quilted' cols={3} rowHeight={rowHeight} gap={20}>
      {dividedArray.map((grid, gridIndex) => (
        <React.Fragment key={gridIndex}>
          {grid.map((item, itemIndex) => {
            const actionBtn = actionNodeFn(item);
            const numberForCols = 3;
            const numbersForRows = gridIndex % 2 === 0 ? [0, 3] : [2, 3];
            return (
              <ImageListItem
                key={item.id || item.breeds[0].id}
                cols={tablet ? (itemIndex === numberForCols ? 2 : 1) : 3}
                rows={
                  tablet
                    ? itemIndex === numbersForRows[0] ||
                      itemIndex === numbersForRows[1]
                      ? 2
                      : 1
                    : 1
                }
                sx={{
                  backgroundColor: '#C4C4C4',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {item.url === undefined ? (
                  <img src={emptyImage} alt='not found' />
                ) : (
                  <img
                    {...srcset(item.url, 140, itemIndex)}
                    alt={item.id}
                    loading='lazy'
                  />
                )}
                <StyledImageBar
                  onClick={() => onCLickBar(item)}
                  actionIcon={actionBtn}
                />
              </ImageListItem>
            );
          })}
        </React.Fragment>
      ))}
    </ImageList>
  );
};

export default ImageGrid;
