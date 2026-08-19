import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';

const KaraokeHint = ({
  flightKey,
  size,
  color,
  startTop,
  startLeft,
  endTop,
  endLeft,
  duration,
}) => {
  const flyIn = keyframes`
    0% {
      top: ${startTop}px;
      left: ${startLeft}px;
      opacity: 0.55;
      transform: scale(0.6);
    }
    85% {
      opacity: 0.95;
    }
    100% {
      top: ${endTop}px;
      left: ${endLeft}px;
      opacity: 1;
      transform: scale(1);
    }
  `;

  return (
    <div
      key={flightKey}
      css={css`
        width: ${size}px;
        height: ${size}px;
        border-radius: 1000px;
        position: absolute;
        z-index: 8;
        pointer-events: none;
        background-color: ${color};
        top: ${startTop}px;
        left: ${startLeft}px;
        animation: ${flyIn} ${duration}ms linear 1 forwards;
      `}
    />
  );
};

KaraokeHint.propTypes = {
  flightKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  startTop: PropTypes.number.isRequired,
  startLeft: PropTypes.number.isRequired,
  endTop: PropTypes.number.isRequired,
  endLeft: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default React.memo(KaraokeHint);
