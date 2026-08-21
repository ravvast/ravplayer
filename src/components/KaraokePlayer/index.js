import React, { useContext } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { TITLES } from 'constants/titles';
import { colors } from 'styles';
import { karaokeSequences } from 'shared/assets/karaokeSequences';
import CustomSelect from '../CustomSelect';

const KaraokeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" />
  </svg>
);

const sequenceOptions = karaokeSequences.map(sequence => ({
  value: sequence.key,
  label: sequence.title,
}));

// karaokeStepDuration is ms between hits; the slider is laid out so that
// dragging right increases speed, which means a lower duration.
const MIN_STEP_DURATION = 1200;
const MAX_STEP_DURATION = 3500;
const STEP_DURATION_STEP = 100;
const SPEED_TICK_COUNT = 6;
const speedTicks = Array.from({ length: SPEED_TICK_COUNT }, (_, index) =>
  Math.round(
    MIN_STEP_DURATION +
      ((MAX_STEP_DURATION - MIN_STEP_DURATION) * index) /
        (SPEED_TICK_COUNT - 1),
  ));

const KaraokePlayer = ({ cx }) => {
  const {
    language,
    selectedDrum,
    selectedKaraokeSequence,
    setSelectedKaraokeSequence,
    isKaraokePlaying,
    setIsKaraokePlaying,
    karaokeStepDuration,
    setKaraokeStepDuration,
  } = useContext(AppContext);

  const titles = TITLES[language];

  if (!selectedDrum.karaokeChords) return null;

  const selectedOption = selectedKaraokeSequence
    ? { value: selectedKaraokeSequence.key, label: selectedKaraokeSequence.title }
    : null;

  const onSequenceChange = option => {
    const sequence = karaokeSequences.find(item => item.key === option.value);
    setSelectedKaraokeSequence(sequence || karaokeSequences[0]);
  };

  const speedSliderValue =
    MIN_STEP_DURATION + MAX_STEP_DURATION - karaokeStepDuration;
  const onSpeedChange = event => {
    const sliderValue = Number(event.target.value);
    setKaraokeStepDuration(MIN_STEP_DURATION + MAX_STEP_DURATION - sliderValue);
  };

  return (
    <div
      css={[
        css`
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 12px 16px;
          border: solid 1px ${colors.dark.border};
          border-radius: 8px;
        `,
        cx,
      ]}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
            color: ${colors.dark.primary};
          `}
        >
          <KaraokeIcon />
          <span>{titles.karaoke}</span>
        </div>
        <Switch
          onColor="#1A1A1A"
          offColor="#DEDEDE"
          checkedIcon={false}
          uncheckedIcon={false}
          height={22}
          width={42}
          handleDiameter={18}
          onChange={() => setIsKaraokePlaying(!isKaraokePlaying)}
          checked={isKaraokePlaying}
        />
      </div>
      <CustomSelect
        value={selectedOption}
        onChange={onSequenceChange}
        options={sequenceOptions}
        cx={css`
          width: 100%;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13px;
            color: ${colors.dark.secondary};
          `}
        >
          <span>{titles.karaokeSpeed}</span>
          <span>
            {(karaokeStepDuration / 1000).toFixed(1)} {titles.sec}
          </span>
        </div>
        <input
          type="range"
          min={MIN_STEP_DURATION}
          max={MAX_STEP_DURATION}
          step={STEP_DURATION_STEP}
          list="karaoke-speed-ticks"
          value={speedSliderValue}
          onChange={onSpeedChange}
          css={css`
            width: 100%;
            margin: 0;
            accent-color: ${colors.dark.primary};
          `}
        />
        <datalist id="karaoke-speed-ticks">
          {speedTicks.map(tick => (
            <option key={tick} value={tick} />
          ))}
        </datalist>
      </div>
      <p
        css={css`
          margin: 0;
          font-size: 13px;
          line-height: 1.4;
          color: ${colors.dark.secondary};
        `}
      >
        {titles.karaokeHint}
      </p>
    </div>
  );
};

KaraokePlayer.propTypes = {
  cx: PropTypes.any,
};

export default React.memo(KaraokePlayer);
