import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';


const OverlayCircle = ({ width, color }) => {
  const [state, setState] = React.useState(false);

  React.useEffect(() => {
    setState(true);
    setTimeout(() => setState(false), 1000);
  }, []);

  if (state) {
    return (
      <div
        css={css`
          border-radius: 1000px;
          position: absolute;
          top: ${width / 2};
          left: ${width / 2};
          background-color: ${color};
          @keyframes fadeinout {
            0% {
              width: 0;
              height: 0;
              opacity: 1;
            }
            50% {
              width: ${0.6 * width}px;
              height: ${0.6 * width}px;
              opacity: 0.8;
            }
            90% {
              width: ${0.9 * width}px;
              height: ${0.9 * width}px;
              opacity: 0;
            }
            100% {
              opacity: 0;
              width: ${width}px;
              height: ${width}px;
            }
          }
          animation: fadeinout 1000ms linear 1 forwards;
        `}
      />
    );
  }
  return null;
};

OverlayCircle.propTypes = {
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default React.memo(OverlayCircle);
