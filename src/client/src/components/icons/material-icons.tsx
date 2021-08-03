import Link from "@material-ui/icons/Link";
import LinkOff from "@material-ui/icons/LinkOff";
import NoteAdd from "@material-ui/icons/NoteAdd";
import BackspaceIcon from "@material-ui/icons/Backspace";
import MenuIcon from "@material-ui/icons/Menu";
import WbSunny from "@material-ui/icons/WbSunny";
import NightsStay from "@material-ui/icons/NightsStay";
import Settings from "@material-ui/icons/Settings";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Album from "@material-ui/icons/Album";

type IconProps = {
  size?: "small" | "inherit" | "large" | "default";
};
export const LinkEnabledIcon = ({ size }: IconProps) => (
  <Link fontSize={size} />
);
export const LinkDisabledIcon = ({ size }: IconProps) => (
  <LinkOff fontSize={size} />
);
export const CreateIcon = ({ size }: IconProps) => <NoteAdd fontSize={size} />;
export const StripIcon = ({ size }: IconProps) => (
  <BackspaceIcon fontSize={size} />
);
export const MenuToggleIcon = ({ size }: IconProps) => (
  <MenuIcon fontSize={size} />
);
export const LightModeIcon = ({ size }: IconProps) => (
  <WbSunny fontSize={size} />
);
export const DarkModeIcon = ({ size }: IconProps) => (
  <NightsStay fontSize={size} />
);
export const SettingsIcon = ({ size }: IconProps) => (
  <Settings fontSize={size} />
);
export const LoginIcon = ({ size }: IconProps) => (
  <LockOpenIcon fontSize={size} />
);
export const LogoutIcon = ({ size }: IconProps) => <LockIcon fontSize={size} />;
export const AlbumIcon = ({ size }: IconProps) => <Album fontSize={size} />;
