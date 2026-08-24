import React from 'react';
import { css } from '@emotion/core';
import Drum from '../Drum';
import DemoButton from '../DemoButton';

const DemoDrum = () => (
  <div
    css={css`
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 30px;
    `}
  >
    <Drum />
    <DemoButton
      cx={css`
        max-width: 450px;
      `}
    />
  </div>
);
export default React.memo(DemoDrum);
