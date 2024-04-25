import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { breakpoints, colors } from 'styles';


const Caption = ({ children, cx }) => (
  <span
    css={[css`
      font-size: 26px;
      font-size: 14px;
      line-height: 1.72;
      letter-spacing: 0.2px;
      color: ${colors.dark.secondary};
      @media (max-width: ${breakpoints.mobile}) {
        font-size: calc(7px + 1.2vw);
        line-height: 1.6;
      }
    `, cx]}
  >
    {children}
  </span>
);

Caption.propTypes = {
  children: PropTypes.string.isRequired,
  cx: PropTypes.any,
};

export default React.memo(Caption);
