import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { colors, breakpoints } from 'styles';


const Button = ({ disabled, onClick, children, outline, dark, cx }) => (
  <button
    type="button"
    onClick={onClick}
    onKeyPress={null}
    disabled={disabled}
    css={
      [css`
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial;
        height: 56px;
        font-size: 20px;
        line-height: 1.8;
        letter-spacing: 0.24px;
        text-align: center;
        color: ${colors.dark.primary};
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
        @media (max-width: ${breakpoints.mobile}) {
          height: 8vw;
          min-height: 48px;
          font-size: calc(13px + 1vw);
        }
      `,
      dark && css`
        background-color: ${colors.dark.primary};
        color: white;
      `,
      outline && css`
        border: solid 1px ${colors.dark.primary};
        color: ${colors.dark.primary};
      `,
      cx]
    }
  >
    {children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  outline: PropTypes.bool,
  dark: PropTypes.bool,
  cx: PropTypes.any,
};

export default React.memo(Button);
