import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { getBackgroundImage } from 'utils/getBackgroundImage';
import { breakpoints } from 'styles';
import { Title, Caption } from 'components';

const DrumRow = ({ cx, onClick, isPan, isMoon, isMystic, title, caption }) => {
  const backgroundImage = getBackgroundImage({ isPan, isMoon, isMystic });
  return (
    <button
      type='button'
      onClick={onClick}
      onKeyPress={null}
      css={[
        css`
          margin: 0 16px 24px 58px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          outline: none;
          border: none;
          padding: 0;
          align-items: center;
          cursor: pointer;
          background: transparent;
          &:active {
            opacity: 0.8;
          }
          @media (max-width: ${breakpoints.mobile}) {
            margin: 0 4px 8px 12px;
          }
        `,
        cx,
      ]}
    >
      <div
        css={css`
          width: 88px;
          height: 88px;
          background-image: url(${backgroundImage});
          background-size: cover;
          border-radius: 1000px;
          @media (max-width: ${breakpoints.mobile}) {
            min-width: 64px;
            min-height: 64px;
            width: 14vw;
            height: 14vw;
          }
        `}
      />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: flex-start;
          height: 88px;
          flex-direction: column;
          padding-left: 24px;
          @media (max-width: ${breakpoints.mobile}) {
            padding-left: 16px;
          }
        `}
      >
        <Title
          cx={css`
            @media (max-width: ${breakpoints.mobile}) {
              font-size: calc(16px + 1vw);
            }
          `}
        >
          {title}
        </Title>
        <Caption
          cx={css`
            @media (max-width: ${breakpoints.mobile}) {
              font-size: calc(6px + 1.2vw);
              letter-spacing: 0.2px;
            }
          `}
        >
          {caption}
        </Caption>
      </div>
    </button>
  );
};

DrumRow.propTypes = {
  isPan: PropTypes.bool,
  isMoon: PropTypes.bool,
  isMystic: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  cx: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default React.memo(DrumRow);
