import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { ReactComponent as MoreIcon } from 'assets/more.svg';
import { ReactComponent as CloseIcon } from 'assets/closeWhite.svg';
import { breakpoints, colors } from 'styles';


const SmallButton = ({ onClick, close, cx }) => (
  <button
    type="button"
    onClick={onClick}
    onKeyPress={null}
    css={
      [css`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        cursor: pointer;
        outline: none;
        border: none;
        margin: 0;
        padding: 0;
        background-color: transparent;
        &:active {
          opacity: .8;
        }
        width: 40px;
        height: 40px;
        @media (max-width: ${breakpoints.mobile}) {
          width: 6vw;
          height: 6vw;
          min-width: 40px;
          min-height: 40px;
        }
      `,
      close && css`
        background-color: ${colors.dark.primary};
      `,
      cx]
    }
  >
    {!close && (
      <MoreIcon
        css={css`
          width: 18px;
          height: 18px;
          @media (max-width: ${breakpoints.mobile}) {
            width: 4.2vw;
            height: 4.2vw;
            min-width: 20px;
            min-height: 20px;
          }
        `}
      />
    )}
    {close && (
      <CloseIcon
        css={css`
          width: 18px;
          height: 18px;
          @media (max-width: ${breakpoints.mobile}) {
            width: 4.2vw;
            height: 4.2vw;
            min-width: 20px;
            min-height: 20px;
          }
        `}
      />
    )}
  </button>
);

SmallButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  close: PropTypes.bool.isRequired,
  cx: PropTypes.any,
};

export default React.memo(SmallButton);
