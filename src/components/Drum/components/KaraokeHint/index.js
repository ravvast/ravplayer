import React from "react";
import PropTypes from "prop-types";
import { css, keyframes } from "@emotion/core";
import { lightenColor } from "shared/libs/lightenColor/lightenColor";

const HINT_COLOR_LIGHTEN_AMOUNT = 0.35;

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
  const hintColor = lightenColor(color, HINT_COLOR_LIGHTEN_AMOUNT);

  const brightnessIn = keyframes`
    0% {
      filter: brightness(40%);
    }
    100% {
      filter: brightness(100%);
    }
  `;

  const flyIn = keyframes`
    0% {
      top: ${startTop}px;
      left: ${startLeft}px;
      transform: scale(0.6);
    }
    100% {
      top: ${endTop}px;
      left: ${endLeft}px;
      transform: scale(1);
    }
  `;

  return (
    <React.Fragment key={flightKey}>
      <div
        css={css`
          box-sizing: border-box;
          width: ${size}px;
          height: ${size}px;
          border-radius: 1000px;
          position: absolute;
          z-index: 7;
          pointer-events: none;
          border: 2px solid ${hintColor};
          top: ${endTop}px;
          left: ${endLeft}px;
          animation: ${brightnessIn} ${duration}ms linear 1 forwards;
        `}
      />
      <div
        css={css`
          width: ${size}px;
          height: ${size}px;
          border-radius: 1000px;
          position: absolute;
          z-index: 8;
          pointer-events: none;
          background-color: ${hintColor};
          top: ${startTop}px;
          left: ${startLeft}px;
          animation:
            ${flyIn} ${duration}ms linear 1 forwards,
            ${brightnessIn} ${duration}ms linear 1 forwards;
        `}
      />
    </React.Fragment>
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
