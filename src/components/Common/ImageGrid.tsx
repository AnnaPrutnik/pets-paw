import React, { useMemo } from 'react';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Image } from '../../types';
import emptyImage from '../../images/search/empty.png';

interface ImageGridProps {
  imageList: Image[];
  onClickImage?: (image: Image) => void;
  actionNodeFn: (item: Image) => JSX.Element;
}

function srcset(image: string, size: number, index: number) {
  const rows = index === 0 || index === 3 ? 2 : 1;
  const cols = index === 3 ? 2 : 1;
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const StyledImageBar = styled(ImageListItemBar)(() => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(255, 134, 142, 0.6)',
  opacity: 0,
  cursor: 'pointer',

  '.MuiImageListItem-root:hover &': {
    opacity: 1,
  },
}));

const ImageGrid = ({
  imageList,
  onClickImage,
  actionNodeFn,
}: ImageGridProps) => {
  const dividedArray = useMemo(() => {
    let newArray = [];
    for (let i = 0; i < imageList.length; i += 5) {
      newArray.push(imageList.slice(i, i + 5));
    }
    return newArray;
  }, [imageList]);

  const onCLickBar = (item: Image) => {
    if (onClickImage) {
      return onClickImage(item);
    }
  };
  return (
    <ImageList variant='quilted' cols={3} rowHeight={140} gap={20}>
      {dividedArray.map((grid, gridIndex) => (
        <React.Fragment key={gridIndex}>
          {grid.map((item, itemIndex) => {
            const actionBtn = actionNodeFn(item);
            const numberForCols = 3;
            const numbersForRows = gridIndex % 2 === 0 ? [0, 3] : [2, 3];
            return (
              <ImageListItem
                key={item.id || item.breeds[0].id}
                cols={itemIndex === numberForCols ? 2 : 1}
                rows={
                  itemIndex === numbersForRows[0] ||
                  itemIndex === numbersForRows[1]
                    ? 2
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
                  <img src={emptyImage} alt=' image not found' loading='lazy' />
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
