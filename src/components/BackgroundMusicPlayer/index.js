import React, { useContext } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { TITLES } from 'constants/titles';
import { colors } from 'styles';

const MusicIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18V5l12-2v13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const VolumeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 5L6 9H2v6h4l5 4V5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 8.5a5 5 0 010 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const BackgroundMusicPlayer = ({ cx }) => {
  const {
    language,
    selectedBackgroundMusicTrack,
    isBackgroundMusicPlaying,
    setIsBackgroundMusicPlaying,
    backgroundMusicVolume,
    setBackgroundMusicVolume,
  } = useContext(AppContext);

  const titles = TITLES[language];

  if (!selectedBackgroundMusicTrack) return null;

  const volumePercent = Math.round(backgroundMusicVolume * 100);

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
          <MusicIcon />
          <span>{titles.backgroundMusic}</span>
        </div>
        <Switch
          onColor="#1A1A1A"
          offColor="#DEDEDE"
          checkedIcon={false}
          uncheckedIcon={false}
          height={22}
          width={42}
          handleDiameter={18}
          onChange={() => setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying)}
          checked={isBackgroundMusicPlaying}
        />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${colors.dark.secondary};
        `}
      >
        <VolumeIcon />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={backgroundMusicVolume}
          onChange={event =>
            setBackgroundMusicVolume(Number(event.target.value))
          }
          css={css`
            flex: 1;
            appearance: none;
            height: 4px;
            border-radius: 2px;
            outline: none;
            background: linear-gradient(
              to right,
              ${colors.dark.primary} ${volumePercent}%,
              ${colors.dark.border} ${volumePercent}%
            );

            &::-webkit-slider-thumb {
              appearance: none;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: ${colors.dark.primary};
              cursor: pointer;
            }

            &::-moz-range-thumb {
              width: 14px;
              height: 14px;
              border: none;
              border-radius: 50%;
              background: ${colors.dark.primary};
              cursor: pointer;
            }
          `}
        />
      </div>
    </div>
  );
};

BackgroundMusicPlayer.propTypes = {
  cx: PropTypes.any,
};

export default React.memo(BackgroundMusicPlayer);
