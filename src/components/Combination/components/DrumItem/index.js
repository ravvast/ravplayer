import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { getBackgroundImage } from 'utils/getBackgroundImage';
import { Caption } from 'components';
import { breakpoints, colors } from 'styles';

const DrumItem = ({ isPan, isMoon, isMystic, onClick, children }) => {
  const backgroundImage = getBackgroundImage({ isPan, isMoon, isMystic });
  return (
    <button
      type='button'
      onClick={onClick}
      onKeyPress={null}
      css={css`
        display: flex;
        flex-direction: column;
        cursor: pointer;
        outline: none;
        border: none;
        padding: 0;
        align-items: center;
        cursor: pointer;
        background: transparent;
        margin: 0 8px;
        flex: 1;
        &:active {
          opacity: 0.8;
        }
      `}
    >
      <div
        css={css`
          width: 88px;
          height: 88px;
          @media (max-width: ${breakpoints.mobile}) {
            min-width: 72px;
            min-height: 72px;
            width: 16vw;
            height: 16vw;
          }
          background-image: url(${backgroundImage});
          background-size: cover;
          border-radius: 1000px;
        `}
      />
      <Caption
        cx={css`
          text-align: center;
          margin-top: 8px;
          color: ${colors.dark.primary};
          @media (max-width: ${breakpoints.mobile}) {
            font-size: calc(8px + 1vw);
          }
        `}
      >
        {children}
      </Caption>
    </button>
  );
};

DrumItem.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isPan: PropTypes.bool,
  isMoon: PropTypes.bool,
  isMystic: PropTypes.bool,
};

export default React.memo(DrumItem);
