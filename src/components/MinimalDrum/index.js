import React from 'react';
import { css } from '@emotion/core';
import { Drum } from '../';

const MinimalDrum = () => (
  <div
    css={css`
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  >
    <Drum />
  </div>
);

export default React.memo(MinimalDrum);
