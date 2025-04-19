import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { getDrumImage } from 'shared/libs/getDrumImage/getDrumImage';
import { breakpoints } from 'styles';
import { OverlayButtons } from './components';

const Drum = () => {
  const { selectedDrum } = useContext(AppContext);
  const src = getDrumImage(selectedDrum.type);

  return (
    <div
      css={css`
        width: 312px;
        height: 312px;
        background-image: url(${src});
        background-size: cover;
        position: relative;
        @media (min-width: ${breakpoints.ipad}) and (max-width: ${breakpoints.mobile}) {
          width: 400px;
          height: 400px;
        }
      `}
    >
      <OverlayButtons />
    </div>
  );
};

export default Drum;
