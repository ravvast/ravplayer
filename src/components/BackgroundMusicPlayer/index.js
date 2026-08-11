import React, { useContext } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { TITLES } from 'constants/titles';
import { colors } from 'styles';
import { getBackgroundMusicTracksForDrum } from 'shared/assets/backgroundMusic';
import CustomSelect from '../CustomSelect';

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

const BackgroundMusicPlayer = ({ cx }) => {
  const {
    language,
    selectedDrum,
    selectedBackgroundMusicTrack,
    setSelectedBackgroundMusicTrack,
    isBackgroundMusicPlaying,
    setIsBackgroundMusicPlaying,
  } = useContext(AppContext);

  const titles = TITLES[language];

  const drumTracks = getBackgroundMusicTracksForDrum(selectedDrum.key);

  if (drumTracks.length === 0) return null;

  const trackOptions = drumTracks.map(track => ({
    value: track.key,
    label: track.title,
  }));

  const selectedOption = selectedBackgroundMusicTrack
    ? {
      value: selectedBackgroundMusicTrack.key,
      label: selectedBackgroundMusicTrack.title,
    }
    : null;

  const onTrackChange = option => {
    const track = drumTracks.find(item => item.key === option.value);
    setSelectedBackgroundMusicTrack(track || null);
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
      <CustomSelect
        value={selectedOption}
        onChange={onTrackChange}
        options={trackOptions}
        cx={css`
          width: 100%;
        `}
      />
    </div>
  );
};

BackgroundMusicPlayer.propTypes = {
  cx: PropTypes.any,
};

export default React.memo(BackgroundMusicPlayer);
