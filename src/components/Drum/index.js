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
        @media (max-width: calc(${breakpoints.ipad} - 1px)) {
          width: 90vw;
          height: 90vw;
        }
        @media (min-width: ${breakpoints.ipad}) and (max-width: ${breakpoints.mobile}) {
          width: 80vw;
          height: 80vw;
        }
      `}
    >
      <OverlayButtons />
    </div>
  );
};

export default Drum;
