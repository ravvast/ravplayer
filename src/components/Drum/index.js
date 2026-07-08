import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { getDrumImage } from 'shared/libs/getDrumImage/getDrumImage';
import { getLegacySize } from 'shared/libs/getLegacySize/getLegacySize';
import { breakpoints } from 'styles';
import { OverlayButtons } from './components';

const Drum = () => {
  const { selectedDrum } = useContext(AppContext);
  const src = getDrumImage(selectedDrum.type);
  const isLegacySize = getLegacySize();

  const responsiveSize = isLegacySize
    ? css`
        @media (min-width: ${breakpoints.ipad}) and (max-width: ${breakpoints.mobile}) {
          width: 400px;
          height: 400px;
        }
      `
    : css`
        @media (max-width: calc(${breakpoints.ipad} - 1px)) {
          width: 90vw;
          height: 90vw;
        }
        @media (min-width: ${breakpoints.ipad}) and (max-width: ${breakpoints.mobile}) {
          width: 80vw;
          height: 80vw;
        }
      `;

  return (
    <div
      css={css`
        width: 312px;
        height: 312px;
        background-image: url(${src});
        background-size: cover;
        position: relative;
        ${responsiveSize};
      `}
    >
      <OverlayButtons />
    </div>
  );
};

export default Drum;
