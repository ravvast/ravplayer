import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ children, cx }) => <span css={cx}>{children}</span>;

Body.propTypes = {
  children: PropTypes.node.isRequired,
  cx: PropTypes.any,
};

export default React.memo(Body);
