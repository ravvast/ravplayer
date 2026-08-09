import React, { useContext } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { TITLES } from 'constants/titles';
import { backgroundMusicTracks } from 'shared/assets/backgroundMusic';
import { CustomSelect } from '../';

const trackOptions = backgroundMusicTracks.map(track => ({
  value: track.key,
  label: track.title,
}));

const BackgroundMusicPlayer = ({ cx }) => {
  const {
    language,
    selectedBackgroundMusicTrack,
    setSelectedBackgroundMusicTrack,
    isBackgroundMusicPlaying,
    setIsBackgroundMusicPlaying,
    backgroundMusicVolume,
    setBackgroundMusicVolume,
  } = useContext(AppContext);

  const titles = TITLES[language];

  const selectedOption = selectedBackgroundMusicTrack
    ? {
      value: selectedBackgroundMusicTrack.key,
      label: selectedBackgroundMusicTrack.title,
    }
    : null;

  const onTrackChange = option => {
    const track = backgroundMusicTracks.find(
      item => item.key === option.value,
    );
    setSelectedBackgroundMusicTrack(track || null);
  };

  return (
    <div
      css={[
        css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `,
        cx,
      ]}
    >
      <p
        css={css`
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.7);
        `}
      >
        {titles.backgroundMusic} -{' '}
        {isBackgroundMusicPlaying ? titles.on : titles.off}
      </p>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 12px;
        `}
      >
        <CustomSelect
          defaultValue={selectedOption}
          onChange={onTrackChange}
          options={trackOptions}
        />
        <Switch
          offColor="#DEDEDE"
          checkedIcon={false}
          uncheckedIcon={false}
          height={35}
          width={70}
          disabled={!selectedBackgroundMusicTrack}
          onChange={() => setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying)}
          checked={isBackgroundMusicPlaying}
        />
      </div>
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
          width: 100%;
          margin-top: 8px;
        `}
      />
    </div>
  );
};

BackgroundMusicPlayer.propTypes = {
  cx: PropTypes.any,
};

export default React.memo(BackgroundMusicPlayer);
