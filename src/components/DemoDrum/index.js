import React from 'react';
import { css } from '@emotion/core';
import { breakpoints } from 'styles';
import { Drum, DemoButton } from '../';

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
    <div
      css={css`
        @media (max-width: ${breakpoints.mobile}) {
          height: 100%;
          display: flex;
          align-items: center;
        }
      `}
    >
      <Drum />
    </div>
    <DemoButton
      cx={css`
        max-width: 312px;

        @media (max-width: ${breakpoints.mobile}) {
          max-width: none;
        }
      `}
    />
  </div>
);
export default React.memo(DemoDrum);
