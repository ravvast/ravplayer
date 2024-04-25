import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { breakpoints } from 'styles';


const Body = ({ children, cx }) => (
  <span
    css={
      [css`
        font-size: 16px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.7);
        @media (max-width: ${breakpoints.mobile}) {
          font-size: calc(12px + 1vw);
        }
      `,
      cx]
    }
  >
    {children}
  </span>
);

Body.propTypes = {
  children: PropTypes.node.isRequired,
  cx: PropTypes.any,
};

export default React.memo(Body);
