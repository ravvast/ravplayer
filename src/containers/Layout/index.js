import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div
    css={css`
      min-height: calc(100dvh - 24px);
      width: 100%;
      padding: 12px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  >
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
