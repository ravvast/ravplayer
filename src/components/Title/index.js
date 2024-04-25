import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { breakpoints, colors } from 'styles';


const Title = ({ children }) => (
  <span
    css={css`
      font-size: 26px;
      line-height: 1.36;
      letter-spacing: 0.72px;
      color: ${colors.dark.primary};
      text-align: left;
      @media (max-width: ${breakpoints.mobile}) {
        font-size: calc(18px + 1vw);
        line-height: 1.48;
      }
    `}
  >
    {children}
  </span>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default React.memo(Title);
