import React from 'react';
import { css } from '@emotion/core';
import { breakpoints, colors } from 'styles';
import { Button } from '../';

const Error = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 536px;
      max-width: 960px;
      width: 100%;
      border: solid 1px ${colors.dark.border};

      @media (max-width: ${breakpoints.mobile}) {
        border: none;
        max-width: none;
      }
    `}
  >
    Someting went wrong.
    <br />
    Reload or contact with a support team.
    <Button
      outline
      cx={css`
        margin: 24px auto 0 auto;
        padding: 0 24px;
      `}
      onClick={() => window.location.reload()}
    >
      Reload page
    </Button>
  </div>
);

export default Error;
