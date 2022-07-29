import { SvgIcon } from '@mui/material';
import sprite from '../../assets/images/sprite/sprite.svg';

interface IconProp {
  icon: string;
  width?: string;
  height?: string;
}

const IconFromSprite = ({ icon, width, height }: IconProp) => {
  return (
    <SvgIcon sx={{ width: width, height: height, fill: 'inherit' }}>
      <use href={`${sprite}#${icon}`} />
    </SvgIcon>
  );
};

IconFromSprite.defaultProps = {
  width: '30px',
  height: '30px',
};

export default IconFromSprite;
