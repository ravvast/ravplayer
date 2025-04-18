import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import drums from 'shared/assets/drums';
import { breakpoints } from 'styles';
import DrumItem from './components/DrumItem';

const findDrum = key => drums.find(object => object.key === key);

const Combination = ({
  drums: combinationDrums,
  selectDrum,
  demoIsPlaying,
  toggleDemo,
  title,
}) => (
  <div
    css={css`
      display: flex;
      flex: 1;
      justify-content: center;
      flex-direction: column;
    `}
  >
    <p
      css={css`
        text-align: center;
      `}
    >
      {title}
    </p>
    <div
      css={css`
        display: flex;
        padding-top: 16px;
        justify-content: space-around;
        @media (max-width: ${breakpoints.mobile}) {
          justify-content: center;
        }
      `}
    >
      {combinationDrums.map(object => (
        <DrumItem
          key={object.key}
          isPan={object.type === '11' || object.type === '9P'}
          isMoon={object.type === '14'}
          isMystic={object.type === '15'}
          onClick={() => {
            if (demoIsPlaying) {
              toggleDemo();
            }
            const newDrum = findDrum(object.key);
            if (newDrum) {
              selectDrum(newDrum);
            }
          }}
        >
          {object.title}
        </DrumItem>
      ))}
    </div>
  </div>
);

Combination.propTypes = {
  title: PropTypes.string,
  selectDrum: PropTypes.func.isRequired,
  demoIsPlaying: PropTypes.bool,
  toggleDemo: PropTypes.func.isRequired,
  drums: PropTypes.arrayOf(PropTypes.any),
};

export default React.memo(Combination);
