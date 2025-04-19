import React from 'react';
import { css } from '@emotion/core';
import { colors } from 'styles';

const Loader = () => (
  <div
    css={css`
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;
    `}
  >
    <div
      css={css`
        position: absolute;
        border: 4px solid ${colors.primary};
        opacity: 1;
        border-radius: 50%;
        @keyframes round {
          0% {
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0.5;
          }
        }
        animation: round 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      `}
    />
    <div
      css={css`
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        border-radius: 50%;
        @keyframes round {
          0% {
            top: 28px;
            left: 28px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0;
          }
        }
        animation-delay: -0.5s;
        animation: round 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      `}
    />
  </div>
);

export default Loader;
