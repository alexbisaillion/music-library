import { useRef, useState } from "react";
import styled from "styled-components";
import { IconButton } from "../../common/forms/IconButton";
import { SettingsIcon } from "../../icons/material-icons";
import { SettingsMenu } from "../../layout/SettingsMenu";

const SettingsIconButton = styled(IconButton)`
  && {
    margin-left: auto;
  }
`;

export const SettingsButton = () => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const toggleSettingsMenu = () => setIsSettingsMenuOpen(!isSettingsMenuOpen);

  return (
    <>
      <SettingsIconButton
        ref={ref}
        onClick={toggleSettingsMenu}
        icon={<SettingsIcon />}
      />
      <SettingsMenu
        isOpen={isSettingsMenuOpen}
        toggleSettingsMenu={toggleSettingsMenu}
        anchorEl={ref.current}
      />
    </>
  );
};
