import React, { useContext } from "react";
import { css } from "@emotion/core";
import { AppContext } from "providers/AppContextProvider";
import { breakpoints, colors } from "styles";
import Drum from "../Drum";
import ModeSwitch from "../ModeSwitch";
import EffectsSwitch from "../EffectsSwitch";
import Title from "../Title";
import Caption from "../Caption";
import DemoButton from "../DemoButton";

const SimpleDrum = () => {
  const {
    selectedDrum,
    isStickMode,
    setIsStickMode,
    isEffectsMode,
    setIsEffectsMode,
  } = useContext(AppContext);

  const hasSticksMode = !!(
    selectedDrum.notesStick && selectedDrum.notesStick.length > 0
  );
  const hasEffectsMode = !!selectedDrum.hasEffects;

  return (
    <div
      css={css`
        display: flex;
        height: 630px;
        max-width: 960px;
        width: 100%;
        border: solid 1px ${colors.dark.border};

        @media (max-width: ${breakpoints.mobile}) {
          height: 100%;
          border: none;
          max-width: none;
          flex-direction: column;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 45%;
          height: 100%;
          border-right: solid 1px ${colors.dark.border};

          @media (max-width: ${breakpoints.mobile}) {
            order: 1;
            border: none;
          }
        `}
      >
        <div>
          <Drum />
          {hasSticksMode && (
            <ModeSwitch
              onChange={() => {
                setIsStickMode(!isStickMode);
              }}
              checked={isStickMode}
            />
          )}
          {hasEffectsMode && (
            <EffectsSwitch
              onChange={() => {
                setIsEffectsMode(!isEffectsMode);
              }}
              checked={isEffectsMode}
            />
          )}
        </div>
      </div>
      <div
        css={css`
          width: 55%;
          padding: 32px 24px;

          @media (max-width: ${breakpoints.mobile}) {
            padding: 0;
            order: 0;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 16px;

            @media (max-width: ${breakpoints.mobile}) {
              margin-bottom: 0;
            }
          `}
        >
          <Title>{selectedDrum.title}</Title>
          <Caption>{selectedDrum.notesString}</Caption>
        </div>
        <div
          css={css`
            display: block;

            @media (max-width: ${breakpoints.mobile}) {
              display: none;
            }
          `}
        >
          <DemoButton />
        </div>
      </div>
      <div
        css={css`
          display: none;
          order: 2;
          padding-top: 8px;

          @media (max-width: ${breakpoints.mobile}) {
            display: block;
          }
        `}
      >
        <DemoButton />
      </div>
    </div>
  );
};

export default React.memo(SimpleDrum);
