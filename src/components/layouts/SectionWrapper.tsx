import React from 'react';
import CustomContainer from '../shared/CustomContainer';
import SearchMenu from './SearchMenu';
import CustomSection from '../shared/CustomSection';

const SectionWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <CustomContainer>
      <SearchMenu />
      <CustomSection>{children}</CustomSection>
    </CustomContainer>
  );
};

export default SectionWrapper;
