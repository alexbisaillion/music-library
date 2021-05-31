import Link from "@material-ui/icons/Link";
import LinkOff from "@material-ui/icons/LinkOff";
import NoteAdd from "@material-ui/icons/NoteAdd";
import BackspaceIcon from "@material-ui/icons/Backspace";
import MenuIcon from "@material-ui/icons/Menu";
import WbSunny from "@material-ui/icons/WbSunny";
import NightsStay from "@material-ui/icons/NightsStay";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import CategoryIcon from "@material-ui/icons/Category";
import Settings from "@material-ui/icons/Settings";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Github from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Mail from "@material-ui/icons/Mail";

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
export const HomePageIcon = ({ size }: IconProps) => (
  <HomeIcon fontSize={size} />
);
export const ExperienceIcon = ({ size }: IconProps) => (
  <WorkIcon fontSize={size} />
);
export const ProjectsIcon = ({ size }: IconProps) => (
  <CategoryIcon fontSize={size} />
);
export const SettingsIcon = ({ size }: IconProps) => (
  <Settings fontSize={size} />
);
export const LoginIcon = ({ size }: IconProps) => (
  <LockOpenIcon fontSize={size} />
);
export const LogoutIcon = ({ size }: IconProps) => <LockIcon fontSize={size} />;
export const GitHubIcon = ({ size }: IconProps) => <Github fontSize="large" />;
export const LinkedInIcon = ({ size }: IconProps) => (
  <LinkedIn fontSize={size} />
);
export const MailIcon = ({ size }: IconProps) => <Mail fontSize={size} />;
