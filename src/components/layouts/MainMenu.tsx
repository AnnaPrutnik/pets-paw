import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { List, ListItem, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuOption from '../shared/MenuOption';
import votingImg from '../../assets/images/home/vote-table.png';
import breedsImg from '../../assets/images/home/pet-breeds.png';
import galleryImg from '../../assets/images/home/images-search.png';
import { cardsPath } from '../../utils/constants/variables';
import { CardsRoutes } from '../../types';

const ImgArray = [votingImg, breedsImg, galleryImg];

const MainMenu = () => {
  const [active, setActive] = useState<CardsRoutes | null>(null);
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('tablet'));

  useEffect(() => {
    if (location.pathname === '/') {
      setActive(null);
    }
    const current = location.pathname.slice(1);

    const result = cardsPath.reduce((acc: CardsRoutes | null, card) => {
      if (current === card) {
        acc = card;
      }
      return acc;
    }, null);
    setActive(result);
  }, [location]);

  return (
    <nav>
      <List
        disablePadding
        sx={
          matches
            ? { display: 'flex', gap: '16px' }
            : { display: 'flex', flexDirection: 'column', gap: '20px' }
        }
      >
        {cardsPath.map((path, index) => (
          <ListItem disablePadding key={path}>
            <NavLink
              to={`/${path}`}
              style={() => ({ textDecoration: 'none', width: '100%' })}
            >
              <MenuOption
                image={ImgArray[index]}
                title={path}
                isActive={active === path}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default MainMenu;
